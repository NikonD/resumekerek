"use client";
import { TopNavBar } from 'components/TopNavBar';
import React, { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider, useDispatch, useSelector } from "react-redux";
import i18n from '../../../i18n';
import { store } from 'lib/redux/store';
import { selectUser } from 'lib/redux/loginSlice';
import { EditUser } from './EditUser';
import { NotificationContainer } from 'components/Notifications';


const ProfileSettings = () => {
  

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <TopNavBar />
        <EditUser/>
        <NotificationContainer />
      </I18nextProvider>
    </Provider>
  );
};

export default ProfileSettings;

