"use client";

import "./about.scss";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import RoundedButton from "@/components/ui/rounded-btn2/RoundedButton";
import Image from "next/image";
import NavLink from "@/components/ui/nav-link/NavLink";
import { useTranslation } from "react-i18next";
import { slideUp } from "@/components/shared/footer/animations";
import type { BannerDTO } from "@/app/api/banners/route";

const About = () => {
  const { t, i18n } = useTranslation("home");

  // scroll / parallax
  const container = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], ["-0%", "-25%"]);

  const phrase = t("home.about.title");

  // анімації тексту
  const description = useRef<HTMLHeadingElement | null>(null);
  const description2 = useRef<HTMLDivElement | null>(null);
  const description3 = useRef<HTMLDivElement | null>(null);
  const description4 = useRef<HTMLDivElement | null>(null);

  const isInView = useInView(description);
  const isInView2 = useInView(description2);
  const isInView3 = useInView(description3);
  const isInView4 = useInView(description4);

  // 🔹 банер з Strapi
  const [banner, setBanner] = useState<BannerDTO | null>(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const locale = i18n.language || "uk";
        const res = await fetch(
        `/api/banners?key=home-about&locale=${locale}`
        );

        if (!res.ok) {
          console.error("[About] Failed to load banner", res.status);
          return;
        }

        const data: BannerDTO[] = await res.json();
        setBanner(data[0] || null);
      } catch (e) {
        console.error("[About] Error fetching banner:", e);
      }
    };

    fetchBanner();
  }, [i18n.language]);

  // ❗ без локального fallback – якщо банера немає, картинку просто не рендеримо
  const bannerSrc = banner?.imageUrl ?? null;
  const bannerAlt = banner?.alt || "About hero";

  return (
    <section id="about" className="about ">
      <div className="container">
        <h2 ref={description} className="about__title ">
          {phrase.split(" ").map((word, index) => (
            <span
              className="relative overflow-hidden inline-flex lg:ml-4 ml-2"
              key={index}
            >
              <motion.span
                variants={slideUp}
                custom={index}
                animate={isInView ? "open" : "closed"}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h2>

        <div className="about__info">
          <motion.div
            ref={description2}
            variants={slideUp}
            animate={isInView2 ? "open" : "closed"}
            className="footer-element"
          >
            <p className="about__infoText mb-[25px]">
              {t("home.about.paragraph1")}
            </p>
          </motion.div>

          <motion.div
            ref={description3}
            variants={slideUp}
            animate={isInView3 ? "open" : "closed"}
            className="footer-element"
          >
            <p className="about__infoText mb-[25px]">
              {t("home.about.paragraph2")}
            </p>
          </motion.div>

          <motion.div
            ref={description4}
            variants={slideUp}
            animate={isInView4 ? "open" : "closed"}
            className="footer-element"
          >
            <p className="about__infoText mb-10">
              {t("home.about.paragraph3")}
            </p>
          </motion.div>

          <NavLink href="/about" arrow={false}>
            <RoundedButton>
              <p>{t("home.about.cta")}</p>
            </RoundedButton>
          </NavLink>
        </div>
      </div>

      <div className="overflow-hidden about__imgContainer">
        <motion.div
          className="h-[125%] relative"
          ref={container}
          style={{ translateY }}
        >
          {bannerSrc && (
            <Image
              className="object-cover object-center w-full absolute"
              src={bannerSrc}
              fill
              alt={bannerAlt}
              sizes="100vw"
            />
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
