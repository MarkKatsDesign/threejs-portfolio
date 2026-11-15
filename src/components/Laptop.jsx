import { useEffect, useRef, useState } from 'react';
import { useGLTF, useVideoTexture } from '@react-three/drei';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import * as THREE from 'three';

const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

const videoPosition = [0, 10.5, -10.6];

// Portrait recordings (project3 and Project5) need a tall plane; everything else is landscape.
const defaultDimensions = (src) =>
    src.includes('project3.mp4') || src.includes('Project5.mp4')
        ? { width: 10, height: 20 }
        : { width: 30, height: 19 };

const videoTextureConfig = {
    unsuspend: isIOS ? 'click' : 'canplay',
    crossOrigin: 'Anonymous',
    muted: true,
    playsInline: true
};

export function Laptop(props) {
    const groupRef = useRef(null);
    const { nodes, materials } = useGLTF('/models/laptop.glb');

    const [isVideoReady, setIsVideoReady] = useState(false);
    const textureSrc = props.texture || '/textures/project/project1.mp4';

    // Size reported by the video's metadata, remembered per source so that
    // switching projects falls back to the default for the new video.
    const [metadataDimensions, setMetadataDimensions] = useState(null);
    const videoDimensions =
        metadataDimensions?.src === textureSrc ? metadataDimensions : defaultDimensions(textureSrc);

    const videoTexture = useVideoTexture(textureSrc, videoTextureConfig);

    useEffect(() => {
        const video = videoTexture?.source.data;
        if (!video) return;

        const handleLoadedMetadata = () => {
            const scaleFactor = 0.01;
            setMetadataDimensions({
                src: textureSrc,
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
            if (touchHandler) {
                document.removeEventListener('touchstart', touchHandler);
            }
        };
    }, [videoTexture, textureSrc]);

    useGSAP(() => {
        if (groupRef.current) {
            gsap.from(groupRef.current.rotation, {
                y: Math.PI / 2,
                duration: 1,
                ease: 'power3.inOut'
            });
        }
    }, [isVideoReady]);

    return (
        <group ref={groupRef} {...props} dispose={null}>
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
                <mesh position={videoPosition}>
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