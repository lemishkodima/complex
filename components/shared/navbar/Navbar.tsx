"use client";
import "./navbar.scss";
import Image from "next/image";
import NavLink from "@/components/ui/nav-link/NavLink";
import MobileNavbar from "../mobile-navbar/MobileNavbar";
import dynamic from "next/dynamic";
import LanguageSwitcher from "../language-swither/LanguageSwitcher";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useTranslation } from "react-i18next";

const DynamicClock = dynamic(() => import("@/components/ui/clock/Clock"), {
  loading: () => (
    <div className="rounded-[50px] border border-platinum-10 px-5 py-2.5  text-center">
      12:01 PM
    </div>
  ),
  ssr: false,
});

const Navbar = () => {
  const navbarRef = useRef<any>(null);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const { t } = useTranslation("home");
  useEffect(() => {
    const navbar = navbarRef.current;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos > prevScrollPos) {
        // Scrolling down
        gsap.to(navbar, {
          translateY: -navbar.offsetHeight,
          duration: 0.5,
          ease: "power2.out",
        });
      } else {
        // Scrolling up
        gsap.to(navbar, { translateY: 0, duration: 0.5, ease: "power2.out" });
      }

      setPrevScrollPos(currentScrollPos);
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <header
      ref={navbarRef}
      className="bg-dark"
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 5,
      }}
    >
      <nav className="nav container">
        <div className="nav__container">
          <NavLink href="/" arrow={false}>
            <Image
              width={136}
              height={96}
              src="/assets/icons/Logo.svg"
              alt="logo"
            />
          </NavLink>
          <DynamicClock classes="max-sm:hidden max-lg:ml-[177px]" />
          <div className="nav__links">
            <NavLink swapAnimation arrow={false} href="/projects">
              {t("home.nav.services")}
            </NavLink>
            <NavLink swapAnimation arrow={false} href="/about">
              {t("home.nav.about")}
            </NavLink>
            <NavLink swapAnimation href="/contact" color="text-gold">
              {t("home.nav.reservation")}
            </NavLink>
          </div>

          <LanguageSwitcher classes="lg:m-0 xl:mr-0 max-lg:ml-[84px] max-lg:mr-auto max-sm:ml-auto max-sm:mr-[54px]" />
          <div className="lg:hidden max-sm:pr-5">
            <MobileNavbar />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
