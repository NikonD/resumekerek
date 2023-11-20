import axios from "axios";
import { selectUser } from "lib/redux/loginSlice";
import { IUserData, ResumeProfile } from "lib/redux/types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import config from '../../../config/config.json'
import { PhotoUpload } from "./PhotoUpload";
import { toast } from "react-toastify";
import { useAppSelector } from "lib/redux/hooks";
import { changeProfile, selectProfile } from "lib/redux/resumeSlice";


type ErrorMessages = {
  email: string;
  language: string;
  password: string;
  newPassword: string;
  fullname: string;
  phone: string;
};

interface IProfileData {
  email: string;
  language: string;
  phoneNumber: string;
  photo: string;
  fullname: string;
  address: string;
}

const EditUser = () => {
  const user = useSelector(selectUser);

  const dispath = useDispatch()
  const profile = useAppSelector(selectProfile)


  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({
    email: "",
    language: "",
    password: "",
    newPassword: "",
    fullname: "",
    phone: "",
  });

  const [profileData, setProfileData] = useState<IUserData>(user);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setProfileData(user);
  }, [user]);

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

  const handleProfileChange = (field: keyof ResumeProfile, value: string) => {
    setProfileData((prevData) => ({
      ...prevData,
      [field]: value
    }))
  };

  const handleContactDataChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(e.target.value);
  };

  const handleNewPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewPassword(e.target.value);
  };

  const validateForm = () => {
    let isFormValid = true;

    const newErrorMessages: ErrorMessages = {
      email: "",
      language: "",
      password: "",
      newPassword: "",
      fullname: "",
      phone: "",
    };

    if (!emailPattern.test(profileData.email)) {
      newErrorMessages.email = t("invalidEmail");
      isFormValid = false;
    }

    if (profileData.language.trim() === "") {
      newErrorMessages.language = t("languageRequired");
      isFormValid = false;
    }

    if (password.trim() == "") {
      newErrorMessages.password = t('invalidPassword');
      console.log(password)
      isFormValid = false;
    }
    console.log(password)
    if (
      newPassword.trim() == "" &&
      passwordPattern.test(newPassword)
    ) {
      console.log(newPassword)
      newErrorMessages.newPassword =t('invalidNewPassword');
      isFormValid = false;
    }

    if (profileData.fullname.trim() === "") {
      newErrorMessages.fullname = t("fullNameRequired");
      isFormValid = false;
    }

    const phoneNumberPattern = /^(?:\+7|8|7)?\s?(?:\(\d{3}\)|\d{3})[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/;

    if (!phoneNumberPattern.test(profileData.phone)) {
      newErrorMessages.phone = t('invalidPhoneNumber');
      isFormValid = false;
    }

    setErrorMessages(newErrorMessages);

    setIsValid(isFormValid);
    return isFormValid;
  };

  const onSave = async () => {

    let newProfileData: any = {}

    if (validateForm()) {
     
      newProfileData = {
        ...profileData
      }

      if (password && password !=="") {
        newProfileData.password = password
        newProfileData.newPassword = newPassword
      }

      const token = localStorage.getItem('token');
      try {
        let response = await axios.post(
          `${config.API_URL}/api/auth/update`,
          { ...newProfileData },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        console.log(response.data)
        if (response.data.status == 'ok') {
          toast.success(t("user-saved-notify"))
          dispath(changeProfile({
            "field": "name",
            "value": profileData.fullname
          }))
          dispath(changeProfile({
            "field": "email",
            "value": profileData.email
          }))
          dispath(changeProfile({
            "field": "photo",
            "value": profileData.photo
          }))
          dispath(changeProfile({
            "field": "phone",
            "value": profileData.phone
          }))
          dispath(changeProfile({
            "field": "location",
            "value": profileData.address
          }))
          setTimeout(() => {
            window.location.href = '/resume-builder'
          }, 2000)
        }
        else {
          switch (response.data.code) {
            case 5:
              toast.error(t('current-password-incorrect'))
              break;
            default:
              toast.error(t('server-error-notify'))
          }

        }
      }
      catch (e) {
        toast.error(t('server-error-notify'))
      }

    }
  };

  const { t } = useTranslation();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white pl-6 pr-6 pb-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4">{t('emailAndLanguageLabel')}</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">{t('emailLabel')}</label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleContactDataChange}
            placeholder="email"
            className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('lang')}</label>
          <input
            type="text"
            name="language"
            value={profileData.language}
            onChange={handleContactDataChange}
            placeholder="ru"
            className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300" />
        </div>
      </div>
      {/* Второй блок */}
      <div className="bg-white pl-6 pr-6 pb-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4">{t('changePasswordTitle')}</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">{t('currentPasswordLabel')}</label>
          <input
            type="password"
            value={password}
            name="password"
            onChange={handlePasswordChange}
            placeholder=""
            className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('newPasswordLabel')}</label>
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={handleNewPasswordChange}
            placeholder=""
            className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
          />
        </div>
      </div>

      {/* Третий блок */}
      <div className="bg-white pl-6 pr-6 pb-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">{t('personalInfoTitle')}</h2>
        <div className="mb-4">
          {profileData.photo && <PhotoUpload
            name="photo"
            src={user.photo}
            value={profileData.photo}
            onChange={handleProfileChange}
          />}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">{t('fullNameLabel')}</label>
          <input
            type="text"
            placeholder=""
            name="fullname"
            value={profileData.fullname}
            onChange={handleContactDataChange}
            className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">{t('phoneNumberLabel')}</label>
          <input
            type="tel"
            placeholder="x(xxx) xxx xx xx"
            name="phone"
            value={profileData.phone}
            onChange={handleContactDataChange}
            className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('addressLabel')}</label>
          <input
            placeholder=""
            name="address"
            value={profileData.address}
            onChange={handleContactDataChange}
            className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
          />
        </div>
      </div>
      <div className="mt-6 flex flex-col justify-center">
        <div className="flex justify-center mt-4">
          <div className="w-full max-w-lg">
            {Object.keys(errorMessages).map((field) => (
              <p key={field} className="text-red-500 text-sm">
                {errorMessages[field as keyof ErrorMessages]}
              </p>
            ))}
          </div>
        </div>
        <button
          onClick={onSave}
          className="bg-[#722ED1] hover:bg-[#722ED1] text-white px-4 py-2 rounded"
        >
          {t("saveButton")}
        </button>
      </div>


      {/* ... Другие блоки информации, включая фото, имя, сайт и адрес */}
    </div>
  );
};

export { EditUser };
