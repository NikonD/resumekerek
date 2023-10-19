import axios from 'axios';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import config from '../../../config/config.json'
import { useSelector } from 'react-redux';
import { selectUser } from 'lib/redux/loginSlice';
import { toast } from 'react-toastify';

type Plan = {
  type: string;
  price: number;
  name: string
};

type Currency = {
  currency: string;
  label: string;
  plans: Plan[];
  symbol: string;
};

const PaymentFrame: React.FC = () => {

  const { t, i18n } = useTranslation()
  const user = useSelector(selectUser)
  // const [currentPrice, setCurrentPrice] = useState()
  console.log(i18n.language)
  function numberWithSpaces(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  console.log("TESTTESTTEST")
  function generateOrderNumber() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const randomPart = Math.floor(Math.random() * 10000).toString().padStart(4, '0');

    const orderNumber = `${year}${month}${day}${randomPart}`;
    return orderNumber;
  }

  const [currency, setCyrrency] = useState(0)
  const [plan, setPlan] = useState(0)
  const [ofert, isOfert] = useState(false)

  const subscriptionData: Currency[] = [
    {
      currency: 'тенге',
      label: "KZT",
      plans: [
        { type: 'Месяц', price: 10000, name: "sub1" },
        { type: 'Полгода', price: 50000, name: "sub2" },
        { type: 'Год', price: 100000, name: "sub3" },
      ],
      symbol: '₸'
    },
    {
      currency: 'юань',
      label: "CNY",
      plans: [
        { type: 'Месяц', price: 158, name: "sub1" },
        { type: 'Полгода', price: 798, name: "sub2" },
        { type: 'Год', price: 1588, name: "sub3" },
      ],
      symbol: '¥'
    },
    {
      currency: 'рублей',
      label: "RUB",
      plans: [
        { type: 'Месяц', price: 2125, name: "sub1" },
        { type: 'Полгода', price: 10635, name: "sub2" },
        { type: 'Год', price: 21275, name: "sub3" },
      ],
      symbol: '₽'
    },
  ];
  // setCurrentPrice(subscriptionData[currency].plans[plan])
  // Для каждой валюты и типа, вы можете получить доступ к стоимости и обозначению валюты так:
  // const priceAndCurrencyForTengeMonth = subscriptionData[0].plans[0]; // { type: 'Месяц', price: 10000, symbol: '₸' }
  // const priceAndCurrencyForYuanYear = subscriptionData[1].plans[2]; // { type: 'Год', price: 1588, symbol: '¥' }
  // const priceAndCurrencyForRublesHalfYear = subscriptionData[2].plans[1]; // { type: 'Полгода', price
  // // Для каждой валюты и типа, вы можете получить доступ к стоимости подписки так:
  // const priceForTengeMonth = subscriptionData[0].plans[0].price; // 10000
  // const priceForYuanYear = subscriptionData[1].plans[2].price; // 1588
  // const priceForRublesHalfYear = subscriptionData[2].plans[1].price; // 10635

  const choosePrice = () => {
    // setCurrentPrice(subscriptionData[currency].plans[plan])
  }

  let onPay = async () => {
    const requestData = {
      script: 'init_payment.php',
      pg_order_id: `${generateOrderNumber()}`,
      pg_amount: subscriptionData[currency].plans[plan].price,
      pg_currency: subscriptionData[currency].label,
      pg_description: `${subscriptionData[currency].plans[plan].name};${subscriptionData[currency].plans[plan].type}`,
      pg_user_contact_email: user.email,
      pg_param1: "TEST PARAM",
      pg_result_url: `${config.API_URL}/api/pb/result-payment`,
      pg_success_url: `https://resumekerek.com/success-payment`,
      pg_failure_url: `https://resumekerek.com/error-payment`
    };

    const url = `${config.API_URL}/api/pb/initiate-payment`;

    const token = localStorage.getItem('token');

    axios.post(url, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => {
        const { redirectUrl } = response.data
        window.open(redirectUrl)
      })
      .catch(error => {
        toast.error(t('server-not-response'))
        console.error('Ошибка при отправке запроса:', error);
      });
  }


  return (
    <div className="flex items-center justify-center  h500">

      <div style={{ width: "450px" }} className='payment__block'>
        <div className='mb-5 text-base sm:text-10pt'>
          {/* <p>{t('platformText')}</p> */}
        </div>
        <div className="flex flex-row justify-around payment__header">
          <button
            onClick={() => { setPlan(0) }}
            className="payment__tab-btn hover:border-blue-500 focus:text-blue-500">
            {t('monthly-subscription')}
          </button>
          <button
            onClick={() => { setPlan(1) }}
            className="payment__tab-btn hover:border-blue-500 focus:text-blue-500">
            {t('half-year-subscription')}
          </button>
          <button
            onClick={() => { setPlan(2) }}
            className="payment__tab-btn hover:border-blue-500 focus:text-blue-500">
            {t('yearly subscription')}
          </button>
        </div>
        <div className='flex flex-col border gap-4 border-solid p-6'>
          <div className='flex flex-row justify-between'>
            <h1 className='text-xl underline'>
              {numberWithSpaces(subscriptionData[currency].plans[plan].price)} {subscriptionData[currency].symbol}
            </h1>
            <div className="flex gap-4 flex-row justify-around payment__header">
              <button
                onClick={() => { setCyrrency(0) }}
                className="hover:text-blue-500 focus:text-blue-500">
                KZT
              </button>
              <button
                onClick={() => { setCyrrency(1) }}
                className="hover:text-blue-500 focus:text-blue-500">
                CNY
              </button>
              <button
                onClick={() => { setCyrrency(2) }}
                className="hover:text-blue-500 focus:text-blue-500">
                RUB
              </button>
            </div>
          </div>
          <hr />
          <div className='flex flex-col gap-3'>
            <p>1. {t('subscriptionDurationText')}</p>
            <p>2. {t('enterCardDetailsText')}</p>
            <p>3. {t('waitPaymentProcessingText')}</p>
          </div>
          {/* <div className='flex flex-row max:w-100'> */}
          <div className='flex flex-row gap-5 justify-center'>
            <img width={40} src='assets/visa-10.svg' />
            <img width={40} src='assets/mastercard-2.svg' />
          </div>

          {/* </div> */}
          <div className='m-auto mt-5 gap-5 flex flex-col  justify-center'>

            <div className='flex flex-col gap-2'>
              <div className='flex flex-row gap-2'>
                <input checked={ofert} type="checkbox" onChange={(e) => { isOfert(e.currentTarget.checked) }} />
                <label dangerouslySetInnerHTML={{ __html: t('agreementOffer', { a: '<a href="#">' }) }}></label>
              </div>
              <a className='font-medium text-blue-600 dark:text-blue-500 hover:underline' target="_blank" href={`${config.API_URL}/pub/policy_${i18n.language}.pdf`}>{t('private-policy')}</a>
            </div>
            <button
              disabled={!ofert}
              onClick={() => {
                onPay()
              }}
              className={`${ofert ? ' hover:bg-blue-400 focus:shadow-outline focus:outline-none' : 'disabled:opacity-50 disabled:cursor-not-allowed'} shadow bg-blue-500 text-white font-bold py-2 px-4`} type="button">
              {t('paymentButton')}
            </button>
            <p>{t('paymentText')}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PaymentFrame;
