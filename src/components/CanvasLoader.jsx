import { useEffect } from 'react';
import { useProgress } from '@react-three/drei';

/**
 * Suspense fallback rendered *inside* a <Canvas>. It draws nothing in 3D; it only
 * tells the surrounding DOM that this canvas is still loading, so the overlay below
 * can be shown.
 *
 * (drei's <Html> was used here before, but it mounts a second React root and,
 * on React 19.2+, unmounting that root from a Suspense fallback throws
 * "Failed to execute 'removeChild' on 'Node'".)
 */
export const LoadingSignal = ({ onChange }) => {
    useEffect(() => {
        onChange(true);
        return () => onChange(false);
    }, [onChange]);

    return null;
};

/** Plain DOM overlay; place it next to the <Canvas> inside a positioned container. */
const CanvasLoader = () => {
    const { progress } = useProgress();

    return (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
            <p style={{ fontSize: 14, color: '#F1F1F1', fontWeight: 800, marginTop: 40 }}>
                {progress !== 0 ? `${progress.toFixed(2)}%` : 'Loading...'}
            </p>
        </div>
    );
};

export default CanvasLoader;
