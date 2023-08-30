"use client";
import { Provider } from "react-redux";
import { store } from "lib/redux/store";
import { useState } from "react";
import 'moment/locale/ru';
import { PDFListSection } from "components/Profile/PDFSection";
import { TopNavBar } from "components/TopNavBar";
import { NotificationContainer } from "components/Notifications";
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n';

export default function Profile() {

  const [activeTab, setActiveTab] = useState<'resume' | 'responses'>('resume');

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <TopNavBar />
        <main className="relative h-full w-full overflow-hidden bg-gray-50">
          {/* <ServicesPage /> */}

          <PDFListSection />
        </main>
        <NotificationContainer />
      </I18nextProvider>
    </Provider>
  );
}