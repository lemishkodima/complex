"use client";
import React, { useEffect, useRef, useState } from "react";
import "./cta.scss";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ParallaxText from "@/components/ui/scroll-carousel/ScrollableCarousel";
import NavLink from "@/components/ui/nav-link/NavLink";
import { useMyContext } from "@/providers/CursorProvide";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";
import { slideUp } from "@/components/shared/footer/animations";

const Cta = () => {
  const { setHoverCursor } = useMyContext();
  const { t } = useTranslation("translation");
  const description = useRef(null);
  const isInView = useInView(description);
  const phrase = t("common.cta.rebootIntro");
  return (
    <section className="cta">
      <div className="container">
        <div className="cta__container ">
          <Link className="cta__link" href="/contact">
            <ArrowForwardIcon className="cta__icon" />
            <p ref={description} className="cta__text">
              {phrase.split(" ").map((word, index) => {
                return (
                  <span
                    className="relative overflow-hidden inline-flex"
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
            </p>
          </Link>
        </div>
      </div>
      <div
        //@ts-ignore
        onMouseEnter={() => setHoverCursor(true)}
        //@ts-ignore
        onMouseLeave={() => setHoverCursor(false)}
      >
        <ParallaxText baseVelocity={-2}>
          <NavLink href="/contact" arrow={false} classes="text__medium-80">
            {t("common.cta.getInTouch")}
          </NavLink>
        </ParallaxText>
      </div>
      {/* <DynamicScrollableCarousel /> */}
    </section>
  );
};
2
export default Cta;
