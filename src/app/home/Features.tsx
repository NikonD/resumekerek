import Image from "next/image";
import featureFreeSrc from "public/assets/feature-free.svg";
import featureUSSrc from "public/assets/feature-us.svg";
import featurePrivacySrc from "public/assets/feature-privacy.svg";
import featureOpenSourceSrc from "public/assets/feature-open-source.svg";
import { Link } from "components/documentation";
import Clock from 'public/assets/Clock.svg'
import DetailsPage from 'public/assets/DetailsPage.svg'
import File from 'public/assets/File.svg'
import ApplicationModule from 'public/assets/ApplicationModule.svg'


const FEATURES = [
  {
    src: featureFreeSrc,
    title: "Free Forever",
    text: "ResumeKerek is created with the belief that everyone should have free and easy access to a modern professional resume design",
  },
  {
    src: featureUSSrc,
    title: "U.S. Best Practices",
    text: "ResumeKerek has built-in best practices for the U.S. job market and works well with top ATS platforms such as Greenhouse and Lever",
  },
  {
    src: featurePrivacySrc,
    title: "Privacy Focus",
    text: "ResumeKerek stores data locally in your browser so only you have access to your data and with complete control",
  },
];

export const Features = () => {
  return (
    <section className="py-16 lg:py-36">
      <div className="mx-auto lg:max-w-4xl">
        {/* <dl className="grid grid-cols-1 justify-items-center gap-y-8 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-16"> */}
          {/* {FEATURES.map(({ src, title, text }) => (
            <div className="px-2" key={title}>
              <div className="relative w-96 self-center pl-16">
                <dt className="text-2xl font-bold">
                  <Image
                    src={src}
                    className="absolute left-0 top-1 h-12 w-12"
                    alt="Feature icon"
                  />
                  {title}
                </dt>
                <dd className="mt-2">{text}</dd>
              </div>
            </div>
          ))} */}
        {/* </dl> */}

        <div className="flex flex-col-2 gap-6 ">
<div className="flex flex-col gap-4">
<h3 className=" text-2xl font-semibold">Преимущества</h3>
<span className=" text-base text-[rgba(0, 0, 0, 0.45)]">
Сервис обеспечивает простоту и удобство в создании профессиональных резюме, предлагая шаблоны и инструменты для структурирования информации. 
Сервисы  содержат подсказки и рекомендации по форматированию и содержанию, помогая Вам выделить свои навыки, образование и опыт работы наилучшим образом
</span>
</div>

<div className="flex flex-row gap-8 items-start">
<div  className="flex flex-col gap-2">
<div className=" h-20">
<Image src={ApplicationModule} alt={""} width={80} height={80}/>
</div>
<span>
Готовые шаблоны
</span>
</div>
<div className="flex flex-col gap-2">
<div className=" h-20">
<Image src={DetailsPage} alt={""} width={80} height={80} />
</div>
<span>
Простой интерфейс
</span>
</div>
<div className="flex flex-col gap-2">
<div className=" h-20">
<Image src={Clock} alt={""} width={80} height={80} />
</div>
<span>
Вечный доступ
</span>
</div>
<div className="flex flex-col gap-2">
<div className=" h-20">
<Image src={File} alt={""} width={80} height={80} />
</div>
<span>
PDF формат
</span>
</div>

</div>
        </div>
      </div>
    </section>
  );
};
