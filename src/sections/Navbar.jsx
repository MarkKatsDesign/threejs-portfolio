import { useState } from 'react';
import { navLinks } from "../constants/index.js";

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

    const NavItems = () => {
        return (
            <ul className="nav-ul">
                {navLinks.map(({ id, href, name }) => (
                    <li key={id} className="nav-li">
                        <a
                            href={href}
                            className={`nav-li_a ${activeNav === id ? 'text-white' : 'text-neutral-400'}`}
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick(id);
                            }}
                        >
                            {name}
                        </a>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm">
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
                        className="text-neutral-400 hover:text-white focus:outline-none sm:hidden flex"
                        aria-label="Toggle menu"
                    >
                        <img src={isMenuOpen ? "/assets/close.svg" : "/assets/menu.svg"} alt="toggle" className="w-6 h-6"/>
                    </button>
                    <nav className="sm:flex hidden">
                        <NavItems />
                    </nav>
                </div>
            </div>
            <div className={`nav-sidebar ${isMenuOpen ? 'max-h-screen' : 'max-h-0'} transition-all duration-300 ease-in-out overflow-hidden`}>
                <nav className="p-5">
                    <NavItems />
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
