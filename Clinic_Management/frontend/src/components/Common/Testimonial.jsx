import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Container from '../Shared/Container';

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        {
            id: 1,
            name: "Sarah Ahmed",
            location: "Karachi",
            image: "👩",
            text: "Khan's Clinic has been my family's trusted healthcare provider for years. The doctors are incredibly professional and caring. They take the time to listen and explain everything clearly. The clinic is always clean and well-maintained. I highly recommend their services to anyone looking for quality medical care."
        },
        {
            id: 2,
            name: "Muhammad Ali",
            location: "Karachi",
            image: "👨",
            text: "I was impressed by the state-of-the-art facilities and the expertise of the medical staff at Khan's Clinic. From the moment I walked in, I felt welcomed and cared for. The diagnostic services are top-notch, and the results were delivered promptly. Truly a world-class healthcare experience."
        },
        {
            id: 3,
            name: "Fatima Noor",
            location: "Karachi",
            image: "👩‍⚕️",
            text: "The vaccination services at Khan's Clinic are exceptional. The staff made my children feel comfortable throughout the process. The doctors are knowledgeable and patient, answering all our questions. It's reassuring to know we have such a reliable clinic in our community. Thank you for the excellent care!"
        }
    ];

    const nextTestimonial = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevTestimonial = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    };

    return (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
            <Container>
                {/* Header */}
                <div className="text-center mb-12">
                    <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-2">
                        Testimonials
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        What Our <span className="text-blue-600">Patients Say</span>
                    </h2>
                </div>

                {/* Testimonial Card */}
                <div className="relative">
                    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 relative overflow-hidden">
                        {/* Quote Icon Background */}
                        <div className="absolute top-6 right-6 text-blue-100 opacity-50">
                            <Quote size={80} />
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                            {/* Avatar and Name */}
                            <div className="flex flex-col items-center mb-6">
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-4xl mb-4 shadow-lg">
                                    {testimonials[currentIndex].image}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">
                                    {testimonials[currentIndex].name}
                                </h3>
                                <p className="text-blue-600 text-sm font-medium">
                                    {testimonials[currentIndex].location}
                                </p>
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-gray-600 text-center leading-relaxed text-base md:text-lg max-w-3xl mx-auto">
                                {testimonials[currentIndex].text}
                            </p>

                            {/* Rating Stars */}
                            <div className="flex justify-center gap-1 mt-6">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="text-yellow-400 text-xl">★</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={prevTestimonial}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition shadow-lg cursor-pointer"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        onClick={nextTestimonial}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition shadow-lg cursor-pointer"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-8">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full transition ${index === currentIndex ? 'bg-blue-600 w-8' : 'bg-gray-300'
                                }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default Testimonials;