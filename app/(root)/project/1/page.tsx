"use client";
import Cta from "@/components/home-page/cta/Cta";
import ProjectHero from "@/components/project-component-page/project-hero/ProjectHero";
import ProjectInfo from "@/components/project-component-page/project-info/ProjectInfo";
import { pageTransitionOut } from "@/components/shared/transition-page/animations";
import React, { useEffect } from "react";

const Project = () => {
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
      <ProjectHero
        title="Bank of america"
        services={[
          "Redesign",
          "UI/UX Design",
          "Corporate Website",
          "BAck-end Development",
          "Front-end Development",
        ]}
        technology={["React", "NEXT.js", "Figma"]}
        client="Bank of america"
        year="2023"
      />
      <ProjectInfo />
      <Cta />
    </main>
  );
};

export default Project;
