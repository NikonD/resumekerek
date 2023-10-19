import { useTranslation } from "react-i18next";
import Image from "next/image";
export const Steps = () => {
  const { t } = useTranslation()
  const STEPS = [
    { title: "Выберите шаблон", text: "10+ шаблонов", icon: "fa-solid fa-images fa-2xl mb-5" },
    { title: "Введите свои данные", text: "и сохраните изменения", icon: "fa-solid fa-keyboard fa-2xl mb-5" },
    { title: "Экспортируйте свое резюме", text: "нажмите Сохраниить", icon: "fa-solid fa-download fa-2xl mb-5" },
  ];
  return (
    <section className="mx-auto mt-10 rounded-2xl bg-sky-50 bg-dot px-8 pb-12 pt-10 ">
      <h1 className="text-center text-3xl font-bold mb-[3rem]">3 Простых шага</h1>
      <div className="mt-8 flex justify-center">
        <dl className="flex flex-col gap-y-10 lg:flex-row lg:justify-center lg:gap-x-20">
          {STEPS.map(({ title, text, icon }, idx) => (
            <div className="lg:w-[33%]  w-full text-center relative self-start flex flex-col gap-1 justify-items-center items-center" key={idx}>
              {/* <Image src="https://cdn-blog.novoresume.com/articles/resume-examples/resume-example.webp" alt="image" width="100" height="100" /> */}
              <i className={icon}></i>
              <dt className="text-lg font-bold">
                {title}
              </dt>
              <dd>{text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
