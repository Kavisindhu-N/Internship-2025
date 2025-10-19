import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const navLinks = [
        { label: "Home", href: "#home" },
        { label: "About", href: "#about" },
        { label: "Tech Stack", href: "#techstack" },
        { label: "Projects", href: "#project" },
        { label: "Contact", href: "#home" }
    ];

    return (
        <nav className="w-full sticky top-0 z-15  bg-opacity-70 backdrop-blur-md overflow-x-hidden">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center h-15 px-6 md:px-12">
                <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text">
                    Kavisindhu
                </h1>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-8 text-sm text-gray-300">
                    {navLinks.map((link, index) => (
                        <li key={index}>
                            <a
                                href={link.href}
                                className="transition duration-500 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#6366f1] hover:to-[#a855f7]"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Icon */}
                <button
                    className="md:hidden text-gray-300 text-3xl focus:outline-none"
                    onClick={toggleMenu}
                    aria-label="Toggle Menu"
                >
                    {menuOpen ? <HiX /> : <HiMenu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <ul className="md:hidden flex flex-col items-center gap-6 py-4 bg-black bg-opacity-90 text-gray-300 text-sm w-full">
                    {navLinks.map((link, index) => (
                        <li key={index} className="w-full text-center">
                            <a
                                href={link.href}
                                className="block transition duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#6366f1] hover:to-[#a855f7]"
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
