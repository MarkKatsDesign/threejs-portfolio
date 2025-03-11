import Hero from './sections/Hero.jsx';
import Navbar from './sections/Navbar.jsx';
import About from './sections/About.jsx';
import Contact from './sections/Contact.jsx';
import Clients from './sections/Clients.jsx';
import Projects from './sections/Projects.jsx';
import Footer from "./sections/Footer.jsx";
import WorkExperience from './sections/Experience.jsx';

const App = () => {
    console.log("App component rendered");
    return (
        <main className="max-w-7xl mx-auto relative">
            <Navbar />
            <div id="home">
                <Hero />
            </div>
            <div id="about">
                <About />
            </div>
            <div id="work">
                <Projects />
                <Clients />
                <WorkExperience />
            </div>
            <div id="contact">
                <Contact />
            </div>
            <Footer />
        </main>
    );
};

export default App;
