import React, { useState, useRef } from 'react';
import Globe from 'react-globe.gl';
import Button from "../components/Button.jsx";
import * as THREE from "three";

const About = () => {
    const [hasCopied, setHasCopied] = useState(false);
    const globeRef = useRef(); // Ref to access Globe instance

    const handleCopy = () => {
        navigator.clipboard.writeText('mark.kats.career@gmail.com');
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), 2000);
    };

    // Enhanced locations data with multiple cities
    const locations = [
        {
            lat: -37.8136,
            lng: 144.9631,
            text: "Melbourne",
            color: '#00FF00',
            size: 2,
            altitude: 0.1
        },
        {
            lat: 52.2297,
            lng: 21.0122,
            text: "Warsaw",
            color: '#FF0000',
            size: 2,
            altitude: 0.08
        },
        {
            lat: 36.7213,
            lng: -4.4217,
            text: "Malaga",
            color: '#FFFF00',
            size: 2,
            altitude: 0.08
        },
        {
            lat: 31.2998,
            lng: 120.5853,
            text: "Suzhou",
            color: '#0000FF',
            size: 2,
            altitude: 0.08
        },
        {
            lat: 55.7558,
            lng: 37.6173,
            text: "Moscow",
            color: '#FF00FF',
            size: 2,
            altitude: 0.08
        },
        {
            lat: -6.2088,
            lng: 106.8456,
            text: "Jakarta",
            color: '#00FFFF',
            size: 2,
            altitude: 0.08
        }
    ];

    // Updated customThreeObjectUpdate to use ref
    const handleCustomObjectUpdate = (obj, d) => {
        if (globeRef.current) {
            const coords = globeRef.current.getCoords(d.lat, d.lng, 0);
            Object.assign(obj.position, coords);
        }
    };

    const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="c-space my-20" id="about">
            <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">

                {/* Section 1: Introduction */}
                <div className="xl:col-span-1 xl:row-span-3">
                    <div className="grid-container">
                        <img
                            src="/assets/grid1.jpg"
                            alt="grid-1"
                            className="w-full sm:h-[276px] h-fit object-cover"
                        />
                        <div>
                            <p className="grid-headtext">Hi, I'm Mark</p>
                            <p className="grid-subtext">Versatile Full Stack Developer & Digital Designer.</p>
                        </div>
                    </div>
                </div>

                {/* Section 2: Tech Stack */}
                <div className="col-span-1 xl:row-span-3">
                    <div className="grid-container">
                        <div className="w-full h-full p-0">
                            <img
                                src="/assets/grid2.jpg"
                                alt="grid-2"
                                className="w-full h-full object-cover mx-auto"
                            />
                        </div>
                        <div>
                            <p className="grid-headtext">Tech Stack</p>
                            <p className="grid-subtext">
                                Crafting innovative solutions with modern frameworks and 3D technologies. Specialised in full-stack development, from responsive frontends to scalable backend systems. Turning complex problems into elegant digital experiences.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section 3: Globe with Location & Contact Button */}
                <div className="col-span-1 xl:row-span-4">
                    <div className="grid-container">
                        <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
                            <Globe
                                ref={globeRef}
                                height={326}
                                width={326}
                                backgroundColor="rgba(0,0,0,0)"
                                backgroundImageOpacity={0.5}
                                showAtmosphere
                                showGraticules
                                globeImageUrl="https://cdn.jsdelivr.net/npm/three-globe@2.32.0/example/img/earth-day.jpg" // Updated to use local asset
                                bumpImageUrl="https://cdn.jsdelivr.net/npm/three-globe@2.32.0/example/img/earth-topology.png"  // Updated to use local asset
                                labelsData={locations}
                                labelLat="lat"
                                labelLng="lng"
                                labelText="text"
                                labelSize="size"
                                labelColor="color"
                                labelAltitude="altitude"
                                labelResolution={2}
                                labelIncludeDot={true}
                                labelDotRadius={0.4}
                                labelLabel={(d) => `${d.text}`}
                                onLabelClick={(label) => console.log(`Clicked on ${label.text}`)}
                                ringsData={[locations[0]]}
                                ringColor={() => 'rgba(0, 255, 0, 0.5)'}
                                ringMaxRadius={5}
                                customLayerData={[locations[0]]}
                                customThreeObject={() => {
                                    const line = new THREE.Line(
                                        new THREE.BufferGeometry().setFromPoints([
                                            new THREE.Vector3(0, 0, 0),
                                            new THREE.Vector3(0, 1.5, 0)
                                        ]),
                                        new THREE.LineBasicMaterial({ color: 0x00ff00, linewidth: 3 })
                                    );
                                    return line;
                                }}
                                customThreeObjectUpdate={handleCustomObjectUpdate}
                            />
                        </div>
                        <div>
                            <p className="grid-headtext">Location</p>
                            <p className="grid-subtext">
                                Based in Melbourne, Australia, I am actively seeking opportunities across Australia and New Zealand.
                            </p>
                            <Button name="Available for opportunities" isBeam containerClass="w-full mt-10" onClick={scrollToContact}/>
                        </div>
                    </div>
                </div>

                {/* Section 4: Driven by Innovation and Design */}
                <div className="xl:col-span-2 xl:row-span-3">
                    <div className="grid-container">
                        <img
                            src="/assets/grid3.jpg"
                            alt="grid-3"
                            className="w-full sm:h-[266px] h-full object-cover"
                        />
                        <div>
                            <p className="grid-headtext">Driven by Innovation and Design</p>
                            <p className="grid-subtext">
                                With a unique blend of technical expertise and creative vision, I thrive at the intersection of technology and design.
                                From crafting immersive digital experiences to building scalable solutions, I am passionate about pushing boundaries
                                and creating meaningful impact through my work.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section 5: Email Card with Enhanced Feedback */}
                <div className="xl:col-span-1 xl:row-span-2">
                    <div className="grid-container">
                        <img
                            src="/assets/grid4.jpg"
                            alt="grid-4"
                            className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top"
                        />
                        <div className="space-y-2">
                            <p className="grid-subtext text-center">Contact me</p>
                            <div
                                className="copy-container flex items-center justify-center gap-3 cursor-pointer hover:bg-dark-600 px-4 py-3 rounded-lg transition-colors"
                                onClick={handleCopy}
                                role="button"
                                aria-label="Copy email address"
                            >
                                <img
                                    src={hasCopied ? '/assets/tick.svg' : '/assets/copy.svg'}
                                    alt={hasCopied ? 'Copied' : 'Copy'}
                                    className="w-5 h-5 transition-transform hover:scale-110"
                                />
                                <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient break-all">
                                    mark.kats.career@gmail.com
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default About;



