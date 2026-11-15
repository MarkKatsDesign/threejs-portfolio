import { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { DoubleSide, ExtrudeGeometry, Shape, ShapeGeometry, TextureLoader } from 'three';
import { AWARD_OUTLINE } from './awardOutline.js';

export const AWARD_TEXTURE_URL = '/assets/hackathon-award.webp';
useLoader.preload(TextureLoader, AWARD_TEXTURE_URL);

// Geometry is built in texture (UV) space, where the badge spans 0..1, so the
// artwork lines up exactly with the scalloped outline. The mesh is scaled up.
const THICKNESS = 0.035;
const BEVEL = 0.012;
const FACE_Z = THICKNESS / 2 + BEVEL + 0.0015;

const buildOutline = () => {
    const shape = new Shape();
    AWARD_OUTLINE.forEach((radius, i) => {
        const angle = (i / AWARD_OUTLINE.length) * Math.PI * 2;
        const x = 0.5 + 0.5 * radius * Math.cos(angle);
        const y = 0.5 + 0.5 * radius * Math.sin(angle);
        if (i === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
    });
    shape.closePath();
    return shape;
};

const buildGeometries = () => {
    const outline = buildOutline();

    const body = new ExtrudeGeometry(outline, {
        depth: THICKNESS,
        bevelEnabled: true,
        bevelThickness: BEVEL,
        bevelSize: BEVEL * 0.8,
        bevelSegments: 4,
        curveSegments: 1,
    });
    body.translate(-0.5, -0.5, -THICKNESS / 2);
    body.computeVertexNormals();

    // ShapeGeometry uses the shape's coordinates as UVs, i.e. the badge artwork.
    const face = new ShapeGeometry(outline, 1);
    face.translate(-0.5, -0.5, 0);

    return { body, face };
};

/**
 * The Microsoft Hackathon 2026 badge as a gold medal: the badge's own scalloped
 * outline extruded into a bevelled metal body, with the artwork on both sides.
 */
const AwardMedal = ({ scale = 3.4, ...props }) => {
    const spinRef = useRef(null);
    const [hovered, setHovered] = useState(false);
    const texture = useLoader(TextureLoader, AWARD_TEXTURE_URL);
    const { body, face } = useMemo(buildGeometries, []);

    useEffect(
        () => () => {
            body.dispose();
            face.dispose();
        },
        [body, face],
    );

    useFrame((_, delta) => {
        if (spinRef.current) spinRef.current.rotation.y += delta * (hovered ? 1.4 : 0.45);
    });

    return (
        <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.6}>
            <group
                ref={spinRef}
                scale={scale}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                {...props}
            >
                <mesh geometry={body} castShadow>
                    <meshStandardMaterial color="#c8962f" metalness={1} roughness={0.28} side={DoubleSide} />
                </mesh>

                {[FACE_Z, -FACE_Z].map((z) => (
                    // The back face is turned around so its artwork reads correctly too.
                    <mesh key={z} geometry={face} position-z={z} rotation-y={z > 0 ? 0 : Math.PI}>
                        <meshPhysicalMaterial
                            map={texture}
                            alphaTest={0.5}
                            metalness={0.45}
                            roughness={0.32}
                            clearcoat={1}
                            clearcoatRoughness={0.18}
                        />
                    </mesh>
                ))}
            </group>
        </Float>
    );
};

export default AwardMedal;
