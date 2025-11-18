"use client";
import "./about.scss";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import RoundedButton from "@/components/ui/rounded-btn2/RoundedButton";
import Image from "next/image";
import NavLink from "@/components/ui/nav-link/NavLink";
import { useTranslation } from "react-i18next";
import { slideUp } from "@/components/shared/footer/animations";

const About = () => {
  const { t } = useTranslation("home");
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(
    scrollYProgress,
    // Map x from these values:
    [0, 1],
    // Into these values:
    ["-0%", "-25%"]
  );
  const [_, set_] = useState(false);
  useEffect(() => {
    set_(true);
  }, []);
  const phrase = t("about.title");
  const description = useRef(null);
  const description2 = useRef(null);
  const description3 = useRef(null);
  const description4 = useRef(null);
  const isInView = useInView(description);
  const isInView2 = useInView(description2);
  const isInView3 = useInView(description3);
  const isInView4 = useInView(description4);
  return (
    <section id="about" className="about ">
      <div className="container">
        <h2 ref={description} className="about__title ">
          {phrase.split(" ").map((word, index) => {
            return (
              <span
                className="relative overflow-hidden inline-flex lg:ml-4 ml-2"
                key={index}
              >
                <motion.span
                  variants={slideUp}
                  custom={index}
                  animate={isInView ? "open" : "closed"}
                  key={index}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </h2>
        <div className="about__info">
          <motion.div
            ref={description2}
            variants={slideUp}
            animate={isInView2 ? "open" : "closed"}
            className="footer-element"
          >
            <p className="about__infoText mb-[25px]">{t("about.We believe")}</p>
          </motion.div>
          <motion.div
            ref={description3}
            variants={slideUp}
            animate={isInView3 ? "open" : "closed"}
            className="footer-element"
          >
            <p className="about__infoText  mb-[25px]">{t("about.We thrive")}</p>
          </motion.div>
          <motion.div
            ref={description4}
            variants={slideUp}
            animate={isInView4 ? "open" : "closed"}
            className="footer-element"
          >
            <p className="about__infoText mb-10">
              {t("about.Your satisfaction")}
            </p>
          </motion.div>
          <NavLink href="/about" arrow={false}>
            <RoundedButton>
              <p> {t("about.More About Us")}</p>
            </RoundedButton>
          </NavLink>
        </div>
      </div>
      <div className="overflow-hidden about__imgContainer">
        <motion.div
          className="h-[125%] relative"
          ref={container}
          style={{ translateY: translateY }}
        >
          <Image
            className="object-cover object-center w-full absolute"
            src="/assets/images/we_2.png"
            fill
            alt="We"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
