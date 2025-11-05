import React from "react";
import Container from "../Shared/Container"
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-white py-4 border-b">
            <Container>
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="text-xl font-bold text-blue-600 cursor-pointer">
                        Khan'sClinic
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#home" className="text-gray-700 hover:text-blue-600 transition">
                            Home
                        </a>
                        <a href="#about" className="text-gray-700 hover:text-blue-600 transition">
                            About
                        </a>
                        <a href="#services" className="text-gray-700 hover:text-blue-600 transition">
                            Services
                        </a>
                        <a href="#contact" className="text-gray-700 hover:text-blue-600 transition">
                            Contact
                        </a>
                    </div>

                    {/* CTA Button */}
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition">
                        Book Appointment
                    </button>
                </div>
            </Container>
        </nav>
    );
};

export default Navbar