import Link from "next/link";
import { FlexboxSpacer } from "components/FlexboxSpacer";
import { AutoTypingResume } from "home/AutoTypingResume";
import { useTranslation } from "react-i18next";

export const Hero = () => {

  const { t } = useTranslation()

  return (
    <section className="lg:flex lg:h-[825px] lg:justify-center">

      <FlexboxSpacer maxWidth={75} minWidth={0} className="hidden lg:block" />

      <div className="mx-auto max-w-xl pt-8 text-center lg:mx-0 lg:grow lg:pt-15 lg:text-left">
        <h1 className="text-primary pb-2 text-4xl mb-20 font-bold lg:text-5xl">
          Resume Kerek
        </h1>
        <h1  className=" text-primary pb-2 text-4xl lg:pt-15 font-bold lg:text-5xl">
          {t("h1-title")}
          <br />
          {t("h1-subtitle")}
        </h1>
        <p className="mt-3 text-lg lg:mt-5 lg:text-xl">

        </p>
        <Link href="/resume-builder" className="btn-primary mt-6 lg:mt-14">
          {t("start")} <span aria-hidden="true">→</span>
        </Link>
      </div>
      <FlexboxSpacer maxWidth={100} minWidth={50} className="hidden lg:block" />
      <div className="mt-6 flex justify-center lg:mt-4 lg:block lg:grow">
        {/* <AutoTypingResume /> */}
      </div>
    </section>
  );
};
