import "globals.css";
import { Analytics } from "@vercel/analytics/react";
import { i18n } from "next-i18next";

// import { useEffect, useState } from "react";

export const metadata = {
  title: "ResumeKerek - Конструктор резюме",
  description: "Создание и импорт резюме для последующей печати на A4 и Letter",
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
        {children}
        <Analytics />
      </body>
    </html>


  );
}
