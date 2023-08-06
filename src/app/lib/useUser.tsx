import { useState, useEffect } from 'react';
import axios from 'axios';

const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Получение JWT из localStorage.
    const token = localStorage.getItem('token');

    if (token) {
      // Проверка токена на сервере и получение данных пользователя.
      axios.post('http://193.122.54.25:5000/api/auth/verify',{}, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          const { data } = response;
          setUser(data); // Устанавливаем данные пользователя в стейт.
        })
        .catch((err) => {
          console.error('Failed to verify token:', (err as Error).message);
        });
    }
  }, []);

  return user;
};

export default useUser;
