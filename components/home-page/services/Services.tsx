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
      <h2 className="services__title">{t("services.Our Capabilities")}</h2>
      <ul className="services__info">
        <li className="services__item">
          <motion.div
            variants={slideUp}
            ref={description}
            animate={isInView ? "open" : "closed"}
            className="footer-element"
          >
            <h4 className="services__infoTitle">{t("services.Design")}</h4>
            <p className="services__infoText ">{t("services.From idea")}</p>
          </motion.div>
        </li>
        <li className="services__item">
          <motion.div
            variants={slideUp}
            ref={description2}
            animate={isInView2 ? "open" : "closed"}
            className="footer-element"
          >
            <h4 className="services__infoTitle">{t("services.Development")}</h4>
            <p className="services__infoText ">{t("services.High-class")}</p>
          </motion.div>
        </li>
        <li className="services__item">
          <motion.div
            ref={description3}
            variants={slideUp}
            animate={isInView3 ? "open" : "closed"}
            className="footer-element"
          >
            <h4 className="services__infoTitle">{t("services.Branding")}</h4>
            <p className="services__infoText">
              {t("services.Inspiring, functional")}
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
            <h4 className="services__infoTitle">{t("services.Marketing")}</h4>
            <p className="services__infoText">
              {t("services.Revolutionize your")}
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
                <p>{t("services.Read more")}</p>
              </RoundedButton>
            </NavLink>
          </motion.div>
        </li>
      </ul>
    </section>
  );
};

export default Services;
