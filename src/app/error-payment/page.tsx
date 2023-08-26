"use client";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../i18n";
import { TopNavBar } from "components/TopNavBar";
import { Provider } from "react-redux";
import { store } from "lib/redux/store";
import PaymentStatus from "components/PaymentStatus";


export default function Home() {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>

        <main className="mx-auto max-w-screen-2xl bg-dot px-8 pb-32 text-gray-900 lg:px-12">
          <TopNavBar />
          <PaymentStatus isSuccess={false}/> 
        </main>
      </I18nextProvider>

    </Provider>

  );
}
