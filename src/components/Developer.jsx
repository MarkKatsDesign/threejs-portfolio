import { useEffect, useMemo, useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';
import { AnimationClip, FileLoader } from 'three';

const MODEL_URL = '/models/human/developer.glb';
// Animation-only clips extracted from the Mixamo FBX files in assets-src/ by
// scripts/fbx-to-clips.mjs. Loading the FBX files directly downloaded ~7.6 MB of
// unused mesh data and made FBXLoader warn about excess skin weights.
const ANIMATIONS_URL = '/models/animations/developer-animations.json';
const loadAsJson = (loader) => loader.setResponseType('json');

// Start downloading everything as soon as this module loads.
useGLTF.preload(MODEL_URL);
useLoader.preload(FileLoader, ANIMATIONS_URL, loadAsJson);

const Developer = ({ animationName = 'idle', ...props }) => {
    const groupRef = useRef(null);
    const { nodes, materials } = useGLTF(MODEL_URL);
    const clipData = useLoader(FileLoader, ANIMATIONS_URL, loadAsJson);

    const animations = useMemo(
        () => Object.values(clipData).map((clip) => AnimationClip.parse(clip)),
        [clipData],
    );

    const { actions } = useAnimations(animations, groupRef);

    useEffect(() => {
        const action = actions[animationName];
        if (!action) {
            console.warn(`Animation "${animationName}" not found`);
            return;
        }

        action.reset().fadeIn(0.5).play();
        return () => {
            action.fadeOut(0.5);
        };
    }, [animationName, actions]);

    return (
        <group {...props} dispose={null} ref={groupRef}>
            <primitive object={nodes.Hips} />
            <skinnedMesh
                name="EyeLeft"
                geometry={nodes.EyeLeft.geometry}
                material={materials.Wolf3D_Eye}
                skeleton={nodes.EyeLeft.skeleton}
                morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
                morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
            />
            <skinnedMesh
                name="EyeRight"
                geometry={nodes.EyeRight.geometry}
                material={materials.Wolf3D_Eye}
                skeleton={nodes.EyeRight.skeleton}
                morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
                morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
            />
            <skinnedMesh
                name="Wolf3D_Head"
                geometry={nodes.Wolf3D_Head.geometry}
                material={materials.Wolf3D_Skin}
                skeleton={nodes.Wolf3D_Head.skeleton}
                morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
                morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
            />
            <skinnedMesh
                name="Wolf3D_Teeth"
                geometry={nodes.Wolf3D_Teeth.geometry}
                material={materials.Wolf3D_Teeth}
                skeleton={nodes.Wolf3D_Teeth.skeleton}
                morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
                morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
            />
            <skinnedMesh
                geometry={nodes.Wolf3D_Hair.geometry}
                material={materials.Wolf3D_Hair}
                skeleton={nodes.Wolf3D_Hair.skeleton}
            />
            <skinnedMesh
                geometry={nodes.Wolf3D_Glasses.geometry}
                material={materials.Wolf3D_Glasses}
                skeleton={nodes.Wolf3D_Glasses.skeleton}
            />
            <skinnedMesh
                geometry={nodes.Wolf3D_Outfit_Top.geometry}
                material={materials.Wolf3D_Outfit_Top}
                skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
            />
            <skinnedMesh
                geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
                material={materials.Wolf3D_Outfit_Bottom}
                skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
            />
            <skinnedMesh
                geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
                material={materials.Wolf3D_Outfit_Footwear}
                skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
            />
            <skinnedMesh
                geometry={nodes.Wolf3D_Body.geometry}
                material={materials.Wolf3D_Body}
                skeleton={nodes.Wolf3D_Body.skeleton}
            />
        </group>
    );
};

export default Developer;