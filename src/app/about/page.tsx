"use client";
import { TopNavBar } from "components/TopNavBar";
import { store } from "lib/redux/store";
import { I18nextProvider, useTranslation } from "react-i18next";
import { Provider } from "react-redux";
import i18n from "../../../i18n";
import { Footer } from "components/Footer";
import { AboutWrapper } from "./AboutWrapper";
import { Ru } from "./Ru";
import { Kz } from "./Kz";
import { Ch } from "./Ch";



export default function About() {

  const { t, i18n: _i18n } = useTranslation()

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <TopNavBar />
        <main className="relative md:h-screen  w-full  overflow-hidden bg-gray-50">
          <div className="container mx-auto p-4 max-w-screen-lg w-800" >
            {_i18n.language == 'ru' && <Ru />}
            {_i18n.language == 'kz' && <Kz />}
            {_i18n.language == 'ch' && <Ch />}
          </div>
        </main>
        <div className="">
          <Footer />
        </div>
      </I18nextProvider>
    </Provider>
  )
}