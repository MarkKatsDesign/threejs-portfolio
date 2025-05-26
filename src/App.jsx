import Hero from './sections/Hero.jsx';
import Navbar from './sections/Navbar.jsx';
import About from './sections/About.jsx';
import Contact from './sections/Contact.jsx';
import Projects from './sections/Projects.jsx';
import Footer from "./sections/Footer.jsx";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import Referees from "./sections/Referees.jsx";
import CareerEvolution from "./sections/CareerEvolution.jsx";

const App = () => {
    // console.log("App component rendered");
    return (
        <main className="max-w-7xl mx-auto relative w-full overflow-x-hidden">
            <Navbar />
            <div id="home">
                <Hero />
            </div>
            <div id="about">
                <About />
            </div>
            <div id="projects">
                <Projects />
                <Referees />
            </div>
            <div id="career-evolution">
                <CareerEvolution />
            </div>
            <div id="contact">
                <Contact />
            </div>
            <Footer />
            <Analytics />
            <SpeedInsights />
        </main>
    );
};

export default App;
