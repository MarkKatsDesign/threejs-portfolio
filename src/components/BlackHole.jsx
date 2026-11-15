import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector2 } from 'three';

/*
 * A real-time black hole: every pixel traces a light ray backwards from the
 * camera, bending it with the Schwarzschild photon-orbit equation
 * (a = -1.5 h² r / |r|⁵, units where the event horizon radius is 1).
 * Rays that cross the equatorial plane pick up light from a thin accretion
 * disk, so the far side of the disk appears lensed over and under the shadow.
 */

const vertexShader = /* glsl */ `
  void main() {
    // A 2x2 plane drawn straight into clip space: always covers the canvas.
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform vec2 uResolution;
  uniform float uTime;
  uniform vec2 uPointer;

  #define MAX_STEPS 220
  const float CAMERA_DISTANCE = 40.0;
  const float DISK_INNER = 2.6;
  const float DISK_OUTER = 13.0;
  const vec3 PAGE_BG = vec3(0.0);

  // --- hashing & noise -----------------------------------------------------
  float hash13(vec3 p3) {
    p3 = fract(p3 * 0.1031);
    p3 += dot(p3, p3.zyx + 31.32);
    return fract((p3.x + p3.y) * p3.z);
  }

  float noise3(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash13(i), hash13(i + vec3(1, 0, 0)), u.x),
          mix(hash13(i + vec3(0, 1, 0)), hash13(i + vec3(1, 1, 0)), u.x), u.y),
      mix(mix(hash13(i + vec3(0, 0, 1)), hash13(i + vec3(1, 0, 1)), u.x),
          mix(hash13(i + vec3(0, 1, 1)), hash13(i + vec3(1, 1, 1)), u.x), u.y),
      u.z);
  }

  float fbm3(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise3(p);
      p = p * 2.07 + vec3(1.7, 9.2, 3.1);
      a *= 0.5;
    }
    return v;
  }

  // --- background ----------------------------------------------------------
  vec2 octahedral(vec3 d) {
    d /= abs(d.x) + abs(d.y) + abs(d.z);
    vec2 o = d.xz;
    if (d.y < 0.0) o = (1.0 - abs(d.zx)) * vec2(d.x >= 0.0 ? 1.0 : -1.0, d.z >= 0.0 ? 1.0 : -1.0);
    return o * 0.5 + 0.5;
  }

  vec3 sky(vec3 dir) {
    vec3 col = vec3(0.0);

    // Two layers of twinkling stars on an octahedral map of the sphere
    // (an even 2D grid over all directions).
    // Rotate so the viewing direction lands mid-face, away from the map's seams.
    const mat3 SKY_ROT = mat3(0.7071, 0.4082, 0.5774, -0.7071, 0.4082, 0.5774, 0.0, -0.8165, 0.5774);
    vec2 oct = octahedral(SKY_ROT * dir);
    for (int layer = 0; layer < 2; layer++) {
      float scale = layer == 0 ? 420.0 : 760.0;
      vec2 p = oct * scale;
      vec3 id = vec3(floor(p), float(layer) * 17.0);
      float h = hash13(id);
      if (h > (layer == 0 ? 0.95 : 0.965)) {
        vec2 offs = vec2(hash13(id + 1.0), hash13(id + 2.0)) - 0.5;
        float d = length(fract(p) - 0.5 - offs * 0.6);
        float twinkle = 0.7 + 0.3 * sin(uTime * (0.8 + h * 2.5) + h * 60.0);
        vec3 tint = mix(vec3(0.72, 0.8, 1.0), vec3(1.0, 0.85, 0.68), hash13(id + 5.0));
        col += tint * smoothstep(0.22, 0.0, d) * twinkle * (layer == 0 ? 0.8 : 0.45);
      }
    }

    // Faint, slowly drifting nebula dust.
    float n = fbm3(dir * 2.6 + vec3(0.0, 0.0, uTime * 0.004));
    col += vec3(0.05, 0.035, 0.09) * pow(n, 3.0) * 1.2;
    col += vec3(0.08, 0.04, 0.015) * pow(fbm3(dir * 4.1 + 7.0), 4.0);
    return col;
  }

  // --- accretion disk ------------------------------------------------------
  vec3 diskPalette(float t) {
    vec3 c = mix(vec3(0.32, 0.06, 0.02), vec3(1.0, 0.42, 0.1), smoothstep(0.0, 0.35, t));
    c = mix(c, vec3(1.0, 0.78, 0.48), smoothstep(0.35, 0.7, t));
    return mix(c, vec3(1.0, 0.96, 0.9), smoothstep(0.7, 1.0, t));
  }

  // Turbulent, differentially rotating gas. Inner orbits are faster
  // (Kepler: ω ∝ r^-1.5). Two time-offset copies are cross-faded so the
  // pattern never winds up into ever-thinner rings.
  float diskGas(vec3 p, float r) {
    const float PERIOD = 40.0;
    float phase = fract(uTime / PERIOD);
    float omega = 3.2 * pow(r, -1.5);
    float baseAngle = atan(p.z, p.x);

    float a1 = baseAngle + omega * phase * PERIOD;
    float a2 = baseAngle + omega * fract(phase + 0.5) * PERIOD;
    vec3 q1 = vec3(cos(a1) * 1.6, sin(a1) * 1.6, r * 1.9);
    vec3 q2 = vec3(cos(a2) * 1.6, sin(a2) * 1.6, r * 1.9 + 11.0);
    float w = 1.0 - abs(2.0 * phase - 1.0);
    return mix(fbm3(q2), fbm3(q1), w);
  }

  // Returns emitted light (rgb) and opacity (a) where a ray crosses the disk.
  vec4 shadeDisk(vec3 p, vec3 rayDir) {
    float r = length(p.xz);
    if (r < DISK_INNER || r > DISK_OUTER) return vec4(0.0);

    float gas = smoothstep(0.28, 0.8, diskGas(p, r));
    float edges = smoothstep(DISK_INNER, DISK_INNER + 0.7, r) * (1.0 - smoothstep(DISK_OUTER * 0.42, DISK_OUTER, r));

    // Relativistic beaming: gas moving towards the camera is brighter.
    vec3 orbitDir = normalize(vec3(-p.z, 0.0, p.x));
    float speed = sqrt(0.5 / r);
    float doppler = 1.0 / (1.0 - speed * dot(orbitDir, -rayDir));
    float beaming = mix(1.0, pow(doppler, 3.0), 0.45);

    float temperature = clamp(pow(DISK_INNER / r, 1.15) * mix(1.0, doppler, 0.35), 0.0, 1.0);
    vec3 light = diskPalette(temperature) * (0.3 + 1.5 * gas) * (0.2 + 2.2 * temperature) * beaming * edges;
    float alpha = edges * clamp(0.3 + 0.65 * gas, 0.0, 1.0);
    return vec4(light, alpha);
  }

  void main() {
    // Scale by the shorter side so the whole black hole fits on phones too.
    float minSide = min(uResolution.x, uResolution.y);
    vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / minSide;
    uv.y += 0.1; // sit below the headline

    // Camera: nearly edge-on, drifting slowly and leaning towards the mouse.
    float tilt = 0.11 + 0.035 * sin(uTime * 0.045) + uPointer.y * 0.05;
    float yaw = 0.28 * sin(uTime * 0.025) + uPointer.x * 0.16;
    vec3 rayOrigin = CAMERA_DISTANCE * vec3(sin(yaw) * cos(tilt), sin(tilt), -cos(yaw) * cos(tilt));
    vec3 forward = normalize(-rayOrigin);
    vec3 right = normalize(cross(forward, vec3(0.0, 1.0, 0.0)));
    vec3 up = cross(right, forward);
    vec3 dir = normalize(forward * 2.0 + uv.x * right + uv.y * up);

    vec3 pos = rayOrigin;
    vec3 vel = dir;
    vec3 h = cross(pos, vel);
    float h2 = dot(h, h);

    vec3 col = vec3(0.0);
    float transmittance = 1.0;
    bool captured = false;

    for (int i = 0; i < MAX_STEPS; i++) {
      float r2 = dot(pos, pos);
      float r = sqrt(r2);
      if (r < 1.0) { captured = true; break; }
      if (r > CAMERA_DISTANCE + 6.0 && dot(pos, vel) > 0.0) break;
      if (transmittance < 0.02) break;

      // Small steps near the hole (strong bending), large ones far away.
      float dt = clamp(0.05 * r, 0.02, 1.6);
      vec3 prev = pos;
      vel += -1.5 * h2 * pos / (r2 * r2 * r) * dt;
      pos += vel * dt;

      // Soft glow hugging the disk plane.
      float planeR = length(pos.xz);
      col += transmittance * vec3(1.0, 0.5, 0.18) * 0.0035 * dt
        * exp(-abs(pos.y) * 2.0) * smoothstep(DISK_OUTER * 1.2, DISK_INNER * 1.3, planeR) * step(DISK_INNER, r);

      if (prev.y * pos.y < 0.0) {
        vec3 hit = mix(prev, pos, prev.y / (prev.y - pos.y));
        vec4 disk = shadeDisk(hit, normalize(vel));
        col += transmittance * disk.rgb * disk.a;
        transmittance *= 1.0 - disk.a;
      }
    }

    // Full-strength lensing smears the whole starfield into arcs this close to
    // the hole; bend the background by less so stars stay points (the disk
    // keeps full-strength bending).
    if (!captured) col += transmittance * sky(normalize(mix(dir, normalize(vel), 0.3)));

    // Exposure + tone mapping.
    col = 1.0 - exp(-col * 1.1);

    // Vignette, then fade the bottom edge into the page background.
    vec2 screen = gl_FragCoord.xy / uResolution;
    float vignette = smoothstep(1.3, 0.3, length((screen - 0.5) * vec2(uResolution.x / uResolution.y * 0.55, 1.0)));
    col *= mix(0.45, 1.0, vignette);
    // Keep the headline area calmer so the text stays readable.
    col *= 1.0 - 0.35 * smoothstep(0.55, 0.85, screen.y);
    col = mix(PAGE_BG, col, smoothstep(0.0, 0.22, screen.y));

    gl_FragColor = vec4(pow(col, vec3(1.0 / 2.2)), 1.0);
  }
`;

/**
 * Full-screen black hole. `animate={false}` renders a single still frame
 * (used for prefers-reduced-motion).
 */
const BlackHole = ({ animate = true }) => {
    const materialRef = useRef(null);
    const pointerTargetRef = useRef(new Vector2());

    const uniforms = useMemo(
        () => ({
            uTime: { value: 18 },
            uResolution: { value: new Vector2(1, 1) },
            uPointer: { value: new Vector2() },
        }),
        [],
    );

    // Lean the camera slightly towards the mouse. Touch is ignored so that
    // scrolling on phones never moves the scene.
    useEffect(() => {
        const onPointerMove = (event) => {
            if (event.pointerType !== 'mouse') return;
            pointerTargetRef.current.set(
                (event.clientX / window.innerWidth) * 2 - 1,
                1 - (event.clientY / window.innerHeight) * 2,
            );
        };
        window.addEventListener('pointermove', onPointerMove, { passive: true });
        return () => window.removeEventListener('pointermove', onPointerMove);
    }, []);

    useFrame((state, delta) => {
        const material = materialRef.current;
        if (!material) return;
        const u = material.uniforms;
        state.gl.getDrawingBufferSize(u.uResolution.value);
        if (animate) u.uTime.value += Math.min(delta, 0.1);
        u.uPointer.value.lerp(pointerTargetRef.current, Math.min(1, delta * 2));
    });

    return (
        <mesh frustumCulled={false}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                ref={materialRef}
                uniforms={uniforms}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                depthTest={false}
                depthWrite={false}
            />
        </mesh>
    );
};

export default BlackHole;
