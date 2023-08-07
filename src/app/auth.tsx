"use client"
import React, { useState } from 'react';
import AuthForm from './components/AuthForm';

interface AuthContainerProps {
  open: boolean,
  setOpen: any,
  user: any
}

const AuthContainer: React.FC<AuthContainerProps> = ({ open, setOpen, user }) => {
  // const [open, setOpen] = useState(false)
  const handleGoogleAuth = () => {
    console.log('Google Auth');
  };

  return (

    <div style={{ zIndex: 1000 }} className={`absolute max-sm:grid-cols-1 auth-container bg-white shadow-md fixed top-0 bottom-0 ${open ? 'open' : ''} ${open ? '' : 'hidden'}`}>

      <button onClick={() => { setOpen(open ? false : true) }} className="bg-gray-300 text-white rounded-md py-2 px-4">
        {open ? 'Close' : 'Open'}
      </button>
      <div className="p-6">
        {user ? user.username : <AuthForm onGoogleAuth={handleGoogleAuth} />}

      </div>
    </div>
  );
};

export default AuthContainer;
