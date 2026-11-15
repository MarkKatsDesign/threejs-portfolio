import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import Button from "../components/Button.jsx";

// react-globe.gl pulls in three.js's WebGPU/TSL builds (~1 MB), so load it on
// demand instead of blocking the first paint of the page.
const Globe = lazy(() => import('react-globe.gl'));

const EMAIL = 'mark.kats.career@gmail.com';
const GLOBE_SIZE = 326;

// Locations shown on the globe
const LOCATIONS = [
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

// Arcs connecting the cities
const ARCS_DATA = [
    // Moscow to Malaga
    {
        startLat: 55.7558,
        startLng: 37.6173,
        endLat: 36.7213,
        endLng: -4.4217,
        color: '#FF69B4' // Hot pink
    },
    // Malaga to Suzhou
    {
        startLat: 36.7213,
        startLng: -4.4217,
        endLat: 31.2998,
        endLng: 120.5853,
        color: '#FFA500' // Orange
    },
    // Suzhou to Warsaw
    {
        startLat: 31.2998,
        startLng: 120.5853,
        endLat: 52.2297,
        endLng: 21.0122,
        color: '#32CD32' // Lime green
    },
    // Warsaw to Melbourne
    {
        startLat: 52.2297,
        startLng: 21.0122,
        endLat: -37.8136,
        endLng: 144.9631,
        color: '#00BFFF' // Deep sky blue
    },
    // Melbourne to Jakarta
    {
        startLat: -37.8136,
        startLng: 144.9631,
        endLat: -6.2088,
        endLng: 106.8456,
        color: '#9370DB' // Medium purple
    }
];

const About = () => {
    const [hasCopied, setHasCopied] = useState(false);
    const globeRef = useRef(null); // Ref to access Globe instance
    const copyTimeoutRef = useRef(null);

    useEffect(() => () => clearTimeout(copyTimeoutRef.current), []);

    const handleCopy = () => {
        navigator.clipboard
            .writeText(EMAIL)
            .then(() => {
                setHasCopied(true);
                clearTimeout(copyTimeoutRef.current);
                copyTimeoutRef.current = setTimeout(() => setHasCopied(false), 2000);
            })
            .catch((error) => console.error('Could not copy email address:', error));
    };

    const handleCopyKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCopy();
        }
    };

    // Runs once the (lazily loaded) globe has initialised.
    const handleGlobeReady = () => {
        const globe = globeRef.current;
        if (!globe) return;

        // Set initial position focused on Melbourne
        globe.pointOfView({ lat: -37.8136, lng: 144.9631, altitude: 2.5 }, 1000);

        // Auto-rotation
        const controls = globe.controls();
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;
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
                            <p className="grid-headtext">Hi, I&#39;m Mark</p>
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
                            <Suspense fallback={<div style={{ width: GLOBE_SIZE, height: GLOBE_SIZE }} />}>
                                <Globe
                                    ref={globeRef}
                                    onGlobeReady={handleGlobeReady}
                                    height={GLOBE_SIZE}
                                    width={GLOBE_SIZE}
                                    backgroundColor="rgba(0,0,0,0)"
                                    backgroundImageOpacity={0.5}
                                    showAtmosphere
                                    showGraticules
                                    globeImageUrl="https://cdn.jsdelivr.net/npm/three-globe@2.32.0/example/img/earth-day.jpg"
                                    bumpImageUrl="https://cdn.jsdelivr.net/npm/three-globe@2.32.0/example/img/earth-topology.png"
                                    labelsData={LOCATIONS}
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

                                    // Arc configuration
                                    arcsData={ARCS_DATA}
                                    arcColor={(d) => d.color || 'rgba(255, 255, 255, 0.4)'}
                                    arcStroke={0.5}
                                    arcDashLength={0.01}
                                    arcDashGap={0.01}
                                    arcDashAnimateTime={1000}
                                    arcAltitude={0.35}
                                    arcCircularResolution={64}
                                />
                            </Suspense>
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
                                onKeyDown={handleCopyKeyDown}
                                role="button"
                                tabIndex={0}
                                aria-label="Copy email address"
                            >
                                <img
                                    src={hasCopied ? '/assets/tick.svg' : '/assets/copy.svg'}
                                    alt={hasCopied ? 'Copied' : 'Copy'}
                                    className="w-5 h-5 transition-transform hover:scale-110"
                                />
                                <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient break-all">
                                    {EMAIL}
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
