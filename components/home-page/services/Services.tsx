"use client";
import NavLink from "@/components/ui/nav-link/NavLink";
import "./services.scss";
import RoundedButton from "@/components/ui/rounded-btn2/RoundedButton";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { slideUp } from "@/components/shared/footer/animations";

const Services = () => {
  const { t } = useTranslation("home");
  const description = useRef(null);
  const description2 = useRef(null);
  const description3 = useRef(null);
  const description4 = useRef(null);
  const isInView = useInView(description);
  const isInView2 = useInView(description2);
  const isInView3 = useInView(description3);
  const isInView4 = useInView(description4);
  return (
    <section className="services container">
      <h2 className="services__title">{t("home.services.list.title")}</h2>
      <ul className="services__info">
        <li className="services__item">
          <motion.div
            variants={slideUp}
            ref={description}
            animate={isInView ? "open" : "closed"}
            className="footer-element"
          >
            <h4 className="services__infoTitle">{t("home.services.cards.accommodation.title")}</h4>
            <p className="services__infoText ">{t("home.services.cards.accommodation.text")}</p>
          </motion.div>
        </li>
        <li className="services__item">
          <motion.div
            variants={slideUp}
            ref={description2}
            animate={isInView2 ? "open" : "closed"}
            className="footer-element"
          >
            <h4 className="services__infoTitle">{t("home.services.cards.recovery.title")}</h4>
            <p className="services__infoText ">{t("home.services.cards.recovery.text")}</p>
          </motion.div>
        </li>
        <li className="services__item">
          <motion.div
            ref={description3}
            variants={slideUp}
            animate={isInView3 ? "open" : "closed"}
            className="footer-element"
          >
            <h4 className="services__infoTitle">{t("home.services.cards.activity.title")}</h4>
            <p className="services__infoText">
              {t("home.home.services.cards.activity.text")}
            </p>
          </motion.div>
        </li>
        <li className="services__item">
          <motion.div
            ref={description4}
            variants={slideUp}
            animate={isInView4 ? "open" : "closed"}
            className="footer-element"
          >
            <h4 className="services__infoTitle">{t("home.services.cards.comprehensive.title")}</h4>
            <p className="services__infoText">
              {t("home.services.cards.comprehensive.text")}
            </p>
          </motion.div>
        </li>
        <li className="services__item">
          <motion.div
            ref={description4}
            variants={slideUp}
            animate={isInView4 ? "open" : "closed"}
            className="footer-element"
          >
            <NavLink href="/about" arrow={false}>
              <RoundedButton>
                <p>{t("home.services.cards.readMoreCta")}</p>
              </RoundedButton>
            </NavLink>
          </motion.div>
        </li>
      </ul>
    </section>
  );
};

export default Services;
