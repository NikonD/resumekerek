import React, { useState } from 'react';
import { ServiceCard } from './ServiceCard';
import { useTranslation } from 'react-i18next';
import { RequestAuthToken } from './RequestToken';
import config from '../../../../config/config.json'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from 'lib/redux/loginSlice';


const ServicesPage: React.FC = () => {
  const { t } = useTranslation()

  const user = useSelector(selectUser)

  const services = [
    {
      title: t('monthly-subscription'),
      name: "sub1",
      description: "описание",
      price: 1000,
      duration: t('month'),
    },
    {
      title: t('half-year-subscription'),
      name:"sub2",
      description: "описание",
      price: 4000,
      duration: t('6-months')
    },
    {
      title: t('yearly subscription'),
      name: "sub3",
      description: "описание",
      price: 8000,
      duration: t('year')
    },
  ];

  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };


  let onPay = async (amount: number, name: string, description: string) => {
    const requestData = {
      script: 'init_payment.php',
      pg_order_id: `${new Date().getTime()}`,
      pg_amount: amount,
      pg_currency: 'KZT',
      pg_description: `${name};${description}`,
      pg_user_contact_email: user.email
    };
    
    const url = `${config.API_URL}/api/pb/initiate-payment`;
    
    axios.post(url, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => {
      const {redirectUrl} = response.data
      window.open(redirectUrl)
    })
    .catch(error => {
      console.error('Ошибка при отправке запроса:', error);
    });
  }

  return (
    <div className='bg-white mt-10'>
      <h1 className="text-3xl font-bold text-center py-8">{t("subscription-title")}</h1>
      <div className="flex justify-center items-center  ">
        <div className={`grid grid-cols-3 gap-6 ${isExpanded ? 'max-sm:grid-cols-1 max-md:grid-cols-3' : 'hidden'}`}>
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              onClick={() => {
                onPay(service.price, service.name, service.description)
              }} />
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
