"use client";
import NavLink from "@/components/ui/nav-link/NavLink";
import { useEffect, useRef, useState } from "react";
import AddressLinks from "../adress-links/AddressLinks";
import SocialLinks from "../social-links/SocialLinks";
import "./mobilenavbar.scss";
import clsx from "clsx";
import gsap from "gsap";
import { useTranslation } from "react-i18next";

const MobileNavbar = () => {
  const btnRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const elementsToAnimate = useRef<any>([]);
  const elementsToOpacity = useRef<any>([]);
  const menuRef = useRef<any>(null);
  const menuTextRef = useRef<any>(null);
  const { t } = useTranslation("home");
  useEffect(() => {
    // const tl = gsap.timeline({ defaults: { ease: "easeInOut" } });
    if (initialRender) {
      setInitialRender(false);
      return;
    }
    if (menuOpen) {
      // Simultaneous animations for menu items
      elementsToAnimate.current.forEach((element: any, index: number) => {
        gsap.fromTo(
          element,
          { translateY: 100 },
          {
            translateY: 0,
            duration: 0.5,
            delay: 0.1 * index + 0.1,
          }
        );
      });
      document.body.style.overflow = "hidden";

      elementsToOpacity.current.forEach((element: any) => {
        gsap.fromTo(
          element,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.7,
            delay: 0.5,
          }
        );
      });

      gsap.fromTo(
        menuRef.current,
        { height: 0 },
        {
          height: "100vh",
          duration: 0.3,
        }
      );
    } else {
      document.body.style.overflow = "auto";
      // Simultaneous animations for menu items
      elementsToAnimate.current.forEach((element: any, index: number) => {
        gsap.fromTo(
          element,
          { translateY: 0 },
          {
            translateY: -100,
            duration: 0.5,
            delay: 0.05 * index + 0.05,
          }
        );
      });

      elementsToOpacity.current.forEach((element: any) => {
        gsap.fromTo(
          element,
          { opacity: 1 },
          {
            opacity: 0,
            duration: 0.5,
          }
        );
      });

      // Simultaneous animation for the menu itself
      gsap.fromTo(
        menuRef.current,
        { height: "100vh" },
        {
          height: 0,
          duration: 0.5,
          delay: 0.3,
        }
      );
    }
  }, [menuOpen]);

  const toggleMenu = () => {
    if (menuOpen) {
      gsap.fromTo(
        menuTextRef.current,
        { translateY: 0 },
        {
          translateY: -16,
          duration: 0.2,
        }
      );
    } else {
      gsap.fromTo(
        menuTextRef.current,
        { translateY: -16 },
        {
          translateY: 0,
          duration: 0.2,
        }
      );
    }
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className="relative max-sm:h-5 max-sm:w-5 lg:hidden">
        <button
          className="flex-center gap-5 z-20"
          ref={btnRef}
          onClick={toggleMenu}
        >
          <div className="overflow-hidden h-4">
            <div
              ref={menuTextRef}
              className="flex flex-col  uppercase max-sm:hidden "
            >
              <span className="text__button">
                {menuOpen ? "Close" : "Menu"}
              </span>
              <span className="text__button">Menu</span>
            </div>
          </div>
          <div className="relative h-[14px] w-[16px] mb-0.5">
            <div>
              <div
                className={clsx(
                  "absolute top-0 w-full origin-top-left border-2 border-platinum transition-transform duration-500",
                  {
                    "rotate-45": menuOpen,
                  }
                )}
              ></div>
            </div>
            <div
              className={clsx(
                "absolute bottom-0 w-full origin-bottom-left border-2 border-platinum transition-transform duration-500 ",
                { "-rotate-45": menuOpen }
              )}
            ></div>
          </div>
        </button>
      </div>
      <div
        ref={menuRef}
        className={clsx(
          "left-0 right-0 bg-dark top-[130px] h-0 overflow-hidden fixed flex flex-col z-50 !bottom-0"
        )}
      >
        <div className="overflow-hidden px-10 pt-10">
          <div
            ref={(el) => (elementsToAnimate.current[0] = el)}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <NavLink
              classes={clsx(
                "w-fit text__medium-60 uppercase mb-10  max-sm:mb-5 max-sm:text__medium-40 sm:mb-5"
              )}
              arrow={false}
              href="/projects"
              swapAnimation
            >
              {t("home.nav.services")}
            </NavLink>
          </div>
        </div>
        <div className="px-10 overflow-hidden">
          <div
            ref={(el) => (elementsToAnimate.current[1] = el)}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <NavLink
              classes={clsx(
                "w-fit text__medium-60 uppercase mb-10  max-sm:mb-5 max-sm:text__medium-40 sm:mb-5"
              )}
              arrow={false}
              href="/about"
              swapAnimation
            >
              {t("home.nav.about")}
            </NavLink>
          </div>
        </div>
        <div className="px-10 overflow-hidden">
          <div
            className=""
            ref={(el) => (elementsToAnimate.current[2] = el)}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <NavLink
              classes="w-fit text__medium-40 uppercase max-sm:text__medium-20 "
              color="text-gold"
              href="/contact"
              swapAnimation
            >
              {t("home.nav.reservation")}
            </NavLink>
          </div>
        </div>

        <div
          ref={(el) => (elementsToOpacity.current[0] = el)}
          className="px-10 "
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <SocialLinks classes="mt-20" />
        </div>
        <div className="mt-auto mb-[15vh]">
          <div
            ref={(el) => (elementsToOpacity.current[1] = el)}
            className="px-10 "
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <AddressLinks classes="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavbar;
