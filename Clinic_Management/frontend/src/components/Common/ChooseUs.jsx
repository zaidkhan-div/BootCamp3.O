import React from 'react';
import Container from '../Shared/Container';
import Image1 from "../../assets/chooseUs1.jpg"
import { Link } from 'react-router-dom';

const ChooseUs = () => {

    return (
        <section id='choose' className="py-16 bg-white">
            <Container>
                <div className="mx-auto px-4">

                    <div className='flex flex-col justify-center items-center gap-3 mb-5'>
                        <p className='bg-blue-600 text-white text-sm md:text-base px-6 py-2 rounded-full text-center font-semibold'>
                            Why Choose Us
                        </p>
                        <h2 className='text-3xl md:text-4xl font-bold text-gray-900 text-center'>
                            Benefits of <span className='text-blue-600'>Khan's Clinic</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative">
                            <div className="w-full max-w-[450px] h-[500px] rounded-2xl overflow-hidden shadow-lg mx-auto">
                                <img src={Image1} alt="Khan's Clinic" className='w-full h-full object-cover' />
                            </div>

                            <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                                <div className="text-center text-white">
                                    <div className="text-2xl">✓</div>
                                </div>
                            </div>

                            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-600">15+</div>
                                    <div className="text-sm text-gray-600 font-medium">Years Experience</div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="grid gap-6">

                                <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-xl hover:shadow-md transition">
                                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">Experienced Medical Professionals</h3>
                                        <p className="text-gray-600 text-sm">Our team of qualified doctors and healthcare experts provide top-quality medical care with years of experience</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-xl hover:shadow-md transition">
                                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">24/7 Emergency Services</h3>
                                        <p className="text-gray-600 text-sm">Round-the-clock emergency medical care available whenever you need it most</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-xl hover:shadow-md transition">
                                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">Advanced Diagnostic Equipment</h3>
                                        <p className="text-gray-600 text-sm">State-of-the-art medical technology for accurate diagnosis and effective treatment plans</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-xl hover:shadow-md transition">
                                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">Patient-Centered Care</h3>
                                        <p className="text-gray-600 text-sm">Personalized treatment plans focused on your individual health needs and comfort</p>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-4">
                                <Link to="/login" className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition shadow-lg hover:shadow-xl">
                                    Book an Appointment
                                </Link>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default ChooseUs;