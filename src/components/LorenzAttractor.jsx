import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const PARTICLE_COUNT = 10000;
const RESET_INTERVAL = 80; // Reset particles every 80 seconds

// Lorenz parameters
const SIGMA = 14;
const RHO = 24;
const BETA = 8 / 3;
const DT = 0.02;

// Reduced attractor scale for slower, elegant evolution
const ATTRACTOR_SCALE = 0.5;

// Rotation speed (radians per second)
const ROTATION_SPEED = 0.01;

// Gargantua-inspired palette (extracted from Interstellar)
const EVENT_HORIZON_RADIUS = 1.2;
const INNER_ACCRETION_DISK_RADIUS = 2.2;
const MID_ACCRETION_DISK_RADIUS = 4.0;
const OUTER_ACCRETION_DISK_RADIUS = 6.0;

const EVENT_HORIZON_COLOR = new THREE.Color('#000000'); // Pure black for event horizon
const BLUE_HIGHLIGHT_COLOR = new THREE.Color('#4DB5FF'); // Hint of blue in the innermost bright region
const INNER_ACCRETION_COLOR = new THREE.Color('#FEF6E4'); // Bright cream-white for inner accretion disk
const MID_ACCRETION_COLOR = new THREE.Color('#FFDEB4'); // Light peach for mid accretion
const OUTER_ACCRETION_COLOR = new THREE.Color('#FACCAF'); // Pinkish peach for outer edges
const DARK_OUTER_COLOR = new THREE.Color('#A66847'); // Dark reddish-brown for the very outer regions

// Focal point of the attractor (near the event horizon)
const CENTER = new THREE.Vector3(0, 0, 24);

// Scratch objects reused every frame to avoid allocating per particle
const scratchVec = new THREE.Vector3();
const scratchColor = new THREE.Color();

/** Fill `array` with particles starting near z=24 with slight variations. */
const fillInitialPositions = (array) => {
    for (let i = 0; i < array.length; i += 3) {
        array[i] = (Math.random() - 0.5) * 0.1;
        array[i + 1] = (Math.random() - 0.5) * 0.1;
        array[i + 2] = 24 + (Math.random() - 0.5) * 0.1;
    }
    return array;
};

/** Write the colour for a particle at distance `d` from the centre into `out`. */
const setGargantuaColor = (out, d) => {
    if (d < EVENT_HORIZON_RADIUS) {
        // Inside event horizon - pure black
        return out.copy(EVENT_HORIZON_COLOR);
    }
    if (d < INNER_ACCRETION_DISK_RADIUS) {
        // Transition from event horizon to inner accretion disk
        const t = (d - EVENT_HORIZON_RADIUS) / (INNER_ACCRETION_DISK_RADIUS - EVENT_HORIZON_RADIUS);
        return out.copy(EVENT_HORIZON_COLOR).lerp(BLUE_HIGHLIGHT_COLOR, t * 0.3).lerp(INNER_ACCRETION_COLOR, t);
    }
    if (d < MID_ACCRETION_DISK_RADIUS) {
        // Transition from inner to mid accretion disk
        const t = (d - INNER_ACCRETION_DISK_RADIUS) / (MID_ACCRETION_DISK_RADIUS - INNER_ACCRETION_DISK_RADIUS);
        return out.copy(INNER_ACCRETION_COLOR).lerp(MID_ACCRETION_COLOR, t);
    }
    if (d < OUTER_ACCRETION_DISK_RADIUS) {
        // Transition to outer edge
        const t = Math.min((d - MID_ACCRETION_DISK_RADIUS) / (OUTER_ACCRETION_DISK_RADIUS - MID_ACCRETION_DISK_RADIUS), 1.0);
        return out.copy(MID_ACCRETION_COLOR).lerp(OUTER_ACCRETION_COLOR, t);
    }
    // Furthest outer regions
    const t = Math.min((d - OUTER_ACCRETION_DISK_RADIUS) / 2.0, 1.0);
    return out.copy(OUTER_ACCRETION_COLOR).lerp(DARK_OUTER_COLOR, t);
};

const LorenzAttractor = ({
    position = [0, 0, 0],
    scale = 5,
    pointSize = 1.0, // Increased point size for better visibility
}) => {
    // Ref for overall attractor group for rotation
    const attractorRef = useRef(null);
    const pointsRef = useRef(null);

    // Timer for auto-reset
    const timerRef = useRef(0);

    // Created once per mount; the lazy initializer keeps render pure.
    const [positions] = useState(() => fillInitialPositions(new Float32Array(PARTICLE_COUNT * 3)));
    const [colors] = useState(() => new Float32Array(PARTICLE_COUNT * 3));

    // Set an initial rotation of 95° (in radians) on the y-axis
    useEffect(() => {
        if (attractorRef.current) {
            attractorRef.current.rotation.y = 95 * (Math.PI / 180);
        }
    }, []);

    useFrame((state, delta) => {
        if (!pointsRef.current || !attractorRef.current) return;

        // Slowly rotate the entire attractor group
        attractorRef.current.rotation.y += delta * ROTATION_SPEED;

        const positionsAttr = pointsRef.current.geometry.attributes.position;
        const colorsAttr = pointsRef.current.geometry.attributes.color;
        const posArray = positionsAttr.array;
        const colorArray = colorsAttr.array;

        // Increment timer and periodically reset the particles
        timerRef.current += delta;
        if (timerRef.current > RESET_INTERVAL) {
            fillInitialPositions(posArray);
            timerRef.current = 0;
        }

        // Update each particle using the Lorenz equations and update its colour
        for (let i = 0; i < posArray.length; i += 3) {
            const x = posArray[i];
            const y = posArray[i + 1];
            const z = posArray[i + 2];

            // Lorenz system differential equations
            const dx = SIGMA * (y - x);
            const dy = x * (RHO - z) - y;
            const dz = x * y - BETA * z;

            posArray[i] += dx * DT * ATTRACTOR_SCALE;
            posArray[i + 1] += dy * DT * ATTRACTOR_SCALE;
            posArray[i + 2] += dz * DT * ATTRACTOR_SCALE;

            scratchVec.set(posArray[i], posArray[i + 1], posArray[i + 2]);
            setGargantuaColor(scratchColor, scratchVec.distanceTo(CENTER));

            colorArray[i] = scratchColor.r;
            colorArray[i + 1] = scratchColor.g;
            colorArray[i + 2] = scratchColor.b;
        }

        positionsAttr.needsUpdate = true;
        colorsAttr.needsUpdate = true;
    });

    return (
        <group ref={attractorRef} position={position} scale={scale}>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                    <bufferAttribute attach="attributes-color" args={[colors, 3]} />
                </bufferGeometry>
                <pointsMaterial
                    size={pointSize}
                    sizeAttenuation
                    vertexColors
                    transparent
                    opacity={0.92}
                    blending={THREE.AdditiveBlending}
                    depthTest
                    depthWrite={false}
                />
            </points>
        </group>
    );
};

export default LorenzAttractor;
