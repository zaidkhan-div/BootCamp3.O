import React, { useState } from 'react';
import Container from '../Shared/Container';

const TimingScehdual = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: '',
        time: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Appointment booked:', formData);
        // Handle form submission logic here
    };

    return (
        <Container>
            <div className="bg-white my-20 rounded-2xl shadow-lg p-8">
                <h1 className='text-base md:text-2xl text-center text-black font-bold mb-5'>
                    Book a free consultancy.
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end">

                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                            Name
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                👤
                            </span>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                            Phone Number
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                📞
                            </span>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Your Phone"
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                            Preferred Date
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                📅
                            </span>
                            <input
                                type="text"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                placeholder="dd/mm/yyyy"
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                            Preferred Time
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                🕐
                            </span>
                            <input
                                type="text"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                placeholder="00:00"
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-8 py-2.5 rounded-full text-sm font-medium hover:bg-blue-700 transition whitespace-nowrap cursor-pointer"
                    >
                        Book Now
                    </button>
                </form>
            </div>
        </Container>
    );
};

export default TimingScehdual;