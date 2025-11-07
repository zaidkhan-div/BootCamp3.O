import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import Container from '../Shared/Container';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Handle form submission logic here
        alert('Thank you for contacting us! We will get back to you soon.');
        setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        });
    };

    return (
        <section id="contact" className="py-16 bg-gray-50">
            <Container>

                <div className="text-center mb-12">
                    <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-2">
                        Contact Us
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Get In <span className="text-blue-600">Touch</span>
                    </h2>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        Have questions or need to schedule an appointment? We're here to help!
                    </p>
                </div>

                <div className="">

                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                            Send Us a Message
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter your phone number"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="What is this regarding?"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    Message *
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Write your message here..."
                                    required
                                    rows="4"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                                ></textarea>
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                            >
                                <Send size={18} />
                                Send Message
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default ContactForm;