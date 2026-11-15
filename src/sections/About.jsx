import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import Button from "../components/Button.jsx";

// react-globe.gl pulls in three.js's WebGPU/TSL builds (~1 MB), so load it on
// demand instead of blocking the first paint of the page.
const Globe = lazy(() => import('react-globe.gl'));

const EMAIL = 'mark.kats.career@gmail.com';

const FOCUS_AREAS = [
    'AI-assisted development with GitHub Copilot',
    'Code security: CodeQL, secret scanning, Dependabot',
    'DevSecOps on GitHub Enterprise & Azure DevOps',
    'Agentic AI & MCP',
    'Azure architecture',
];

const HANDS_ON = ['TypeScript', 'React', 'Node.js', 'Python', 'Three.js / WebGL', 'Azure', 'AWS', 'Docker', 'Terraform'];
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
                            src="/assets/portrait.webp"
                            alt="Mark Kats"
                            width={900}
                            height={1200}
                            className="w-full sm:h-[276px] h-80 object-cover object-[50%_35%] rounded-lg"
                        />
                        <div>
                            <p className="grid-headtext">Hi, I&#39;m Mark</p>
                            <p className="grid-subtext">
                                Software Solution Engineer at Microsoft. I help engineering teams ship faster and more
                                securely with AI, and I build the AI tools I talk about.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section 2: Tech Stack */}
                <div className="col-span-1 xl:row-span-3">
                    <div className="grid-container">
                        <div className="w-full h-full p-0">
                            <img
                                src="/assets/grid2.jpg"
                                alt=""
                                className="w-full sm:h-[200px] h-fit object-cover mx-auto rounded-lg"
                            />
                        </div>
                        <div>
                            <p className="grid-headtext">What I focus on</p>
                            <ul className="grid-subtext space-y-1.5">
                                {FOCUS_AREAS.map((area) => (
                                    <li key={area} className="flex gap-2">
                                        <span className="text-[#e0b052]">▹</span>
                                        {area}
                                    </li>
                                ))}
                            </ul>
                            <p className="grid-subtext text-sm mt-4">
                                <span className="text-white-700">Hands-on with:</span> {HANDS_ON.join(" · ")}
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
                            <p className="grid-headtext">Based in Melbourne</p>
                            <p className="grid-subtext">
                                Working with enterprise engineering teams across Australia. My path has run through Europe
                                and Asia, and I speak English, Spanish, Russian and Chinese.
                            </p>
                            <Button name="Get in touch" containerClass="w-full mt-10" onClick={scrollToContact}/>
                        </div>
                    </div>
                </div>

                {/* Section 4: Driven by Innovation and Design */}
                <div className="xl:col-span-2 xl:row-span-3">
                    <div className="grid-container">
                        <img
                            src="/assets/grid3.jpg"
                            alt=""
                            className="w-full sm:h-[266px] h-full object-cover"
                        />
                        <div>
                            <p className="grid-headtext">From 3D to developer tools</p>
                            <p className="grid-subtext">
                                I came to software from 3D. I spent 3+ years in architectural visualisation and on a large-scale
                                metaverse build, alongside creatives whose credits include DNEG, Nike and Zaha Hadid Architects,
                                then completed a Master of IT with Distinction at RMIT.
                            </p>
                            <p className="grid-subtext mt-3">
                                That mix of design and engineering is why I care about how developers actually experience
                                their tools, not just what the tools can do.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section 5: Email Card with Enhanced Feedback */}
                <div className="xl:col-span-1 xl:row-span-2">
                    <div className="grid-container">
                        <img
                            src="/assets/grid4.jpg"
                            alt=""
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
