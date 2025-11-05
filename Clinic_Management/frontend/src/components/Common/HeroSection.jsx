import React from 'react'
import Container from '../Shared/Container';
import image1 from "../../assets/heroImg1.jpg"

const Hero = () => {
    return (
        <section className="relative h-[90vh] flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200 py-16 overflow-hidden">
            <Container>
                <div className="grid md:grid-cols-2 gap-8 items-center justify-center relative z-10">
                    {/* Left Content */}
                    <div className="space-y-5">
                        {/* Top Badge */}
                        <div className="inline-flex items-center space-x-2 text-blue-600 text-sm">
                            <span>👨‍⚕️</span>
                            <span>Top-Notch Dental Class, Just for You</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                            Your <span className="text-blue-600">Best Dental</span><br />
                            <span className="text-blue-600">Experience</span> Awaits
                        </h1>

                        {/* Description */}
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Using state-of-the-art, painless technology and<br />
                            trust, we make dental treatment as relaxed as possible
                        </p>

                        {/* Action Buttons */}
                        <div className="flex gap-4 items-center">
                            <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-blue-700 transition">
                                Explore Our Service
                            </button>
                            <button className="text-gray-700 font-medium text-sm hover:text-blue-600 transition flex items-center gap-2">
                                <span>▶</span>
                                <span>Watch Video</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Content - Doctor Image */}
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
