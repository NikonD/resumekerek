import React from 'react';

interface Service {
  title: string;
  description: string,
  price: number;
  duration: string;
}

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="service-card bg-white rounded-lg shadow-lg p-6 w-64 h-64 flex flex-col justify-between">
    <div>
      <h2 className="text-xl font-bold mb-4">{service.title}</h2>
      <p className="text-lg">{service.description}</p>
      <p className="text-lg font-bold">${service.price} / {service.duration}</p>
    </div>

    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
      Купить
    </button>
  </div>
  );
};

export {ServiceCard};
