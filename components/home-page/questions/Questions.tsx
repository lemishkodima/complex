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
      question: t("faq.item1.question"),
      answer: t("faq.item1.answer"),
    },
    {
      question: t("faq.item2.question"),
      answer: t("faq.item2.answer"),
    },
    {
      question: t("faq.item3.question"),
      answer: t("faq.item3.answer"),
    },
    {
      question: t("faq.item4.question"),
      answer: t("faq.item4.answer"),
    },
  ];
  return (
    <section className="questions container">
      <div className="questions__container">
        <h3 className="questions__title">
          {t("faq.hero.youHavePrefix")}
          <span className="questions__title--accent">
            {t("faq.hero.questionsWord")}
          </span>
          .
          <br/>
          {t("faq.hero.weHavePrefix")}
          <span className="questions__title--accent">
            {t("faq.hero.answersWord")}
          </span>
          .
        </h3>
      </div>
      <AccordionComponent questions={mockQuestions}/>
    </section>
  );
};

export default Questions;
