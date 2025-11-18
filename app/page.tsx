"use client";
import About from "@/components/home-page/about/About";
import Cta from "@/components/home-page/cta/Cta";
import Hero from "@/components/home-page/hero/Hero";
import Questions from "@/components/home-page/questions/Questions";
import Services from "@/components/home-page/services/Services";
import { pageTransitionOut } from "@/components/shared/transition-page/animations";
import { useEffect } from "react";

export default function Home() {
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
      <Hero />
      <About />
      <Services />
      <Questions />
      <Cta />
    </main>
  );
}
