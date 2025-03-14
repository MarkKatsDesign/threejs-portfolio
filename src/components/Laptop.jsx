// import React, { useEffect, useRef, useState } from 'react';
// import { useGLTF, useVideoTexture, useHelper } from '@react-three/drei';
// import { useGSAP } from '@gsap/react';
// import gsap from 'gsap';
// import * as THREE from 'three';
//
// export function Laptop(props) {
//     const group = useRef();
//     const videoPlane = useRef();
//     const { nodes, materials } = useGLTF('/models/laptop.glb');
//     // Removed console.log for loaded GLB model
//
//     // We'll store the computed video geometry dimensions here.
//     // They will be computed from the intrinsic video dimensions.
//     const [videoDimensions, setVideoDimensions] = useState({ width: 30, height: 19 } );
//     // Position for the video plane in front of the laptop screen
//     const videoPosition = { x: 0, y: 10.5, z: -10.6 };
//
//     const textureSrc = props.texture ? props.texture : '/textures/project/project1.mp4';
//
//     // Check if the textureSrc is project3.mp4 and update dimensions accordingly
//     useEffect(() => {
//         if (textureSrc.includes('project3.mp4')) {
//             setVideoDimensions({ width: 10, height: 20 }); // Set your specific dimensions for project3.mp4
//         } else {
//             setVideoDimensions({ width: 30, height: 19 }); // Default dimensions
//         }
//     }, [textureSrc]);
//
//
//
//     const videoTexture = useVideoTexture(textureSrc, {
//         unsuspend: 'canplay',
//         crossOrigin: 'Anonymous',
//         muted: props.muted !== undefined ? props.muted : true
//     });
//
//     useEffect(() => {
//         if (videoTexture) {
//             videoTexture.flipY = true; // Ensure proper orientation
//             const video = videoTexture.source.data;
//             if (video) {
//                 video.addEventListener('loadedmetadata', () => {
//                     // Removed console.log for video metadata
//
//                     // Calculate dimensions based on the video's intrinsic size.
//                     // Here, we apply a scale factor to convert from pixel dimensions to scene units.
//                     const scaleFactor = 0.01; // Adjust this factor to fit your scene's scale
//                     const computedWidth = video.videoWidth * scaleFactor;
//                     const computedHeight = video.videoHeight * scaleFactor;
//                     setVideoDimensions({ width: computedWidth, height: computedHeight });
//                 });
//
//                 video.addEventListener('play', () => {
//                     // Removed console.log for video playing
//                 });
//
//                 video.addEventListener('error', (e) => {
//                     // Keeping error logging since this is important for debugging
//                     // but you can comment this out too if preferred
//                     console.error('Video error:', e);
//                 });
//             }
//         }
//     }, [videoTexture]);
//
//
//     // Animate the laptop group rotation using GSAP
//     useGSAP(() => {
//         gsap.from(group.current.rotation, {
//             y: Math.PI / 2,
//             duration: 1,
//             ease: 'power3.inOut'
//         });
//     }, [videoTexture]);
//
//     // Debug helper to visualize the boundaries of the video plane (cyan outline)
//     // useHelper(videoPlane, THREE.BoxHelper, 'cyan');
//
//     return (
//         <group ref={group} {...props} dispose={null}>
//             <mesh
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Frame_ComputerFrame_0.geometry}
//                 material={materials.ComputerFrame}
//                 position={[0, 0.976, 0]}
//                 rotation={[-Math.PI / 2, 0, 0]}
//                 scale={100}
//             />
//
//             {/* Main laptop screen */}
//             <mesh
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Screen_ComputerScreen_0.geometry}
//                 position={[0, 0.65, -10.3]}
//                 rotation={[Math.PI, 0, -Math.PI]}
//                 scale={[100, 100, 88.235]}
//             >
//                 <meshBasicMaterial color="black" />
//             </mesh>
//
//             {/* Video overlay using the intrinsic video dimensions */}
//             <mesh
//                 ref={videoPlane}
//                 position={[videoPosition.x, videoPosition.y, videoPosition.z]}
//                 rotation={[0, 0, 0]}
//             >
//                 <planeGeometry args={[videoDimensions.width, videoDimensions.height]} />
//                 <meshBasicMaterial
//                     map={videoTexture}
//                     toneMapped={false}
//                     transparent={true}
//                     opacity={1}
//                     side={THREE.FrontSide}
//                 />
//             </mesh>
//
//             {/* Optional debug mesh to further visualize positioning (hidden by default) */}
//             {/*<mesh*/}
//             {/*    position={[0, 0.65, -10.05]}*/}
//             {/*    rotation={[0, 0, 0]}*/}
//             {/*    scale={[40, 30, 1]}*/}
//             {/*    visible={false}*/}
//             {/*>*/}
//             {/*    <planeGeometry args={[1, 1]} />*/}
//             {/*    <meshBasicMaterial color="yellow" opacity={0.3} transparent={true} />*/}
//             {/*</mesh>*/}
//         </group>
//     );
// }
//
// useGLTF.preload('/models/laptop.glb');
//
// export default Laptop;



import React, { useEffect, useRef, useState } from 'react';
import { useGLTF, useVideoTexture, useHelper } from '@react-three/drei';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import * as THREE from 'three';

export function Laptop(props) {
    const group = useRef();
    const videoPlane = useRef();
    const { nodes, materials } = useGLTF('/models/laptop.glb');

    // Add loading state
    const [isVideoReady, setIsVideoReady] = useState(false);
    const [isIOS, setIsIOS] = useState(false);

    // Check for iOS
    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        setIsIOS(/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream);
    }, []);

    // Default dimensions
    const [videoDimensions, setVideoDimensions] = useState({ width: 30, height: 19 });
    const videoPosition = { x: 0, y: 10.5, z: -10.6 };

    const textureSrc = props.texture ? props.texture : '/textures/project/project1.mp4';

    // Update dimensions based on the video
    useEffect(() => {
        if (textureSrc.includes('project3.mp4')) {
            setVideoDimensions({ width: 10, height: 20 });
        } else {
            setVideoDimensions({ width: 30, height: 19 });
        }
    }, [textureSrc]);

    // Use a different approach for iOS
    const videoTextureConfig = {
        unsuspend: isIOS ? 'click' : 'canplay', // Use click for iOS
        crossOrigin: 'Anonymous',
        muted: true, // Always mute for mobile
        playsInline: true // Important for iOS
    };

    // Handle errors with video texture
    const videoTexture = useVideoTexture(textureSrc, videoTextureConfig, (error) => {
        console.error('Video texture error:', error);
        // Fallback to a placeholder texture if needed
    });

    useEffect(() => {
        if (videoTexture) {
            videoTexture.flipY = true;
            const video = videoTexture.source.data;

            if (video) {
                // Make sure to handle the iOS play attempt
                if (isIOS) {
                    document.addEventListener('touchstart', () => {
                        video.play().catch(e => console.error('iOS play error:', e));
                    }, { once: true });
                }

                video.addEventListener('loadedmetadata', () => {
                    const scaleFactor = 0.01;
                    const computedWidth = video.videoWidth * scaleFactor;
                    const computedHeight = video.videoHeight * scaleFactor;
                    setVideoDimensions({ width: computedWidth, height: computedHeight });
                });

                video.addEventListener('canplay', () => {
                    setIsVideoReady(true);
                });

                video.addEventListener('error', (e) => {
                    console.error('Video error:', e);
                    // Set ready anyway so the model displays without video
                    setIsVideoReady(true);
                });
            }
        }
    }, [videoTexture, isIOS]);

    // Animate the laptop group rotation using GSAP
    useGSAP(() => {
        if (group.current) {
            gsap.from(group.current.rotation, {
                y: Math.PI / 2,
                duration: 1,
                ease: 'power3.inOut'
            });
        }
    }, [isVideoReady]); // Only animate when video is ready or we've given up

    return (
        <group ref={group} {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Frame_ComputerFrame_0.geometry}
                material={materials.ComputerFrame}
                position={[0, 0.976, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
            />

            {/* Main laptop screen */}
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Screen_ComputerScreen_0.geometry}
                position={[0, 0.65, -10.3]}
                rotation={[Math.PI, 0, -Math.PI]}
                scale={[100, 100, 88.235]}
            >
                <meshBasicMaterial color="black" />
            </mesh>

            {/* Video overlay - conditionally render based on readiness */}
            {(isVideoReady || !isIOS) && (
                <mesh
                    ref={videoPlane}
                    position={[videoPosition.x, videoPosition.y, videoPosition.z]}
                    rotation={[0, 0, 0]}
                >
                    <planeGeometry args={[videoDimensions.width, videoDimensions.height]} />
                    <meshBasicMaterial
                        map={videoTexture}
                        toneMapped={false}
                        transparent={true}
                        opacity={1}
                        side={THREE.FrontSide}
                    />
                </mesh>
            )}
        </group>
    );
}

useGLTF.preload('/models/laptop.glb');

export default Laptop;