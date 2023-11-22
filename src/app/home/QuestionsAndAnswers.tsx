import { Collapse, ConfigProvider } from "antd";
import { Link } from "components/documentation";
import styles from '../faq.module.css';
import { useTranslation } from "react-i18next";

const QAS = [
  {
    question:
      "Q1. What is a resume builder? Why resume builder is better than resume template doc?",
    answer: (
      <>
        <p>
          There are two ways to create a resume today. One option is to use a
          resume template, such as an office/google doc, and customize it
          according to your needs. The other option is to use a resume builder,
          an online tool that allows you to input your information and
          automatically generates a resume for you.
        </p>
        <p>
          Using a resume template requires manual formatting work, like copying
          and pasting text sections and adjusting spacing, which can be
          time-consuming and error. It is easy to run into formatting
          issues, such as using different bullet points or font styles after
          copying and pasting. On the other hand, a resume builder like
          ResumeKerek saves time and prevents formatting mistakes by
          automatically formatting the resume. It also offers the convenience of
          easily changing font types or sizes with a simple click. In summary, a
          resume builder is easier to use compared to a resume template.
        </p>
      </>
    ),
  },
  {
    question:
      "Q2. What uniquely sets ResumeKerek apart from other resume builders and templates?",
    answer: (
      <>
        <p>
          Other than ResumeKerek, there are some great free resume builders out
          there, e.g. <Link href="https://rxresu.me/">Reactive Resume</Link>,{" "}
          <Link href="https://flowcv.com/">FlowCV</Link>. However, ResumeKerek
          stands out with 2 distinctive features:
        </p>{" "}
        <p>
          <span className="font-semibold">
            1. ResumeKerek is designed specifically for the U.S. job market and
            best practices.
          </span>
          <br />
          Unlike other resume builders that target a global audience and offer
          many customization options, ResumeKerek intentionally only offers
          options that are aligned with U.S. best practices. For example, it
          excludes the option to add a profile picture to avoid bias and
          discrimination. It offers only the core sections, e.g. profile, work
          experience, education, and skills, while omitting unnecessary sections
          like references. Additionally, ResumeKerek only offers a top down
          single column resume design as opposed to two column design, because
          single column design works best for AST. <br />{" "}
        </p>
        <p>
          <span className="font-semibold">
            2. ResumeKerek is super privacy focus.
          </span>{" "}
          <br />
          While other resume builders may require email sign up and store user
          data in their databases, ResumeKerek believes that resume data should
          remain private and accessible only on user’s local machine. Therefore,
          ResumeKerek doesn’t require sign up to use the app, and all inputted
          data is stored in user’s browser that only user has access to.
        </p>
      </>
    ),
  },
  
  {
    question: "Q4. How can I support ResumeKerek?",
    answer: (
      <>
        <p>
          The best way to support ResumeKerek is to share your thoughts and
          feedback with us to help further improve it. You can send us an email
          at{" "}
          <Link href="mailto:hello@example.com">email</Link>
        </p>
        <p>
          Another great way to support ResumeKerek is by spreading the words.
          Share it with your friends, on social media platforms, or with your
          school’s career center. Our goal is to reach more people who struggle
          with creating their resume, and your word-of-mouth support would be
          greatly appreciated.
        </p>
      </>
    ),
  },
];




export const QuestionsAndAnswers = () => {
  const { t } = useTranslation()


const items = [
  { 
  key: '1',
 label: t("h2-q-1"),
 children: <p>{t("h2-a-1")}</p> 
 }, {
  key: '2',
  label: t("h2-q-2"),
  children: <p>{t("h2-a-2")}</p> 
 }, 
 {
  key: '3',
  label: t("h2-q-3"),
  children: <p>{t("h2-a-3")}</p> 
 }, 
 ]

  return (
    <section className="mx-auto max-w-4xl divide-y divide-gray-300 lg:mt-4 lg:px-2">
      <h2 className="text-center text-2xl sm:text-3xl font-bold">
{t("h2-qas")}

        
        </h2>
      <div className="mt-6 divide-y divide-gray-300">
        {/* {QAS.map(({ question, answer }) => (
          <div key={question} className="py-6">
            <h3 className="font-semibold leading-7">{question}</h3>
            <div className="mt-3 grid gap-2 leading-7 text-gray-600">
              {answer}
            </div>
          </div>
        ))} */}
        <ConfigProvider
  theme={{
    components: {
      Collapse: {
        headerBg:"#722ED1",
        colorTextHeading: "#fff",
      },
    },
  }}
>
<Collapse
  className="max-w-4xl w-full text-lg"
  items={items}
      defaultActiveKey="1"
    />
</ConfigProvider>
        
      </div>
    </section>
  );
};
