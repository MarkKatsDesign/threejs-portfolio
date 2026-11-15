import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import BlackHole from "../components/BlackHole.jsx";

const Hero = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const prefersReducedMotion = useMediaQuery({ query: "(prefers-reduced-motion: reduce)" });
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(true);

    // Stop rendering the (GPU-heavy) background once it scrolls out of view.
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting));
        observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const animate = isVisible && !prefersReducedMotion;

    return (
        <section ref={sectionRef} className="min-h-screen w-full flex flex-col relative">
            {/* Purely decorative: full viewport width, and it never captures
                clicks, drags or touches, so the page scrolls normally. */}
            <div className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 pointer-events-none" aria-hidden="true">
                <Canvas
                    // The ray tracer runs per pixel; a reduced internal resolution
                    // keeps it smooth, and the soft image hides the upscaling.
                    dpr={isMobile ? 0.6 : 0.75}
                    frameloop={animate ? "always" : "demand"}
                    gl={{ antialias: false, powerPreference: "high-performance" }}
                >
                    <BlackHole animate={animate} />
                </Canvas>
            </div>

            <div className="w-full mx-auto flex flex-col sm:mt-36 mt-24 c-space gap-3 relative z-10 pointer-events-none">
                <p className="sm:text-3xl text-2xl font-medium text-white text-center font-generalsans">
                    Hi, I&#39;m Mark <span className="waving-hand">👋</span>
                </p>
                <h1 className="hero_tag text-gray_gradient">Helping engineers ship faster with AI</h1>
                <p className="text-center text-white-600 sm:text-lg text-base max-w-3xl mx-auto text-balance">
                    Software Solution Engineer at Microsoft · GitHub Copilot, code security &amp; agentic AI
                </p>
            </div>

            <div className="absolute bottom-7 left-0 right-0 w-full z-10 c-space">
                <a href="#about" className="btn sm:w-fit w-full sm:min-w-96 bg-black-300/80 backdrop-blur-sm border border-white/10 hover:border-white/25">
                    Explore my work
                </a>
            </div>
        </section>
    );
};

export default Hero;
