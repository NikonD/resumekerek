"use client";
import { Hero } from "home/Hero";
import { Steps } from "home/Steps";
import { Features } from "home/Features";
import { Testimonials } from "home/Testimonials";
import { QuestionsAndAnswers } from "home/QuestionsAndAnswers";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";
import { TopNavBar } from "components/TopNavBar";
import { Provider } from "react-redux";
import { store } from "lib/redux/store";


export default function Home() {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>

        <main className="mx-auto max-w-screen-2xl bg-dot px-8 pb-32 text-gray-900 lg:px-12">
          <TopNavBar />
          <Hero />
          {/* <Steps />
<Features />
<Testimonials />
<QuestionsAndAnswers />  */}
        </main>
      </I18nextProvider>

    </Provider>

  );
}
