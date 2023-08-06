// components/AuthForm.tsx
import React, { useState } from 'react';
import { INPUT_CLASS_NAME } from './ResumeForm/Form/InputGroup';
import axios from 'axios';
// import { useForm } from 'react-hook-form';

interface AuthFormProps {
  onGoogleAuth: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onGoogleAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async () => {
    try {
      const response = await axios.post('http://193.122.54.25:5000/api/auth/login', { email, password });
      const { token } = response.data;

      // Сохранение JWT в localStorage.
      localStorage.setItem('token', token);
      // Теперь у вас есть JWT, который вы можете отправить с каждым запросом на защищенные маршруты.
    } catch (err) {
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
            onChange={(e)=>{setEmail(e.currentTarget.value)}}
            required  />
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
            onChange={(e)=>{setPassword(e.currentTarget.value)}}
            required  />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3"></div>
        <label className="md:w-2/3 block text-gray-500 font-bold">
          <input className="mr-2 leading-tight" type="checkbox" />
          <span className="text-sm">
            Send me your newsletter!
          </span>
        </label>
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

export default AuthForm;
