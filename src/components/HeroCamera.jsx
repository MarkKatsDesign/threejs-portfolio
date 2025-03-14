import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const HeroCamera = ({ children, isMobile }) => {
    const groupRef = useRef();
    const { camera } = useThree();

    useFrame((state, delta) => {
        // Smoothly update camera position toward [0, 0, 35]
        camera.position.lerp(new THREE.Vector3(0, 0, 35), 0.05);

        // Apply a subtle parallax effect for non-mobile devices
        if (!isMobile && groupRef.current) {
            groupRef.current.rotation.x = THREE.MathUtils.lerp(
                groupRef.current.rotation.x,
                -state.pointer.y * 0.15,
                0.1
            );
            groupRef.current.rotation.y = THREE.MathUtils.lerp(
                groupRef.current.rotation.y,
                -state.pointer.x * 0.3,
                0.1
            );
        }
    });

    return (
        <group ref={groupRef} scale={isMobile ? 1 : 1.5}>
            {children}
        </group>
    );
};

export default HeroCamera;




