// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import chTranslation from './public/locales/ch.json'; // Подключите соответствующий файл
import ruTranslation from './public/locales/ru.json'; // Подключите соответствующий файл
import kzTranslation from './public/locales/kz.json'; // Подключите соответствующий файл
import enTranslation from './public/locales/en.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      kz: { translation: kzTranslation },
      ru: { translation: ruTranslation },
      en: { translation: enTranslation },
      ch: { translation: chTranslation },
    },
    lng: 'ru', // Язык по умолчанию
    interpolation: {
      escapeValue: false, // Реагировать на HTML теги в переводах
    },

  }).catch((err) => {
    console.log("ERR LANG", err)
  })

export default i18n;
