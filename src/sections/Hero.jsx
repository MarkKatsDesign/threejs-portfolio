import { OrbitControls } from "@react-three/drei";
import { Suspense, useState } from "react";
import CanvasLoader from "../components/CanvasLoader.jsx";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { calculateSizes } from "../constants/index.js";
import Button from "../components/Button.jsx";
import LorenzAttractor from "../components/LorenzAttractor.jsx";
// import { DebugInfo } from "../components/LorenzAttractor";

const Hero = () => {
    const isSmall = useMediaQuery({ maxWidth: 440 });
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
    // const [debugInfo, setDebugInfo] = useState({});

    const sizes = calculateSizes(isSmall, isMobile, isTablet);

    return (
        <section className="min-h-screen w-full flex flex-col relative">
            <div className="hero-overlay" />
            <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
                <p className="sm:text-3xl text-2xl font-medium text-white text-center font-generalsans">
                    Hi, I am Mark <span className="waving-hand">👋</span>
                </p>
                <p className="hero_tag text-gray_gradient">Creating Seamless Digital Experiences</p>
            </div>

            <div className="w-full h-full absolute inset-0">
                <Canvas
                    className="w-full h-full"
                    camera={{
                        position: [0, 0, 35],
                        fov: 70,
                        near: 0.1,
                        far: 1000
                    }}
                >
                    <Suspense fallback={<CanvasLoader />}>
                        <LorenzAttractor
                            // onDebugUpdate={setDebugInfo}
                            position={sizes.lorenzPosition}
                            scale={sizes.lorenzScale}
                            color="#3282F6"
                            pointSize={sizes.pointSize}
                        />

                        <OrbitControls
                            enableZoom={false}
                            enablePan={true}
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
                    <Button name="Let's work together" isBeam containerClass="sm:w-fit w-full sm:min-w-96" />
                </a>
            </div>
            {/*<DebugInfo debugInfo={debugInfo} />*/}
        </section>
    );
};

export default Hero;
