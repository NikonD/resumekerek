import React from 'react';
import { useTranslation } from 'react-i18next';

interface Service {
  title: string,
  description: string,
  price: number,
  duration: string,
}

interface ServiceCardProps {
  service: Service,
  isLogin: boolean,
  isActive: boolean
  onClick: () => void
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, isActive, isLogin, onClick }) => {

  const { t } = useTranslation()

  return (
    <div onClick={onClick} className="service-card bg-white rounded-lg shadow-lg p-6 w-64 h-64 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-4">{service.title}</h2>
        <p className="text-lg">{service.description}</p>
        <p className="text-lg font-bold">{service.price} тг/ {service.duration}</p>
      </div>
      {isLogin ?
        isActive ?
          <p className="text-lg">{t('subscription-is-active')}</p> :
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            {t('buy')}
          </button> :
        <p className="text-lg">{t('login-required')}</p>
      }

    </div >
  );
};

export { ServiceCard };
