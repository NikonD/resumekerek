import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface PaymentStatusProps {
  isSuccess: boolean;
}

const PaymentStatus: React.FC<PaymentStatusProps> = ({ isSuccess }) => {

  const {t} = useTranslation()

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md">
        {isSuccess ? (
          <>
            <svg
              className="text-green-500 w-12 h-12 mx-auto mb-4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            <h2 className="text-2xl font-semibold text-center text-green-500 mb-2">
              {t('payment-success-completed')}
            </h2>
            <p className="text-gray-600 text-center">{t('thanks-for-payment')}</p>
          </>
        ) : (
          <>
            <svg
              className="text-red-500 w-12 h-12 mx-auto mb-4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
            <h2 className="text-2xl font-semibold text-center text-red-500 mb-2">
              {t('payment-failed')}
            </h2>
            <p className="text-gray-600 text-center">
              {t('payment-failed-text')}
            </p>
          </>
        )}
        <div className="mt-4 text-center">
          <Link href="/">
            <a className="text-blue-500 hover:underline">{t('return-to-main')}</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus;
