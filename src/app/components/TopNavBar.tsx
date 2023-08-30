"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logoSrc from "public/logo.svg";
import { cx } from "lib/cx";
import { Dispatch } from "@reduxjs/toolkit";
import { SetStateAction, useDebugValue, useEffect, useState } from "react";
import AuthContainer from "auth";
import useUser from "lib/useUser";
import UserDropDown from "./UserDropDown";
import { useSelector } from "react-redux";
import { loginUser, selectUser } from "lib/redux/loginSlice";
import axios from "axios";
import config from '../../../config/config.json'
import { useTranslation } from "react-i18next";
import i18n from 'i18next';
// import { i18n } from "next-i18next";


export const TopNavBar: React.FC = () => {


  const user = useSelector(selectUser)

  const [open, setOpen] = useState(false)
  const [isLanguageMenuOpen, setLanguageMenuOpen] = useState(false);



  const pathName = usePathname();
  const isHomePage = pathName === "/";
  
  const { t } = useTranslation()

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  
  return (

    <header
      aria-label="Site Header"
      className={cx(
        "flex h-[var(--top-nav-bar-height)] items-center border-b-2 border-gray-100 px-3 lg:px-12",
        isHomePage && "bg-dot"
      )}
    >
      <div className="flex h-10 w-full items-center justify-between">
        <Link href="/">
          <span className="">CV-resume</span>
          {/* <Image
            src={logoSrc}
            alt="OpenResume Logo"
            className="h-8 w-full"
            priority
          /> */}
        </Link>
        <nav
          aria-label="Site Nav Bar"
          className="flex items-center gap-2 text-sm font-medium"
        >

          <div className="relative"
            onMouseEnter={() => setLanguageMenuOpen(true)}
            onMouseLeave={() => setLanguageMenuOpen(false)}>
            <button

              className="rounded-md px-1.5 py-2 text-gray-500 hover:bg-gray-100 focus-visible:bg-gray-100 lg:px-4"
            >
              {t('lang')}
            </button>
            {isLanguageMenuOpen && (<ul style={{ zIndex: 888 }} className="absolute right-0 w-24 bg-white border border-gray-200 rounded-md shadow-lg divide-y divide-gray-200">
              <li>
                <button
                  className="w-full text-left px-3 py-2 hover:bg-gray-100"
                  onClick={() => changeLanguage('kz')}
                >
                  Қазақ
                </button>
              </li>

              <li>
                <button
                  className="w-full text-left px-3 py-2 hover:bg-gray-100"
                  onClick={() => changeLanguage('ru')}
                >
                  Русский
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left px-3 py-2 hover:bg-gray-100"
                  onClick={() => changeLanguage('ch')}
                >
                  中国人
                </button>
              </li>
            </ul>)}
          </div>



          {[
            ["/payment", t("payment")],
            ["/resume-builder", t("constructor")],
            ["/resume-profile", t("resumes")],
            // ["/login", "Войти"]
          ].map(([href, text]) => (
            <Link
              key={text}
              className="rounded-md px-1.5 py-2 text-gray-500 hover:bg-gray-100 focus-visible:bg-gray-100 lg:px-4"
              href={href}
            >
              {text}
            </Link>
          ))}
          {/* {user? */}
          <button key={"login"} onClick={() => { setOpen(open ? false : true) }} className="rounded-md px-1.5 py-2 text-gray-500 hover:bg-gray-100 focus-visible:bg-gray-100 lg:px-4">
            {user.islogin ? t("profile") : t("signin-label")}
          </button>
          {/* <UserDropDown/> */}
          {/* <div className="ml-1 mt-1">
            <iframe
              src="https://ghbtns.com/github-btn.html?user=xitanggg&repo=open-resume&type=star&count=true"
              width="100"
              height="20"
              className="overflow-hidden border-none"
              title="GitHub"
            />
          </div> */}
        </nav>
      </div>
      <AuthContainer user={user} open={open} setOpen={setOpen} />
    </header>

  );
};
