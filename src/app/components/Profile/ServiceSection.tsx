import React, { useState } from 'react';
import { ServiceCard } from './ServiceCard';

const ServicesPage: React.FC = () => {
  const services = [
    {
      title: 'Услуга на месяц',
      description: "описание",
      price: 1000,
      duration: 'месяц'
    },
    {
      title: 'Услуга на полгода',
      description: "описание",
      price: 4000,
      duration: '6 месяцев'
    },
    {
      title: 'Услуга на год',
      description: "описание",
      price: 8000,
      duration: 'год'
    },
  ];

  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className='bg-white mt-10'>
      <h1 className="text-3xl font-bold text-center py-8">Услуги</h1>
      <div className="flex justify-center items-center  ">
        <div className={`grid grid-cols-3 gap-6 ${isExpanded ? 'max-sm:grid-cols-1 max-md:grid-cols-3' : 'hidden'}`}>
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col items-center">
          <button
            className="text-blue-500 underline"
            onClick={toggleExpand}
          >
            {isExpanded ? 'Свернуть' : 'Подробнее'}
          </button>
          <p className="text-red-500">Подписка неактивна</p>
        </div>
      </div>
    </div>

  );
};

export { ServicesPage };
