import React, { useEffect, useRef } from 'react';
import { useAnimations, useFBX, useGLTF } from '@react-three/drei';

// Pre-load all animations outside the component
const preloadedModels = {
    model: null,
    idle: null,
    salute: null,
    clapping: null,
    victory: null,
    sitting: null,
    laying: null
};

// This function should be called once at app initialization
export const preloadDeveloperAssets = async () => {
    // This would be the ideal approach, but since we're fixing existing code,
    // we'll rely on the useGLTF.preload below
};

// Preload the model
useGLTF.preload('/models/human/developer.glb');

const Developer = ({ animationName = 'idle', ...props }) => {
    const group = useRef();

    // Load the model
    const { nodes, materials } = useGLTF('/models/human/developer.glb');

    // Load animations one by one with individual refs to prevent re-renders
    const idleAnimationRef = useRef();
    const saluteAnimationRef = useRef();
    const clappingAnimationRef = useRef();
    const victoryAnimationRef = useRef();
    const sittingAnimationRef = useRef();
    const layingAnimationRef = useRef();

    // Load animations and store in refs
    if (!idleAnimationRef.current) {
        idleAnimationRef.current = useFBX('/models/animations/idle.fbx').animations[0];
        idleAnimationRef.current.name = 'idle';
    }

    if (!saluteAnimationRef.current) {
        saluteAnimationRef.current = useFBX('/models/animations/salute.fbx').animations[0];
        saluteAnimationRef.current.name = 'salute';
    }

    if (!clappingAnimationRef.current) {
        clappingAnimationRef.current = useFBX('/models/animations/clapping.fbx').animations[0];
        clappingAnimationRef.current.name = 'clapping';
    }

    if (!victoryAnimationRef.current) {
        victoryAnimationRef.current = useFBX('/models/animations/victory.fbx').animations[0];
        victoryAnimationRef.current.name = 'victory';
    }

    if (!sittingAnimationRef.current) {
        sittingAnimationRef.current = useFBX('/models/animations/sitting.fbx').animations[0];
        sittingAnimationRef.current.name = 'sitting';
    }

    if (!layingAnimationRef.current) {
        layingAnimationRef.current = useFBX('/models/animations/laying.fbx').animations[0];
        layingAnimationRef.current.name = 'laying';
    }

    // Combine all animations for the useAnimations hook
    const animations = [
        idleAnimationRef.current,
        saluteAnimationRef.current,
        clappingAnimationRef.current,
        victoryAnimationRef.current,
        sittingAnimationRef.current,
        layingAnimationRef.current
    ].filter(Boolean); // Filter out any undefined animations

    // Set up animations only when all are loaded
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        // Only play animation if it exists in actions
        if (actions && actions[animationName]) {
            actions[animationName].reset().fadeIn(0.5).play();

            return () => {
                if (actions[animationName]) {
                    actions[animationName].fadeOut(0.5);
                }
            };
        } else if (animations.length > 0) {
            console.warn(`Animation "${animationName}" not found in actions:`, actions);
        }
    }, [animationName, actions, animations.length]);

    return (
        <group {...props} dispose={null} ref={group}>
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