import React from 'react';
import Container from '../Shared/Container';

const AboutSection = () => {

    return (
        <section className="py-16 bg-gray-50">
            <Container>
                <div className="mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left Side - Images */}
                        <div className="relative">
                            {/* Decorative Stars */}
                            <div className="absolute -top-8 -left-8 text-blue-600">
                                <svg className="w-16 h-16" viewBox="0 0 100 100">
                                    <polygon points="50,15 61,40 88,40 67,56 73,82 50,67 27,82 33,56 12,40 39,40" fill="currentColor" />
                                </svg>
                            </div>
                            <div className="absolute -top-4 left-8 text-blue-400">
                                <svg className="w-8 h-8" viewBox="0 0 100 100">
                                    <polygon points="50,15 61,40 88,40 67,56 73,82 50,67 27,82 33,56 12,40 39,40" fill="currentColor" />
                                </svg>
                            </div>
                            <div className="absolute top-4 left-2 text-blue-300">
                                <svg className="w-6 h-6" viewBox="0 0 100 100">
                                    <polygon points="50,15 61,40 88,40 67,56 73,82 50,67 27,82 33,56 12,40 39,40" fill="currentColor" />
                                </svg>
                            </div>

                            {/* Main Image Container */}
                            <div className="relative">
                                {/* Main Tooth-Shaped Frame */}
                                <div className="w-80 h-80 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mx-auto overflow-hidden">
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-6xl">
                                        👨‍⚕️
                                    </div>
                                </div>

                                {/* Small Circular Image - Bottom Left */}
                                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                    <div className="w-full h-full flex items-center justify-center text-3xl">
                                        😊
                                    </div>
                                </div>

                                {/* Badge - Bottom Right */}
                                <div className="absolute -bottom-4 right-8 w-24 h-24 bg-blue-900 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                                    <div className="text-center text-white">
                                        <div className="text-xl font-bold">💎</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Content */}
                        <div className="space-y-6 flex flex-col items-start">
                            {/* Section Label */}
                            <div className="text-white bg-blue-600 py-1 px-5 rounded-full font-semibold text-sm uppercase tracking-wider">
                                ABOUT US
                            </div>

                            {/* Main Heading */}
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                                15 Years of Expertise<br />
                                in <span className="text-blue-600">Medical Care</span>
                            </h2>

                            {/* Description */}
                            <p className="text-gray-600 leading-relaxed">
                                Khan's Clinic has been providing exceptional healthcare services with dedication and expertise.
                                Our experienced team ensures comprehensive medical care tailored to your needs.
                            </p>

                            {/* Features List */}
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Premium Medical Services You Can Trust</h3>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Award-Winning Experts in Healthcare</h3>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Dedicated Professionals Behind Every Treatment</h3>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <div>
                                <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default AboutSection;