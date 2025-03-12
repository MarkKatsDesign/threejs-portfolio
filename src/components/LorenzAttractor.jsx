// import { useFrame, useThree } from '@react-three/fiber';
// import { useMemo, useRef, useEffect, useState } from 'react';
// import * as THREE from 'three';
//
// const LorenzAttractor = ({
//                              onDebugUpdate,
//                              position = [0, 0, 0],
//                              scale = 1,
//                              // The color prop is no longer used directly since we use a custom color mapping
//                              pointSize = 1.5
//                          }) => {
//     // Ref for overall attractor group for rotation
//     const attractorRef = useRef();
//     const points = useRef();
//     const { camera } = useThree();
//     const particleCount = 5000;
//     const [debugInfo, setDebugInfo] = useState({});
//
//     // Timer for auto-reset
//     const timer = useRef(0);
//     const resetInterval = 80; // Reset particles every 60 seconds
//
//     // Lorenz parameters
//     const sigma = 10;
//     const rho = 28;
//     const beta = 8 / 3;
//     const dt = 0.004;
//
//     // Reduced attractor scale for slower, elegant evolution
//     const attractorScale = 1;
//
//     // // Rotation speed (radians per second)
//     // const rotationSpeed = 0.001;
//
//     // Initialize particle positions—starting near z=24 with slight variations
//     const positions = useMemo(() => {
//         const pos = new Float32Array(particleCount * 3);
//         for (let i = 0; i < particleCount * 3; i += 3) {
//             pos[i] = (Math.random() - 0.5) * 0.1;
//             pos[i + 1] = (Math.random() - 0.5) * 0.1;
//             pos[i + 2] = 24 + (Math.random() - 0.5) * 0.1;
//         }
//         return pos;
//     }, [particleCount]);
//
//     // Initialize colors array (will be updated per frame)
//     const colors = useMemo(() => {
//         return new Float32Array(particleCount * 3);
//     }, [particleCount]);
//
//     // Function to reset particles to initial positions
//     const resetParticles = () => {
//         if (!points.current) return;
//         const positionsAttr = points.current.geometry.attributes.position;
//         const posArray = positionsAttr.array;
//         for (let i = 0; i < posArray.length; i += 3) {
//             posArray[i] = (Math.random() - 0.5) * 0.1;
//             posArray[i + 1] = (Math.random() - 0.5) * 0.1;
//             posArray[i + 2] = 24 + (Math.random() - 0.5) * 0.1;
//         }
//         positionsAttr.needsUpdate = true;
//         timer.current = 0;
//     };
//
//     // Set an initial rotation of 40° (in radians) on the y-axis
//     useEffect(() => {
//         if (attractorRef.current) {
//             attractorRef.current.rotation.y = 95 * (Math.PI / 180);
//         }
//     }, []);
//
//     // Helper function to map a particle’s position to a Gargantua-inspired color
//     const getGargantuaColor = (vec) => {
//         // Define the attractor's center (e.g., near the event horizon / focal point)
//         const center = new THREE.Vector3(0, 0, 24);
//         // Calculate distance from the center
//         const d = vec.distanceTo(center);
//         // Compute a factor from 0 to 1 (adjust 5 as needed based on your attractor's scale)
//         const factor = Math.min(Math.max(d / 5, 0), 1);
//         // Define the inner color (deep dark blue) and outer color (fiery orange)
//         const innerColor = new THREE.Color("#0D1B2A"); // dark blue
//         const outerColor = new THREE.Color("#f6e6af"); // bright orange
//         return innerColor.clone().lerp(outerColor, factor);
//     };
//
//     useFrame((state, delta) => {
//         if (!points.current || !attractorRef.current) return;
//
//         // Slowly rotate the entire attractor group
//         // attractorRef.current.rotation.y += delta * rotationSpeed;
//
//         // Increment timer and check for reset
//         timer.current += delta;
//         if (timer.current > resetInterval) {
//             resetParticles();
//         }
//
//         const positionsAttr = points.current.geometry.attributes.position;
//         const colorsAttr = points.current.geometry.attributes.color;
//         const posArray = positionsAttr.array;
//
//         let visibleParticles = 0;
//         const bounds = new THREE.Box3();
//         const vec = new THREE.Vector3();
//         const centroid = new THREE.Vector3();
//         let particlesProcessed = 0;
//
//         // Update each particle using the Lorenz equations and update its color
//         for (let i = 0; i < posArray.length; i += 3) {
//             const x = posArray[i];
//             const y = posArray[i + 1];
//             const z = posArray[i + 2];
//
//             // Lorenz system differential equations
//             const dx = sigma * (y - x);
//             const dy = x * (rho - z) - y;
//             const dz = x * y - beta * z;
//
//             posArray[i] += dx * dt * attractorScale;
//             posArray[i + 1] += dy * dt * attractorScale;
//             posArray[i + 2] += dz * dt * attractorScale;
//
//             // Accumulate for centroid calculation
//             centroid.x += posArray[i];
//             centroid.y += posArray[i + 1];
//             centroid.z += posArray[i + 2];
//             particlesProcessed++;
//
//             vec.set(posArray[i], posArray[i + 1], posArray[i + 2]);
//             bounds.expandByPoint(vec);
//
//             // Use our custom color mapping to simulate Gargantua's hues
//             const newColor = getGargantuaColor(vec);
//             colorsAttr.array[i] = newColor.r;
//             colorsAttr.array[i + 1] = newColor.g;
//             colorsAttr.array[i + 2] = newColor.b;
//
//             // Optionally count visible particles (if within a distance threshold)
//             if (camera.position.distanceTo(vec) < 100) visibleParticles++;
//         }
//
//         if (particlesProcessed > 0) {
//             centroid.divideScalar(particlesProcessed);
//         }
//
//         if (onDebugUpdate) {
//             const debugData = {
//                 totalParticles: particleCount,
//                 visibleParticles,
//                 bounds: bounds.getSize(new THREE.Vector3()),
//                 cameraPos: camera.position.toArray(),
//                 centroid: centroid.toArray(),
//                 materialSize: points.current.material.size,
//                 timer: timer.current.toFixed(1)
//             };
//             onDebugUpdate(debugData);
//         }
//
//         positionsAttr.needsUpdate = true;
//         colorsAttr.needsUpdate = true;
//     });
//
//     return (
//         <group ref={attractorRef} position={position} scale={scale}>
//             <points ref={points}>
//                 <bufferGeometry>
//                     <bufferAttribute
//                         attach="attributes-position"
//                         count={particleCount}
//                         array={positions}
//                         itemSize={3}
//                     />
//                     <bufferAttribute
//                         attach="attributes-color"
//                         count={particleCount}
//                         array={colors}
//                         itemSize={3}
//                     />
//                 </bufferGeometry>
//                 <pointsMaterial
//                     size={pointSize}
//                     sizeAttenuation={true}
//                     vertexColors
//                     transparent
//                     opacity={0.85}
//                     blending={THREE.AdditiveBlending}
//                     depthTest={true}
//                 />
//             </points>
//         </group>
//     );
// };
//
// export const DebugInfo = ({ debugInfo }) => (
//     <div style={{
//         position: 'fixed',
//         top: '10px',
//         left: '10px',
//         background: 'rgba(0,0,0,0.7)',
//         color: 'white',
//         padding: '10px',
//         zIndex: 1000,
//         fontSize: '12px',
//         maxWidth: '250px',
//         overflow: 'auto'
//     }}>
//         <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
//     </div>
// );
//
// export default LorenzAttractor;





import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const LorenzAttractor = ({
                             onDebugUpdate,
                             position = [0, 0, 0],
                             scale = 5,
                             pointSize = 1.0  // Increased point size for better visibility
                         }) => {
    // Ref for overall attractor group for rotation
    const attractorRef = useRef();
    const points = useRef();
    const { camera } = useThree();
    const particleCount = 10000;
    const [debugInfo, setDebugInfo] = useState({});

    // Timer for auto-reset
    const timer = useRef(0);
    const resetInterval = 80; // Reset particles every 80 seconds

    // Lorenz parameters
    const sigma = 14;
    const rho = 24;
    const beta = 8 / 3;
    const dt = 0.02;

    // Reduced attractor scale for slower, elegant evolution
    const attractorScale = 0.5;

    // Rotation speed (radians per second)
    const rotationSpeed = 0.01;

    // Initialize particle positions—starting near z=24 with slight variations
    const positions = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount * 3; i += 3) {
            pos[i] = (Math.random() - 0.5) * 0.1;
            pos[i + 1] = (Math.random() - 0.5) * 0.1;
            pos[i + 2] = 24 + (Math.random() - 0.5) * 0.1;
        }
        return pos;
    }, [particleCount]);

    // Initialize colors array (will be updated per frame)
    const colors = useMemo(() => {
        return new Float32Array(particleCount * 3);
    }, [particleCount]);

    // Initialize sizes array for variable point sizes
    const sizes = useMemo(() => {
        return new Float32Array(particleCount);
    }, [particleCount]);

    // Function to reset particles to initial positions
    const resetParticles = () => {
        if (!points.current) return;
        const positionsAttr = points.current.geometry.attributes.position;
        const posArray = positionsAttr.array;
        for (let i = 0; i < posArray.length; i += 3) {
            posArray[i] = (Math.random() - 0.5) * 0.1;
            posArray[i + 1] = (Math.random() - 0.5) * 0.1;
            posArray[i + 2] = 24 + (Math.random() - 0.5) * 0.1;
        }
        positionsAttr.needsUpdate = true;
        timer.current = 0;
    };

    // Set an initial rotation of 95° (in radians) on the y-axis
    useEffect(() => {
        if (attractorRef.current) {
            attractorRef.current.rotation.y = 95 * (Math.PI / 180);
        }
    }, []);

    // Helper function to map a particle's position to a Gargantua-inspired color
    const getGargantuaColor = (vec, center) => {
        // Calculate distance from the center
        const d = vec.distanceTo(center);

        // Define radii for different zones of the black hole
        const eventHorizonRadius = 1.2;
        const innerAccretionDiskRadius = 2.2;
        const midAccretionDiskRadius = 4.0;
        const outerAccretionDiskRadius = 6.0;

        // Calculate normalized distance factor
        const factor = d / outerAccretionDiskRadius;

        // Define colors using the extracted colors from Interstellar
        const eventHorizonColor = new THREE.Color("#000000"); // Pure black for event horizon
        const innerAccretionColor = new THREE.Color("#FEF6E4"); // Bright cream-white for inner accretion disk
        const midAccretionColor = new THREE.Color("#FFDEB4"); // Light peach for mid accretion
        const outerAccretionColor = new THREE.Color("#FACCAF"); // Pinkish peach for outer edges
        const darkOuterColor = new THREE.Color("#A66847"); // Dark reddish-brown for the very outer regions

        // Create color based on distance
        let finalColor;

        if (d < eventHorizonRadius) {
            // Inside event horizon - pure black
            finalColor = eventHorizonColor.clone();
            return { color: finalColor, size: 0.5, emission: 0.0 }; // Smaller, non-emissive points
        } else if (d < innerAccretionDiskRadius) {
            // Transition from event horizon to inner accretion disk
            const t = (d - eventHorizonRadius) / (innerAccretionDiskRadius - eventHorizonRadius);
            // Add a hint of blue to the innermost bright region to maintain some visual interest
            const blueHighlight = new THREE.Color("#4DB5FF");
            const transitionColor = eventHorizonColor.clone().lerp(blueHighlight, t * 0.3);
            finalColor = transitionColor.lerp(innerAccretionColor, t);
            const emission = t * 2.5; // Increased emission for brighter effect
            return { color: finalColor, size: 0.5 + t * 1.8, emission: emission };
        } else if (d < midAccretionDiskRadius) {
            // Transition from inner to mid accretion disk
            const t = (d - innerAccretionDiskRadius) / (midAccretionDiskRadius - innerAccretionDiskRadius);
            finalColor = innerAccretionColor.clone().lerp(midAccretionColor, t);
            return { color: finalColor, size: 2.0, emission: 2.0 }; // Bright emissive region
        } else if (d < outerAccretionDiskRadius) {
            // Transition to outer edge
            const t = Math.min((d - midAccretionDiskRadius) / (outerAccretionDiskRadius - midAccretionDiskRadius), 1.0);
            finalColor = midAccretionColor.clone().lerp(outerAccretionColor, t);
            const emission = 2.0 - t * 1.5; // Decreasing emission toward edges
            return { color: finalColor, size: 2.0 - t * 0.5, emission: emission };
        } else {
            // Furthest outer regions
            const t = Math.min((d - outerAccretionDiskRadius) / 2.0, 1.0);
            finalColor = outerAccretionColor.clone().lerp(darkOuterColor, t);
            const emission = 0.5 - t * 0.5; // Minimal emission at the very edge
            return { color: finalColor, size: 1.5 - t * 0.5, emission: emission };
        }
    };

    useFrame((state, delta) => {
        if (!points.current || !attractorRef.current) return;

        // Slowly rotate the entire attractor group
        attractorRef.current.rotation.y += delta * rotationSpeed;

        // Increment timer and check for reset
        timer.current += delta;
        if (timer.current > resetInterval) {
            resetParticles();
        }

        const positionsAttr = points.current.geometry.attributes.position;
        const colorsAttr = points.current.geometry.attributes.color;
        const sizesAttr = points.current.geometry.attributes.size;
        const posArray = positionsAttr.array;

        let visibleParticles = 0;
        const bounds = new THREE.Box3();
        const vec = new THREE.Vector3();
        const centroid = new THREE.Vector3();
        let particlesProcessed = 0;

        // Define the attractor's center (e.g., near the event horizon / focal point)
        const center = new THREE.Vector3(0, 0, 24);

        // Update each particle using the Lorenz equations and update its color
        for (let i = 0; i < posArray.length; i += 3) {
            const x = posArray[i];
            const y = posArray[i + 1];
            const z = posArray[i + 2];

            // Lorenz system differential equations
            const dx = sigma * (y - x);
            const dy = x * (rho - z) - y;
            const dz = x * y - beta * z;

            posArray[i] += dx * dt * attractorScale;
            posArray[i + 1] += dy * dt * attractorScale;
            posArray[i + 2] += dz * dt * attractorScale;

            // Accumulate for centroid calculation
            centroid.x += posArray[i];
            centroid.y += posArray[i + 1];
            centroid.z += posArray[i + 2];
            particlesProcessed++;

            vec.set(posArray[i], posArray[i + 1], posArray[i + 2]);
            bounds.expandByPoint(vec);

            // Use our custom color mapping to simulate Gargantua's hues
            const { color, size, emission } = getGargantuaColor(vec, center);

            // Apply color
            colorsAttr.array[i] = color.r;
            colorsAttr.array[i + 1] = color.g;
            colorsAttr.array[i + 2] = color.b;

            // Apply size variation
            const idx = i / 3;
            sizesAttr.array[idx] = pointSize * size;

            // Optionally count visible particles (if within a distance threshold)
            if (camera.position.distanceTo(vec) < 100) visibleParticles++;
        }

        if (particlesProcessed > 0) {
            centroid.divideScalar(particlesProcessed);
        }

        // if (onDebugUpdate) {
        //     const debugData = {
        //         totalParticles: particleCount,
        //         visibleParticles,
        //         bounds: bounds.getSize(new THREE.Vector3()),
        //         cameraPos: camera.position.toArray(),
        //         centroid: centroid.toArray(),
        //         materialSize: points.current.material.size,
        //         timer: timer.current.toFixed(1)
        //     };
        //     onDebugUpdate(debugData);
        // }

        positionsAttr.needsUpdate = true;
        colorsAttr.needsUpdate = true;
        sizesAttr.needsUpdate = true;
    });

    return (
        <group ref={attractorRef} position={position} scale={scale}>
            <points ref={points}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={particleCount}
                        array={positions}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        count={particleCount}
                        array={colors}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-size"
                        count={particleCount}
                        array={sizes}
                        itemSize={1}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={pointSize}
                    sizeAttenuation={true}
                    vertexColors
                    transparent
                    opacity={0.92}
                    blending={THREE.AdditiveBlending}
                    depthTest={true}
                    depthWrite={false}
                    emissive={new THREE.Color(0xFFFFFF)}
                    emissiveIntensity={1.8}
                />
            </points>
        </group>
    );
};

// export const DebugInfo = ({ debugInfo }) => (
//     <div style={{
//         position: 'fixed',
//         top: '10px',
//         left: '10px',
//         background: 'rgba(0,0,0,0.7)',
//         color: 'white',
//         padding: '10px',
//         zIndex: 1000,
//         fontSize: '12px',
//         maxWidth: '250px',
//         overflow: 'auto'
//     }}>
//         <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
//     </div>
// );

export default LorenzAttractor;
