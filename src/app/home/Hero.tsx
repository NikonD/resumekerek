import Link from "next/link";
import { FlexboxSpacer } from "components/FlexboxSpacer";
import { AutoTypingResume } from "home/AutoTypingResume";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { transcode } from "buffer";
import Image from "next/image";
import { addSectionInForm } from "lib/redux/resumeSlice";
import Application from "public/assets/Application.svg";
import Document from "public/assets/Document.svg";
import Details from "public/assets/Details.svg";


export const Hero = () => {
 
  const { t } = useTranslation()

  return (

  <section>
        <div className="flex flex-col items-center gap-8 py-[5.875rem]">

    <div className="flex flex-col gap-2 items-center">
        <h1 className="text-black uppercase font-bold leading-tight text-5xl">
         {t("h1-subtitle")}
         </h1>
         <h1 className="text-[#722ED1] uppercase font-bold leading-tight text-5xl">
         за 5 минут
         </h1>
    </div>
            <div className="flex flex-col items-center">
              <div className="grid grid-cols-3 gap-[5rem] pt-8">
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-white rounded-full p-6 mb-8">
                    <Image
                    src={Application}
                      width={49}
                      height={48}
                      alt="Иконка лупы"
                    />
                  </div>
                  <h4 className="text-lg  text-black_100 font-semibold">
                  Выберите шаблон
                  </h4>
                  <span className="text-grey text-sm text-center">
                  10+ шаблонов
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-white rounded-full p-6 mb-8">
                    <Image
                    src={Details}
                      width={48}
                      height={48}
                      alt="Иконка аналитики"
                    />
                  </div>
                  <h4 className="text-lg text-black_100 font-semibold">
                  Введите свои данные
                  </h4>
                  <span className="text-grey text-sm text-center">
                  и сохраните изменения
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-white rounded-full p-6 mb-8">
                    <Image
                    src={Document}
                      width={49}
                      height={48}
                      alt="Иконка системного управления"
                    />
                  </div>
                  <h4 className="text-lg  text-black_100 font-semibold">
                  Экспортируйте резюме                  </h4>
                  <span className="text-grey text-sm text-center">
                  нажмите Сохранить
                  </span>
                </div>
              </div>
              <Link href="/resume-builder" className="mt-12 px-10 rounded-full text-xl py-2 text-white bg-[#722ED1] ">
           {t("start")}
         </Link>
            </div>
          </div>
  </section>
  //   <section className="flex lg:h-[90vh] lg:justify-around flex-col lg:flex-row justify-between gap-3 my-[2rem]">

  //     {/* <FlexboxSpacer maxWidth={75} minWidth={0} className="hidden lg:block" /> */}

  //     <div className="max-w-[75vw] lg:max-w-[80%] mx-auto w-full lg:mx-0 lg:grow lg:pt-15 flex flex-col justify-center gap-3  items-center text-center">
  //      <div className="flex flex-col gap-2 items-center">
  //       <h1 className="text-black uppercase font-bold lg:text-[5rem] leading-tight text-[7.5vw]">
  //       {t("h1-subtitle")}
  //       </h1>
  //       <h1 className="text-[#722ED1] uppercase font-bold lg:text-[5rem] leading-tight text-[7.5vw]">
  //       за 5 минут
  //       </h1>
  //      </div>
  //       {/* <h1 className="max-w-[70%] lg:max-w-[100%] text-primary text-[0.5rem] lg:pt-15 lg:text-[2rem] leading-tight text-[3.2vw] text-center lg:text-left">
  //         {t("h1-title")}
  //       </h1> */}

  //       <Link href="/resume-builder" className="btn-primary w-[50%] lg:text-[1.5rem] lg:w-[150px] text-[3.2vw] lg:w-[150px] flex flex-row justify-center items-center p-3 ">
  //         {t("start")}
  //       </Link>
  //     </div>
  //     {/* <FlexboxSpacer maxWidth={100} minWidth={50} className="hidden lg:block" /> */}
  //     {/* <div className=" flex justify-center lg:block flex-col items-center mt-[2rem] lg:mr-[3vw] relative " style={{transform: 'scale3d(1.3, 1.1, 1) rotateX(8deg) rotateY(-33deg) rotateZ(8deg) skew(0deg, 0deg); '}}>
        
  //       <AutoTypingResume />
  //       <Image src="/pen.png" width="200" height="600" alt="pen" className=" absolute lg:block hidden lg:top-[50%] top-[38%] lg:right-[-60px]  w-[60%] right-[-25%] md:w-[10%] lg:w-[70%]"/>
  //     </div> */}
  //   </section>
  );
};
