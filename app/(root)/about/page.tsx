"use client";
import AboutImage from "@/components/about-page/about-image/AboutImage";
import Clients from "@/components/about-page/clients/Clients";
import AboutHero from "@/components/about-page/hero-about/AboutHero";
import Cta from "@/components/home-page/cta/Cta";
import { pageTransitionOut } from "@/components/shared/transition-page/animations";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const DynamicSwiperComponent = dynamic(
  () => import("@/components/shared/swiper/SwiperComponent"),
  {
    loading: () => <div className="h-[100px]"></div>,
    ssr: false,
  }
);

const DynamicServices = dynamic(
  () => import("@/components/about-page/services-component/Services"),
  {
    loading: () => <div className="h-[100px]"></div>,
    ssr: false,
  }
);

export default function About() {
  useEffect(() => {
    setTimeout(() => {
      pageTransitionOut();
    }, 600);
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();

      setTimeout(() => {
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 2000);
    })();
  }, []);
  return (
    <main>
      <AboutHero />
      <AboutImage />
      <DynamicServices />
      <Clients />
      <DynamicSwiperComponent />
      <Cta />
    </main>
  );
}
