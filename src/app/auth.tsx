"use client"
import React, { useState } from 'react';
import { AuthForm, RegForm, UserComponent } from './components/AuthForm';
import { IUserData } from 'lib/redux/types';
import { useTranslation } from 'react-i18next';

interface AuthContainerProps {
  open: boolean,
  setOpen: any,
  user: IUserData
}

const AuthContainer: React.FC<AuthContainerProps> = ({ open, setOpen, user }) => {
  // const [open, setOpen] = useState(false)
  const [page, setPage] = useState("login")
  const handleGoogleAuth = () => {
    console.log('Google Auth');
  };

  const { t } = useTranslation()
  return (

    <div style={{ zIndex: 1000 }} className={`absolute max-sm:grid-cols-1 auth-container bg-white shadow-md fixed top-0 bottom-0 ${open ? 'open' : ''} ${open ? '' : 'hidden'}`}>
      <div className='flex'>
        <button onClick={() => { setOpen(open ? false : true) }} className="bg-gray-300 text-white  py-2 px-4">
          {open ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-6 h-6 text-gray-500 hover:text-gray-700">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
            : 'Open'}
        </button>

        <button onClick={() => { window.location.href='/profile-settings' }} className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 " type="button">
          {t("profile-settings-button")}
        </button>

      </div>

      <div className="p-6">
        {user.islogin ?
          <UserComponent
            fullname={user.fullname}
            email={user.email}
            active_until={user.active_until}
            plan={user.plan} /> :
          page == "login" ?
            <AuthForm setPage={setPage} onGoogleAuth={handleGoogleAuth} /> :
            <RegForm setPage={setPage} onGoogleAuth={() => { }} />
        }

      </div>
    </div>
  );
};

export default AuthContainer;
