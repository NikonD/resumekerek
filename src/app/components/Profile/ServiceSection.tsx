import React, { useState } from 'react';
import { ServiceCard } from './ServiceCard';
import { useTranslation } from 'react-i18next';
import halyk from "./Pay";
import { RequestAuthToken } from './RequestToken';
import config from '../../../../config/config.json'


let onPay = async () => {
  let token = await RequestAuthToken()
  console.log(token)
  let createPaymentObject = function (token: any, invoiceId: any, amount: number) {
    let paymentObject = {
      auth: {},
      invoiceId: invoiceId,
      invoiceIdAlt: invoiceId,
      backLink: "https://example.kz/success.html",
      failureBackLink: "https://example.kz/failure.html",
      postLink: `http://193.122.54.25:5001/api/epay/postlink`,
      failurePostLink: "http://193.122.54.25:5001/api/epay/postlink",
      language: "rus",
      description: "Оплата подписки resumekerek",
      accountId: "testuser1",
      terminal: "67e34d63-102f-4bd1-898e-370781d0074d",
      amount: amount,
      data: `{\"statement\":{\"name\":\"Arman      Ali\",\"invoiceID\":\"${invoiceId}\"}}`,
      currency: "KZT",
      phone: "+77777777777",
      email: "example@example.com",
      cardSave: false
    };
    paymentObject.auth = token;
    console.log("paymentObject", paymentObject)

    return paymentObject;
  };
  let PaymentObject = createPaymentObject(token, `${(new Date().getTime()).toString().slice(-6)}`, 11234)
  // halyk.pay()
  setTimeout(() => {
    halyk.pay(PaymentObject);
  }, 3000)

}

const ServicesPage: React.FC = () => {
  const { t } = useTranslation()

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
            <ServiceCard
              key={index}
              service={service}
              onClick={() => {
                onPay()
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
