import { useEffect, useMemo, useRef } from 'react';
import { useAnimations, useFBX, useGLTF } from '@react-three/drei';

const MODEL_URL = '/models/human/developer.glb';
const animationUrl = (name) => `/models/animations/${name}.fbx`;

// Start downloading everything as soon as this module loads.
useGLTF.preload(MODEL_URL);
['idle', 'salute', 'clapping', 'victory', 'sitting', 'laying'].forEach((name) => useFBX.preload(animationUrl(name)));

/**
 * Returns a renamed copy of the FBX's first clip. The Mixamo root tracks
 * ("Armature.*" / "Armature001.*") are dropped: the GLB has no node with that
 * name, so three.js could not bind them and logged a warning for each one.
 */
const toClip = (fbx, name) => {
    const clip = fbx.animations[0].clone();
    clip.name = name;
    clip.tracks = clip.tracks.filter((track) => !track.name.startsWith('Armature'));
    return clip;
};

const Developer = ({ animationName = 'idle', ...props }) => {
    const groupRef = useRef(null);
    const { nodes, materials } = useGLTF(MODEL_URL);

    // Hooks must run unconditionally and in the same order on every render.
    // useFBX caches by URL, so these are cheap after the first load.
    const idle = useFBX(animationUrl('idle'));
    const salute = useFBX(animationUrl('salute'));
    const clapping = useFBX(animationUrl('clapping'));
    const victory = useFBX(animationUrl('victory'));
    const sitting = useFBX(animationUrl('sitting'));
    const laying = useFBX(animationUrl('laying'));

    const animations = useMemo(
        () => [
            toClip(idle, 'idle'),
            toClip(salute, 'salute'),
            toClip(clapping, 'clapping'),
            toClip(victory, 'victory'),
            toClip(sitting, 'sitting'),
            toClip(laying, 'laying'),
        ],
        [idle, salute, clapping, victory, sitting, laying],
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