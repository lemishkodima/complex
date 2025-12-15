"use client";
import ScrollTop from "@/components/ui/scroll-top/ScrollTop";
import AddressLinks from "../adress-links/AddressLinks";
import SocialLinks from "../social-links/SocialLinks";
import "./footer.scss";
import { useRef } from "react";

import NavLink from "@/components/ui/nav-link/NavLink";
import { motion, useInView } from "framer-motion";
import { slideUp } from "./animations";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation("translation");
  const scrollContainerRef = useRef(null);
  const isInView = useInView(scrollContainerRef);

  return (
    <footer className="footer relative">
      <div className="container">
        <div className="footer__container ">
          <div ref={scrollContainerRef} className="w-1/2 max-md:w-full ">
            <motion.div
              variants={slideUp}
              animate={isInView ? "open" : "closed"}
            >
              <NavLink href="/contact" arrow={false}>
                <h5 className="!text__medium-20 max-w-[355px] max-lg:text-platinum text-dark max-md:mb-10 footer-element">
                  {t("common.cta.bookNow")}
                </h5>
              </NavLink>
            </motion.div>
          </div>
          <motion.div
            variants={slideUp}
            animate={isInView ? "open" : "closed"}
            className="footer-element"
          >
            <AddressLinks classes="mr-[140px] max-lg:hidden gap-5" isDark />
          </motion.div>
          <motion.div
            variants={slideUp}
            animate={isInView ? "open" : "closed"}
            className="footer-element"
          >
            <SocialLinks classes="max-lg:hidden gap-5" isDark />
          </motion.div>
          <motion.div
            variants={slideUp}
            animate={isInView ? "open" : "closed"}
            className="footer-element"
          >
            <AddressLinks classes="mr-16 lg:hidden gap-5 mb-10" />
          </motion.div>
          <motion.div
            variants={slideUp}
            animate={isInView ? "open" : "closed"}
            className="footer-element"
          >
            <SocialLinks classes="lg:hidden gap-5" />
          </motion.div>
        </div>

        <div className="footer__bottomContainer ">
          <p className="w-1/2 max-md:order-1 max-md:mt-10 max-md:w-full">
            © {new Date().getFullYear()}. SVAROG COMPLEX
          </p>
          <div className="flex w-1/2 max-md:w-full">
            <div className="mr-auto text__medium-14  flex gap-[108px] max-lg:gap-5  max-md:flex-col max-md:gap-2.5">
              <NavLink
                classes="!text-dark !hover:text-dark-10 max-lg:!text-platinum"
                arrow={false}
                href="/privacy"
              >
                Privacy Policy
              </NavLink>
              <NavLink
                classes="!text-dark !hover:text-dark-10 max-lg:!text-platinum"
                arrow={false}
                href="/privacy"
              >
                Cookie Policy
              </NavLink>
            </div>
            <ScrollTop classes="mb-1 ml-auto" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
