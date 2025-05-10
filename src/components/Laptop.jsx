import React, { useEffect, useRef, useState } from 'react';
import { useGLTF, useVideoTexture } from '@react-three/drei';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import * as THREE from 'three';

export function Laptop(props) {
    const group = useRef(null);
    const videoPlane = useRef(null);
    const { nodes, materials } = useGLTF('/models/laptop.glb');

    const [isVideoReady, setIsVideoReady] = useState(false);
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        const userAgent = navigator.userAgent;
        setIsIOS(/iPad|iPhone|iPod/.test(userAgent));
    }, []);

    const [videoDimensions, setVideoDimensions] = useState({ width: 30, height: 19 });
    const videoPosition = { x: 0, y: 10.5, z: -10.6 };
    const textureSrc = props.texture || '/textures/project/project1.mp4';

    useEffect(() => {
        if (textureSrc.includes('project3.mp4') || textureSrc.includes('Project5.mp4')) {
            setVideoDimensions({ width: 10, height: 20 }); // Set specific dimensions for project4.mp4 and Project5.mp4
        } else {
            setVideoDimensions({ width: 30, height: 19 }); // Default dimensions
        }
    }, [textureSrc]);

    const videoTextureConfig = {
        unsuspend: isIOS ? 'click' : 'canplay',
        crossOrigin: 'Anonymous',
        muted: true,
        playsInline: true
    };

    const videoTexture = useVideoTexture(textureSrc, videoTextureConfig);

    useEffect(() => {
        if (!videoTexture) return;

        videoTexture.flipY = true;
        const video = videoTexture.source.data;
        if (!video) return;

        const handleLoadedMetadata = () => {
            const scaleFactor = 0.01;
            setVideoDimensions({
                width: video.videoWidth * scaleFactor,
                height: video.videoHeight * scaleFactor
            });
        };

        const handleCanPlay = () => setIsVideoReady(true);
        const handleError = (e) => {
            console.error('Video error:', e);
            setIsVideoReady(true);
        };

        let touchHandler;
        if (isIOS) {
            touchHandler = () => {
                video.play().catch(console.error);
            };
            document.addEventListener('touchstart', touchHandler);
        }

        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('canplay', handleCanPlay);
        video.addEventListener('error', handleError);

        return () => {
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('canplay', handleCanPlay);
            video.removeEventListener('error', handleError);
            if (isIOS && touchHandler) {
                document.removeEventListener('touchstart', touchHandler);
            }
        };
    }, [videoTexture, isIOS]);

    useGSAP(() => {
        if (group.current) {
            gsap.from(group.current.rotation, {
                y: Math.PI / 2,
                duration: 1,
                ease: 'power3.inOut'
            });
        }
    }, [isVideoReady]);

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