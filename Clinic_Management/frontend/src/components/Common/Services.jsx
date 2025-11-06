import React from 'react';
import Container from '../Shared/Container';

const Services = () => {
  const services = [
    {
      id: 1,
      icon: "🩺",
      title: "General Consultation",
      description: "Comprehensive health checkups and medical consultations with experienced doctors for all your healthcare needs",
      image: "👨‍⚕️"
    },
    {
      id: 2,
      icon: "💉",
      title: "Vaccination Services",
      description: "Complete vaccination programs for children and adults, including travel vaccines and immunization schedules",
      image: "💊"
    },
    {
      id: 3,
      icon: "🔬",
      title: "Diagnostic Services",
      description: "Advanced laboratory testing and diagnostic procedures with accurate results and quick turnaround time",
      image: "⚕️"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        {/* Header Section */}
        <div className="flex justify-between items-center mb-12">
          <div className='flex flex-col items-start'>
            <p className="text-white bg-blue-600 py-1 px-5 rounded-full uppercase tracking-wider text-sm font-semibold mb-2">
              OUR SERVICES
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              <span className="text-blue-600">A Wide Range of Services</span>
              <br />
              for Your Best Health
            </h2>
          </div>
          <button className="hidden md:block bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition">
            Explore All Services
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition group"
            >
              {/* Image Section */}
              <div className="relative h-64 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-50">
                  {service.image}
                </div>

                {/* Icon Badge */}
                <div className="absolute bottom-6 left-6 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-3xl shadow-lg">
                  {service.icon}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                <button className="text-blue-600 font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                  Learn more
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Button */}
        <div className="mt-8 text-center md:hidden">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition">
            Explore All Services
          </button>
        </div>
      </Container>
    </section>
  );
};

export default Services;