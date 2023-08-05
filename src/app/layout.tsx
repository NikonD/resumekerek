import "globals.css";
import { TopNavBar } from "components/TopNavBar";
import { Analytics } from "@vercel/analytics/react";
import AuthContainer from "auth";
import { Provider } from "react-redux";
import store from './lib/reduxStoreAuthContainer'
// import { useEffect, useState } from "react";

export const metadata = {
  title: "ResumeKerek - Конструктор резюме",
  description:
    "Создание и импорт резюме для последующей печати на A4 и Letter",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // const [open, setOpen] = useState(false)

  // useEffect(() => {
  //   return () => {
  //     // Пустой эффект для активации прагмы "useClient".
  //   };
  // }, []);

  return (

    <html lang="en">
      <body>
        {/* <Provider store={store}> */}
        <TopNavBar />
        {/* </Provider> */}
        {children}
        {/* <AuthContainer /> */}
        <Analytics />
      </body>
    </html>


  );
}
