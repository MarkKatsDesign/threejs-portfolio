import { OrbitControls } from "@react-three/drei";
import { Suspense, useState } from "react";
import CanvasLoader, { LoadingSignal } from "../components/CanvasLoader.jsx";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { calculateSizes } from "../constants/index.js";
import Button from "../components/Button.jsx";
import LorenzAttractor from "../components/LorenzAttractor.jsx";

const Hero = () => {
    const isSmall = useMediaQuery({ maxWidth: 440 });
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
    const [isLoading, setIsLoading] = useState(false);

    const sizes = calculateSizes(isSmall, isMobile, isTablet);

    return (
        <section className="min-h-screen w-full flex flex-col relative">
            <div className="hero-overlay" />
            <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3 relative z-10 pointer-events-none">
                <p className="sm:text-3xl text-2xl font-medium text-white text-center font-generalsans">
                    Hi, I&#39;m Mark <span className="waving-hand">👋</span>
                </p>
                <h1 className="hero_tag text-gray_gradient">Helping engineers ship faster with AI</h1>
                <p className="text-center text-white-600 sm:text-lg text-base max-w-3xl mx-auto text-balance">
                    Software Solution Engineer at Microsoft · GitHub Copilot, code security &amp; agentic AI
                </p>
            </div>

            {/* Full viewport width (not just the 1280px content column) so the
                attractor isn't cut off at the column edge on wide screens. */}
            <div className="h-full absolute inset-y-0 left-1/2 w-screen -translate-x-1/2">
                {isLoading && <CanvasLoader />}
                <Canvas
                    className="w-full h-full"
                    style={{
                        // position: 'fixed',
                        pointerEvents: isMobile ? 'none' : 'auto'
                    }}
                    camera={{
                        position: [0, 0, 35],
                        fov: 70,
                        near: 0.1,
                        far: 1000
                    }}
                >
                    <Suspense fallback={<LoadingSignal onChange={setIsLoading} />}>
                        <LorenzAttractor
                            position={sizes.lorenzPosition}
                            scale={sizes.lorenzScale}
                            pointSize={sizes.pointSize}
                        />

                        <OrbitControls
                            enableZoom={false}
                            enablePan={false}
                            autoRotate
                            autoRotateSpeed={isMobile ? 0.5 : 0.3}
                            minPolarAngle={Math.PI / 3}
                            maxPolarAngle={Math.PI / 2.2}
                            minAzimuthAngle={-Math.PI / 4}
                            maxAzimuthAngle={Math.PI / 4}
                            rotateSpeed={isMobile ? 0.8 : 1.0}
                            // Target the attractor’s focal point (near z = 24)
                            target={[0, 0, 24]}
                        />

                        <ambientLight intensity={0.8} />
                        <directionalLight position={[10, 10, 10]} intensity={0.5} />
                    </Suspense>
                </Canvas>
            </div>

            <div className="absolute bottom-7 left-0 right-0 w-full z-10 c-space">
                <a href="#about" className="w-fit">
                    <Button name="Explore my work" containerClass="sm:w-fit w-full sm:min-w-96" />
                </a>
            </div>
        </section>
    );
};

export default Hero;
