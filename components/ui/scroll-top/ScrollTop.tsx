"use client";

import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const ScrollTop = ({ classes }: { classes: string }) => {
  const scrollToTop = () => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: 0 },
      ease: "power2.inOut",
      onComplete: () => {
        window.scrollTo(0, 0);
      },
    });
  };
  return (
    <button onClick={scrollToTop} className={classes}>
      <ArrowUpwardIcon className="h-4 w-4" />
    </button>
  );
};

export default ScrollTop;
