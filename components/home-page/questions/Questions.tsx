import AccordionComponent from "@/components/ui/accordion/AccordionComponent";
import "./questions.scss";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

const Questions = () => {
  const [_, set_] = useState(false);
  useEffect(() => {
    set_(true);
  }, []);
  const { t } = useTranslation("translation");
  const mockQuestions = [
    {
      question: t("questions.HOW MUCH DOES CREATING A WEBSITE COST"),
      answer: t("questions.Outsourcing website development"),
    },
    {
      question: t("questions.WHAT WILL BE REQUIRED"),
      answer: t("questions.Explain your business"),
    },
    {
      question: t("questions.HOW MUCH IS POST-DEVELOPMENT"),
      answer: t("questions.The cost of support"),
    },
    {
      question: t("questions.DO YOU PROVIDE SMM"),
      answer: t("questions.Yes, this is one of our specialties."),
    },
  ];
  return (
    <section className="questions container">
      <div className="questions__container">
        <h3 className="questions__title">
          {t("questions.You have")}
          <span className="questions__title--accent">
            {t("questions.Questions")}
          </span>
          .
          <br/>
          {t("questions.We have")}
          <span className="questions__title--accent">
            {t("questions.Answers")}
          </span>
          .
        </h3>
      </div>
      <AccordionComponent questions={mockQuestions}/>
    </section>
  );
};

export default Questions;
