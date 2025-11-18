"use client";
import Cta from "@/components/home-page/cta/Cta";
import Portfolio from "@/components/projects-page/portfolio/Portfolio";
import ProjectsHero from "@/components/projects-page/projects-hero/ProjectsHero";
import { pageTransitionOut } from "@/components/shared/transition-page/animations";
import dynamic from "next/dynamic";
import { useEffect } from "react";
const DynamicPortfolio = dynamic(
  () => import("@/components/projects-page/portfolio/Portfolio"),
  {
    loading: () => <div className="h-[100px]"></div>,
    ssr: false,
  }
);
export default function Projects() {
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
      <ProjectsHero />
      <DynamicPortfolio />
      <Cta />
    </main>
  );
}
