import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div className="space-y-4">
                        <h3 className="text-white text-2xl font-bold mb-4">Khan's Clinic</h3>
                        <p className="text-sm leading-relaxed">
                            Providing exceptional healthcare services with dedication and expertise. Your health is our priority.
                        </p>
                        <div className="flex gap-3 pt-2">
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-sm hover:text-blue-400 transition">About Us</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-blue-400 transition">Our Services</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-blue-400 transition">Doctors</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-blue-400 transition">Appointment</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-blue-400 transition">Contact Us</a>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="space-y-4">
                        <h4 className="text-white text-lg font-semibold mb-4">Our Services</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-sm hover:text-blue-400 transition">General Consultation</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-blue-400 transition">Vaccination Services</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-blue-400 transition">Cardiology Care</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-blue-400 transition">Lab & Diagnostics</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-blue-400 transition">Emergency Services</a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h4 className="text-white text-lg font-semibold mb-4">Contact Info</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="flex-shrink-0 mt-1 text-blue-400" />
                                <span className="text-sm">123 Medical Street, Karachi, Pakistan</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone size={18} className="flex-shrink-0 mt-1 text-blue-400" />
                                <span className="text-sm">+92 300 1234567</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail size={18} className="flex-shrink-0 mt-1 text-blue-400" />
                                <span className="text-sm">info@khansclinic.com</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Clock size={18} className="flex-shrink-0 mt-1 text-blue-400" />
                                <span className="text-sm">Mon - Sat: 9:00 AM - 8:00 PM</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-400">
                            © 2024 Khan's Clinic. All rights reserved.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span>Built by</span>
                            <a
                                href="https://github.com/zaidkhan-div"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 transition flex items-center gap-1 font-semibold"
                            >
                                <Github size={16} />
                                Zaid Khan
                            </a>
                        </div>
                        <div className="flex gap-6">
                            <a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition">
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;