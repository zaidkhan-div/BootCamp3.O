import React from 'react'
import Container from '../Shared/Container';
import image1 from "../../assets/heroImg1.jpg"
import { Link } from "react-router-dom"

const Hero = () => {
    return (
        <section id='home' className="relative h-[90vh] flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200 py-16 overflow-hidden">
            <Container>
                <div className="grid md:grid-cols-2 gap-8 items-center justify-center relative z-10">

                    <div className="space-y-5">

                        <div className="inline-flex items-center space-x-2 text-blue-600 text-sm">
                            <span>🏥</span>
                            <span>Premium Healthcare Services, Tailored for You</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                            Welcome to <span className="text-blue-600">Khan's Clinic</span><br />
                            <span className="text-blue-600">Your Health</span> is Our Priority
                        </h1>

                        <p className="text-gray-600 text-sm leading-relaxed">
                            Providing comprehensive medical care with advanced<br />
                            technology and compassionate professionals you can trust
                        </p>

                        <div className="flex gap-4 items-center">
                            <Link to="/login" className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-blue-700 transition">
                                Book Appointment
                            </Link>
                            <button className="text-gray-700 font-medium text-sm hover:text-blue-600 transition flex items-center gap-2">
                                <span>▶</span>
                                <span>Watch Video</span>
                            </button>
                        </div>
                    </div>

                    <div
                        className="relative flex justify-end items-center h-96 bg-cover bg-center bg-no-repeat rounded-2xl"
                        style={{ backgroundImage: `url(${image1})` }} >
                    </div>
                </div>

            </Container>
        </section>
    );
}

export default Hero