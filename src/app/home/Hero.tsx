import Link from "next/link";
import { FlexboxSpacer } from "components/FlexboxSpacer";
import { AutoTypingResume } from "home/AutoTypingResume";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { transcode } from "buffer";


export const Hero = () => {
 
  const { t } = useTranslation()

  return (
    <section className="flex lg:h-[90vh] lg:justify-around flex-col lg:flex-row justify-between gap-3 my-[2rem]">

      {/* <FlexboxSpacer maxWidth={75} minWidth={0} className="hidden lg:block" /> */}

      <div className="max-w-[75vw] lg:max-w-[100%] mx-auto w-full lg:mx-0 lg:grow lg:pt-15 lg:text-left flex flex-col justify-center gap-3 lg:items-start items-center text-center lg:text-left">
        <h1 className="text-primary text-[1rem] font-bold lg:text-[5rem] leading-tight text-[7.5vw]">
          Resume Kerek
        </h1>
        <h1 className="max-w-[70%] lg:max-w-[100%] text-primary text-[0.5rem] lg:pt-15 lg:text-[2rem] leading-tight text-[3.2vw] text-center lg:text-left">
          {t("h1-title")} {t("h1-subtitle")}
        </h1>

        <Link href="/resume-builder" className="btn-primary w-[50%] lg:text-[1.5rem] lg:w-[150px] text-[3.2vw] lg:w-[150px] flex flex-row justify-center items-center p-3 ">
          {t("start")}
        </Link>
      </div>
      {/* <FlexboxSpacer maxWidth={100} minWidth={50} className="hidden lg:block" /> */}
      <div className=" flex justify-center lg:block flex-col items-center mt-[2rem]" style={{transform: 'scale3d(1.3, 1.1, 1) rotateX(8deg) rotateY(-33deg) rotateZ(8deg) skew(0deg, 0deg);'}}>
        
        <AutoTypingResume />
      </div>
    </section>
  );
};
