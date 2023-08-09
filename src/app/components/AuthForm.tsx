// components/AuthForm.tsx
import React, { useEffect, useState } from 'react';
import { INPUT_CLASS_NAME } from './ResumeForm/Form/InputGroup';
import axios from 'axios';
import useUser from 'lib/useUser';
// import { useForm } from 'react-hook-form';

interface AuthFormProps {
  onGoogleAuth: () => void;
  setPage: (page: string) => void
}

export const AuthForm: React.FC<AuthFormProps> = ({ setPage, onGoogleAuth }) => {
  const [islogin, setIsogin] = useState(false)

  useEffect(() => {

  }, [])

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const user = useUser()
  console.log(user)
  const onSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const token = response.data.data;
      setIsogin(true)
      console.log(response)
      // Сохранение JWT в localStorage.
      localStorage.setItem('token', token);
      // Теперь у вас есть JWT, который вы можете отправить с каждым запросом на защищенные маршруты.
    } catch (err) {
      setIsogin(false)
      console.error('Authentication failed:', (err as Error).message);
    }
  };

  return (
    <form className="w-full max-w-sm">
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
            Full Name
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            name={"email"}
            className={INPUT_CLASS_NAME}
            id="inline-full-name"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.currentTarget.value) }}
            required />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
            Password
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            name={"password"}
            className={INPUT_CLASS_NAME}
            id="inline-password"
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.currentTarget.value) }}
            required />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3"></div>
        <button onClick={() => { setPage("reg") }} >Регистриция</button>
      </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <button onClick={onSubmit} className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
            Sign Up
          </button>
        </div>
      </div>
    </form>
  );
};


export const RegForm: React.FC<AuthFormProps> = ({ setPage }) => {
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/registration', { email, password, fullname });
      const token = response.data.data;

      console.log(response)

      localStorage.setItem('token', token);
      // Теперь у вас есть JWT, который вы можете отправить с каждым запросом на защищенные маршруты.
    } catch (err) {

      console.error('Authentication failed:', (err as Error).message);
    }

    // Handle registration logic here
    // You can send the data to an API or perform other actions

    // Reset form fields
    setEmail('');
    setFullname('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <form className="w-full max-w-sm">
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-email">
            Email
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            name="email"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="inline-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-fullname">
            Полное имя
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            name="fullname"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="inline-fullname"
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
            Пароль
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            name="password"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="inline-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-confirm-password">
            Подтвердите пароль
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            name="confirmPassword"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="inline-confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <button
            onClick={handleSubmit}
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
          >
            Зарегистрироваться
          </button>
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3"></div>
        <button onClick={() => { setPage("login") }} >Войти</button>
      </div>
    </form>
  );

}






