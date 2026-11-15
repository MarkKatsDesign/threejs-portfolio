import {myProjects} from "../constants/index.js";
import {Suspense, useState} from "react";
import {Canvas} from "@react-three/fiber";
import {Center, OrbitControls} from "@react-three/drei";
import CanvasLoader, {LoadingSignal} from "../components/CanvasLoader.jsx";
import Laptop from "../components/Laptop.jsx"

const projectCount = myProjects.length;

const Chevron = ({ direction }) => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={direction === 'left' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} />
    </svg>
);

const ExternalIcon = () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M7 17L17 7M9 7h8v8" />
    </svg>
);

const Projects = () => {
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const currentProject = myProjects[selectedProjectIndex];

    const handleNavigation = (direction) => {
        setSelectedProjectIndex((prevIndex) => {
            if(direction === 'previous') {
                return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
            } else {
                return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
            }
        });
    };


    return (
        <section className="c-space my-20">
            <h3 className="head-text">Projects</h3>

            <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
                <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200">
                    <div className="absolute top-0 right-0">
                        <img src={currentProject.spotlight} alt="" className="w-full h-96 object-cover rounded-xl" />
                    </div>
                    <div className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg" style={currentProject.logoStyle}>
                        <img src={currentProject.logo} alt="" className="logo-box" />
                    </div>
                    <div className="flex flex-col gap-5 text-white-600 my-5">
                        <p className="text-white text-2xl font-semibold">{currentProject.title}</p>
                        <p className="animatedText">{currentProject.desc}</p>
                        <ul className="list-disc pl-5">
                            {currentProject.subdesc.split('\n').map((line) => (
                                <li key={line} className="animatedText">{line}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex items-center justify-between flex-wrap gap-5">
                        <div className="flex items-center gap-3">
                            {currentProject.tags.map((tag) => (
                                <div key={tag.id} className="tech-logo">
                                    <img src={tag.path} alt={tag.name} />
                                </div>
                            ))}
                        </div>

                        <a className="flex items-center gap-2 text-white-600 hover:text-white transition-colors" href={currentProject.href} target="_blank" rel="noreferrer">
                            <span>View project</span>
                            <ExternalIcon />
                        </a>
                        {currentProject.qrHref && (
                            <a
                                className="flex items-center gap-2 cursor-pointer text-white-600 mt-2"
                                href={currentProject.qrHref}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <p>Scan QR for Expo App</p>
                                <img src="/assets/filmdexqr.png" className="w-4 h-4" alt="qr" />
                            </a>
                        )}
                    </div>
                    <div className="flex justify-between items-center mt-7">
                        <button className="project-nav-btn" onClick={() => handleNavigation('previous')} aria-label="Previous project">
                            <Chevron direction="left" />
                        </button>
                        <div className="flex items-center gap-2">
                            {myProjects.map((project, index) => (
                                <button
                                    key={project.title}
                                    onClick={() => setSelectedProjectIndex(index)}
                                    aria-label={`Show project ${index + 1}: ${project.title}`}
                                    aria-current={index === selectedProjectIndex}
                                    className={`h-1.5 rounded-full transition-all ${index === selectedProjectIndex ? 'w-6 bg-white' : 'w-1.5 bg-white-500 hover:bg-white-600'}`}
                                />
                            ))}
                        </div>
                        <button className="project-nav-btn" onClick={() => handleNavigation('next')} aria-label="Next project">
                            <Chevron direction="right" />
                        </button>
                    </div>
                </div>
                <div className="relative border border-black-300 bg-black-200 rounded-lg h-96 sm:h-[480px] lg:h-[560px] lg:sticky lg:top-24 lg:self-start">
                    {isLoading && <CanvasLoader />}
                    <Canvas camera={{ position: [0, 5, 44], fov: 40 }}>
                        <ambientLight intensity={Math.PI} />
                        <directionalLight position={[10, 10, 5]} />
                        <Center>
                            <Suspense fallback={<LoadingSignal onChange={setIsLoading} />}>
                                <group scale={1.5} position={[0, -15, -35]} rotation={[0, 0, 0]}>
                                    {<Laptop texture={currentProject.texture}/>}
                                </group>
                            </Suspense>
                        </Center>
                        <OrbitControls maxPolarAngle={Math.PI/2} enableZoom={false}/>
                    </Canvas>

                </div>
            </div>
        </section>
    );
};

export default Projects;
