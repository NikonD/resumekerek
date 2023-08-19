import React, { useState } from 'react';
import { ServiceCard } from './ServiceCard';
import { useTranslation } from 'react-i18next';

const ServicesPage: React.FC = () => {
  const {t} = useTranslation()

  const services = [
    {
      title: t('monthly-subscription'),
      description: "описание",
      price: 1000,
      duration: t('month')
    },
    {
      title: t('half-year-subscription'),
      description: "описание",
      price: 4000,
      duration: t('6-months')
    },
    {
      title: t('yearly subscription'),
      description: "описание",
      price: 8000,
      duration: t('year')
    },
  ];

  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className='bg-white mt-10'>
      <h1 className="text-3xl font-bold text-center py-8">{t("subscription-title")}</h1>
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
            {isExpanded ? t('subscription-collapse-link') : t('subscription-moreinfo-link')}
          </button>
          <p className="text-red-500">{t("subscription-is-not-active")}</p>
        </div>
      </div>
    </div>

  );
};

export { ServicesPage };
