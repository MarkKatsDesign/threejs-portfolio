import Hero from './sections/Hero.jsx';
import Navbar from './sections/Navbar.jsx';
import About from './sections/About.jsx';
import Recognition from './sections/Recognition.jsx';
import Contact from './sections/Contact.jsx';
import Projects from './sections/Projects.jsx';
import Footer from "./sections/Footer.jsx";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import Referees from "./sections/Referees.jsx";
import CareerEvolution from "./sections/CareerEvolution.jsx";

// Vercel serves its analytics scripts from /_vercel/*, which only exists on
// Vercel deployments; elsewhere (dev, `vite preview`) they would just 404.
const isVercelDeployment = import.meta.env.VITE_VERCEL === '1';

const App = () => {
    return (
        <main className="max-w-7xl mx-auto relative w-full">
            <Navbar />
            <div id="home">
                <Hero />
            </div>
            <div id="about">
                <About />
                <Recognition />
            </div>
            <div id="experience">
                <CareerEvolution />
            </div>
            <div id="projects">
                <Projects />
                <Referees />
            </div>
            <div id="contact">
                <Contact />
            </div>
            <Footer />
            {isVercelDeployment && (
                <>
                    <Analytics />
                    <SpeedInsights />
                </>
            )}
        </main>
    );
};

export default App;
