"use client";
import { store } from "lib/redux/store"
import { I18nextProvider } from "react-i18next"
import { Provider } from "react-redux"
import i18n from "../../../i18n"
import { TopNavBar } from "components/TopNavBar"
import { NotificationContainer } from "components/Notifications"
import PaymentFrame from "./PaymentFrame";
import { Footer } from "components/Footer";
import { useState } from "react";

export default function Payment() {

  const [authOpen, setAuthOpen] = useState(false);

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <main className="mx-auto max-w-screen-2xl bg-dot px-8 pb-32 text-gray-900 lg:px-12">
          <TopNavBar isAuthOpen={authOpen} />
          <PaymentFrame openAuth={setAuthOpen}/>
          <NotificationContainer />
        </main>
        <Footer />
      </I18nextProvider>
    </Provider>
  )
}