import React from "react";

const ServicesPage = () => {
  const services = [
    {
      title: "Personalized Agricultural Consulting",
      description:
        "Tailored advice and detailed analysis for your specific agricultural needs. Our experts provide comprehensive consultations to optimize your farming processes.",
      icon: "🌱",
    },
    {
      title: "Precision Farming Workshops",
      description:
        "Intensive training programs designed to help farmers leverage the latest agricultural technologies and innovative farming techniques.",
      icon: "📚",
    },
    {
      title: "IoT Integration Support",
      description:
        "Comprehensive support for implementing and managing Internet of Things (IoT) technologies in your agricultural operations.",
      icon: "🌐",
    },
    {
      title: "Crop Health Monitoring",
      description:
        "Advanced monitoring services using cutting-edge sensors and AI-driven analytics to track and optimize crop health.",
      icon: "🌾",
    },
  ];

  return (
    <main className="welcome-container">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-green-700 mb-8 text-center">
          SmartHarvest Services
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-green-50"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-green-800 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
              <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Learn More
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            Our Service Commitment
          </h2>
          <p className="text-gray-600">
            At SmartHarvest, we are dedicated to providing comprehensive support
            that goes beyond simple product sales. Our services are designed to
            empower farmers with knowledge, technology, and personalized
            guidance.
          </p>
        </div>
      </div>
    </main>
  );
};

export default ServicesPage;
