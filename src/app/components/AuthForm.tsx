// components/AuthForm.tsx
import React, { useEffect, useState } from 'react';
import { INPUT_CLASS_NAME } from './ResumeForm/Form/InputGroup';
import axios from 'axios';
import useUser from 'lib/useUser';
import moment from 'moment';
import 'moment/locale/ru';
import i18n from 'i18next';
import config from '../../../config/config.json'
import { useSelector } from 'react-redux';
import { selectUser, useLoginDispatch } from 'lib/redux/loginSlice';
import { ToastContainer, toast } from 'react-toastify';
import { ErrorNotification } from './Notifications';
import { useSaveStateToLocalStorageOnChange, useSetInitialStore } from 'lib/redux/hooks';
import { useTranslation } from 'react-i18next';

moment.locale('ru')
// console.log(i18n.language)
interface AuthFormProps {
  onGoogleAuth: () => void;
  setPage: (page: string) => void
}

interface UserProps {
  fullname?: string,
  email?: string,
  plan?: string
  active_until?: Date
}

export const AuthForm: React.FC<AuthFormProps> = ({ setPage, onGoogleAuth }) => {
  let { t } = useTranslation()


  useSetInitialStore();
  useSaveStateToLocalStorageOnChange()

  const [islogin, setIsogin] = useState(false)
  const [loginData, setLoginData] = useState({
    fullname: '',
    email: '',
    plan: '',
    active_until: new Date(),
  });

  const user = useSelector(selectUser)
  const { changeUser, loginUser, logoutUser } = useLoginDispatch();

  useEffect(() => {

    const token = localStorage.getItem('token');

    // if (token) {
    // Проверка токена на сервере и получение данных пользователя.
    axios.post(`${config.API_URL}/api/auth/verify`, {}, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        const { user } = response.data;
        loginUser(user);
      })
      .catch((err) => {

      });

  }, [])
  
  // i18n.changeLanguage(user.language || 'ru')

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const user = useUser()
  console.log(user)
  const onSubmit = async () => {
    try {
      const response = await axios.post(`${config.API_URL}/api/auth/login`, { email, password });
      const { token, user, status } = response.data;
      if (status == "200") {
        if (user) {
          localStorage.setItem('token', token);
          loginUser(user)
        }
      }
      else {
        toast.error(t("login-or-passord-invalid"))
      }


      setIsogin(true)
      console.log(response)
      // Сохранение JWT в localStorage.

      // Теперь у вас есть JWT, который вы можете отправить с каждым запросом на защищенные маршруты.
    } catch (err) {
      setIsogin(false)
      console.log("AUTH ERR", err)
      ErrorNotification({ message: (err as Error).message });
      console.error('Authentication failed:', (err as Error).message);
    }
  };

  return (
    <form className="w-full max-w-sm">
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
            {t("email-label")}
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
            {t("password-label")}
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
        <a
          className='auth-link'
          href='#'
          onClick={() => { setPage("reg") }}>
          {t("signup-link")}
        </a>
      </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <button onClick={onSubmit} className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 " type="button">
            {t("signin-button")}
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
  const { t } = useTranslation()

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error(t("password-mismatch"));
      return;
    }

    try {
      const response = await axios.post(`${config.API_URL}/api/auth/registration`, { email, password, fullname });
      const token = response.data.data;

      console.log(response)

      // localStorage.setItem('token', token);
      toast.success(t("account-created"))
      // Теперь у вас есть JWT, который вы можете отправить с каждым запросом на защищенные маршруты.
    } catch (err: any) {
      switch (err.code) {
        case "1":
          toast.error(t("user-already-exists"))
          break;
        default:
          toast.error(t("failed-create-account"))
          break;
      }

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
            {t("email-label")}
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            name="email"
            className="appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            {t("fullname-label")}
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            name="fullname"
            className="appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            {t("password-label")}
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            name="password"
            className="appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            {t("repeat-password-label")}
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            name="confirmPassword"
            className="appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="inline-confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3"></div>
        <a
          className='auth-link'
          onClick={() => { setPage("login") }}>
          {t("signin-link")}
        </a>
      </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <button
            onClick={handleSubmit}
            className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 "
            type="button"
          >
            {t("signup-button")}
          </button>
        </div>
      </div>
    </form>
  );

}

export const UserComponent: React.FC<UserProps> = ({ fullname, email, plan, active_until }) => {
  const { logoutUser } = useLoginDispatch()
  const user = useSelector(selectUser)

  const { t } = useTranslation()

  function onLogout() {
    logoutUser()
    localStorage.removeItem("token")
  }

  const currentDate = moment()
  const isTargetDatePast = moment(active_until).isBefore(currentDate);
  const remainingDays = moment(new Date(active_until || new Date())).diff(currentDate, "days")

  const getDaysWord = (days: number) => {
    if (days === 1) return t('day');
    if (days >= 2 && days <= 4) return t('of-day');
    return t('days');
  };

  return (
    <div className="w-full max-w-sm md:flex flex-col mb-6">
      <div className="mb-4">
        <label className="block text-gray-500 font-bold   mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
          {fullname}
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-500 font-bold   mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
          {email}
        </label>
      </div>
      {active_until ?
        <div className="mb-4">
          <label className="block text-gray-500   mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
            <a
              className='auth-link'
              href='/resume-profile'>
              {isTargetDatePast ? t("subscription-is-not-active") : `${t("subscription-is-active-for")} ${remainingDays} ${getDaysWord(remainingDays)}`}
            </a>
          </label>
        </div> : null}
      <div>
        <button onClick={onLogout} className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 " type="button">
          {t("signout-button")}
        </button>
      </div>
    </div>
  )
}