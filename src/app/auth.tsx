"use client"
import React, { useState } from 'react';
import { AuthForm, RegForm, UserComponent } from './components/AuthForm';
import { IUserData } from 'lib/redux/types';

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

  return (

    <div style={{ zIndex: 1000 }} className={`absolute max-sm:grid-cols-1 auth-container bg-white shadow-md fixed top-0 bottom-0 ${open ? 'open' : ''} ${open ? '' : 'hidden'}`}>

      <button onClick={() => { setOpen(open ? false : true) }} className="bg-gray-300 text-white  py-2 px-4">
        {open ? 'Закрыть' : 'Open'}
      </button>
      <div className="p-6">
        {user.islogin ? 
          <UserComponent 
            fullname={user.fullname}
            email={user.email}
            active_until={user.active_until}
            plan={user.plan}/> :
          page == "login" ? 
            <AuthForm setPage={setPage} onGoogleAuth={handleGoogleAuth} /> :
            <RegForm setPage={setPage} onGoogleAuth={()=>{}} />
        }

      </div>
    </div>
  );
};

export default AuthContainer;
