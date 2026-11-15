import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Lightformer, OrbitControls, Sparkles } from '@react-three/drei';
import CanvasLoader, { LoadingSignal } from '../components/CanvasLoader.jsx';
import AwardMedal from '../components/AwardMedal.jsx';
import { recognition } from '../constants/index.js';

const Recognition = () => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <section className="c-space my-20">
            <h3 className="head-text">Recognition</h3>

            <div className="grid lg:grid-cols-5 grid-cols-1 gap-5 mt-12">
                <div
                    className="lg:col-span-2 relative h-[380px] sm:h-[440px] rounded-lg bg-black-200 border border-black-300 overflow-hidden"
                    role="img"
                    aria-label="3D model of the Microsoft Hackathon 2026 1st Place Challenge Winner medal"
                >
                    {isLoading && <CanvasLoader />}
                    <Canvas camera={{ position: [0, 0, 6], fov: 40 }} dpr={[1, 2]}>
                        <ambientLight intensity={0.6} />
                        <directionalLight position={[3, 4, 5]} intensity={2} />
                        <directionalLight position={[-4, -2, -5]} intensity={1} />
                        <Suspense fallback={<LoadingSignal onChange={setIsLoading} />}>
                            <AwardMedal />
                            <Sparkles count={45} scale={[6, 5, 3]} size={2.5} speed={0.35} color="#f5c56b" />
                            {/* Studio-style reflections for the metal, built locally (no HDR download). */}
                            <Environment resolution={256}>
                                <Lightformer form="rect" intensity={3} position={[0, 4, 3]} scale={[8, 2, 1]} />
                                <Lightformer form="rect" intensity={2} color="#ffe2a8" position={[-5, 0, 2]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} />
                                <Lightformer form="rect" intensity={2} position={[5, -1, 2]} rotation-y={-Math.PI / 2} scale={[6, 3, 1]} />
                                <Lightformer form="circle" intensity={1.5} color="#7aa7ff" position={[0, -4, -3]} scale={4} />
                            </Environment>
                        </Suspense>
                        <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 3} maxPolarAngle={(2 * Math.PI) / 3} />
                    </Canvas>
                    <p className="absolute bottom-3 left-0 right-0 text-center text-xs text-white-500 pointer-events-none">
                        Drag to rotate
                    </p>
                </div>

                <div className="lg:col-span-3 grid-container justify-center">
                    <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-[#e0b052] font-medium">{recognition.featured.event}</p>
                        <p className="text-white text-2xl sm:text-3xl font-semibold mt-2">{recognition.featured.title}</p>
                        <p className="grid-subtext mt-4">{recognition.featured.description}</p>
                    </div>

                    <div className="border-t border-black-300 pt-5 mt-2">
                        <p className="text-white-600 text-sm uppercase tracking-[0.2em] mb-4">Also</p>
                        <ul className="flex flex-col gap-4">
                            {recognition.more.map(({ id, title, detail }) => (
                                <li key={id} className="flex gap-3">
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e0b052]" />
                                    <div>
                                        <p className="text-white font-medium">{title}</p>
                                        <p className="grid-subtext text-sm">{detail}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Recognition;
