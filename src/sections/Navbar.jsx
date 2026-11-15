import { useState } from 'react';
import { navLinks } from "../constants/index.js";

const NavItems = ({ activeNav, onNavClick }) => (
    <ul className="nav-ul">
        {navLinks.map(({ id, href, name }) => (
            <li key={id} className="nav-li">
                <a
                    href={href}
                    className={`nav-li_a ${activeNav === id ? 'text-white' : 'text-neutral-400'}`}
                    onClick={(e) => {
                        e.preventDefault();
                        onNavClick(id);
                    }}
                >
                    {name}
                </a>
            </li>
        ))}
    </ul>
);

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeNav, setActiveNav] = useState('home');

    const toggleMenu = () => setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);

    const handleNavClick = (id) => {
        setActiveNav(id);
        setIsMenuOpen(false);

        // Smooth scroll to the section
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xs">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center p-5 mx-auto c-space">
                    <a
                        href="/"
                        className="text-neutral-400 font-bold text-xl hover:text-white transition-colors duration-300"
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            setActiveNav('home');
                        }}
                    >
                        Mark Kats
                    </a>
                    <button
                        onClick={toggleMenu}
                        className="text-neutral-400 hover:text-white focus:outline-hidden sm:hidden flex"
                        aria-label="Toggle menu"
                    >
                        <img src={isMenuOpen ? "/assets/close.svg" : "/assets/menu.svg"} alt="toggle" className="w-6 h-6"/>
                    </button>
                    <nav className="sm:flex hidden">
                        <NavItems activeNav={activeNav} onNavClick={handleNavClick} />
                    </nav>
                </div>
            </div>
            <div className={`nav-sidebar ${isMenuOpen ? 'max-h-screen' : 'max-h-0'} transition-all duration-300 ease-in-out overflow-hidden`}>
                <nav className="p-5">
                    <NavItems activeNav={activeNav} onNavClick={handleNavClick} />
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
