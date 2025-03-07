// import React from 'react';
//
// const App = () => {
//     return (
//         <main className="max-w-7xl mx-auto p-4">
//             <h1 className="text-2xl text-white underline">Hello, Three.js!</h1>
//         </main>
//     );
// };
//
// export default App;

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
            <Hero />
            {<About />}
            {<Projects />}
            {<Clients />}
            {<WorkExperience />}
            {<Contact />}
            {<Footer />}
        </main>
    );
};

export default App;
