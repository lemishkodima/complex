"use client";
import Cta from "@/components/home-page/cta/Cta";
import Questions from "@/components/home-page/questions/Questions";
import Privacy from "@/components/privacy/Privacy";
import { pageTransitionOut } from "@/components/shared/transition-page/animations";
import React, { useEffect } from "react";

const page = () => {
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
      <div className="container">
        <Privacy />
        <Questions />
      </div>
      <Cta />
    </main>
  );
};

export default page;
