import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Этот компонент будет отображать контейнер для уведомлений
const NotificationContainer = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000} // Уведомление исчезнет через 5 секунд
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

// Этот компонент будет вызывать уведомления с сообщением об ошибке
const ErrorNotification = ({ message }: { message: string }) => {
  return (
    <div>
      {toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })}
    </div>
  );
};

export { NotificationContainer, ErrorNotification };
