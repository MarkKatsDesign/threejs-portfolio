import {workExperiences} from "../constants/index.js";
import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {Suspense, useState} from "react";
import CanvasLoader, {LoadingSignal} from "../components/CanvasLoader.jsx";
import Developer from "../components/Developer.jsx";

const CareerEvolution = () => {
    const [animationName, setAnimationName] = useState('idle')
    const [isLoading, setIsLoading] = useState(false)

    return (
        <section className="c-space my-20">
           <div className="w-full text-white-600">
               <h3 className='head-text'>Experience</h3>
                <div className="work-container">
                    {/* Fixed height and sticky so the avatar stays in view (and in
                        proportion) while hovering entries further down the list. */}
                    <div className="work-canvas relative h-96 lg:h-160 lg:sticky lg:top-24 lg:self-start">
                        {isLoading && <CanvasLoader />}
                        <Canvas>
                            <ambientLight intensity={2} />
                            <spotLight position={[10,10,10]} angle={0.15} penumbra={1} />
                            <directionalLight position={[10,10,10]} intensity={3} />
                            <OrbitControls enableZoom={false} maxPolarAngle={Math.PI/2}/>
                            <Suspense fallback={<LoadingSignal onChange={setIsLoading} />}>
                                <Developer position-y={-3} scale={3} animationName={animationName}/>
                            </Suspense>
                        </Canvas>
                    </div>
                    <div className="work-content">
                        <div className="sm:py-10 py-5 sm:px-5 px-2.5">
                            {workExperiences.map(({id, name, pos, icon, duration, title, highlights, animation}) => (
                                <div key={id} className="work-content_container group" onClick={() => setAnimationName(animation.toLowerCase())} onPointerOver={() => setAnimationName((animation.toLowerCase()))} onPointerOut={() => setAnimationName("idle")} >
                                    <div className="flex flex-col h-full justify-start items-center py-2">
                                        <div className="work-content_logo">
                                            <img src={icon} alt={name} className="w-full h-full"/>
                                        </div>
                                        <div className="work-content_bar" />
                                    </div>
                                    <div className="sm:p-5 px-2.5 py-5">
                                        <p className="font-bold text-white-800">{name}</p>
                                        <p className="text-sm mb-5">{pos} · {duration}</p>
                                        <p className="group-hover:text-white transition ease-in-out duration-500">{title}</p>
                                        {highlights && (
                                            <ul className="list-disc pl-5 mt-3 space-y-2 group-hover:text-white transition ease-in-out duration-500">
                                                {highlights.map((point) => (
                                                    <li key={point}>{point}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
           </div>
        </section>
    );
};

export default CareerEvolution;
