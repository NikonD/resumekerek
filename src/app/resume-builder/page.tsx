"use client";
import { Provider } from "react-redux";
import { store } from "lib/redux/store";
import { ResumeForm } from "components/ResumeForm";
import Resume from "components/Resume";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TopNavBar } from "components/TopNavBar";
import { NotificationContainer } from "components/Notifications";
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n';

export default function Create() {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <TopNavBar />
        <main className="relative h-full w-full overflow-hidden bg-gray-50">
          <div className="grid grid-cols-3 md:grid-cols-6">
            <div className="col-span-3">
              <ResumeForm />
            </div>
            <div className="col-span-3">
              <Resume />
            </div>
          </div>
          <NotificationContainer />
        </main>
      </I18nextProvider>

    </Provider>
  );
}
