import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const scrollTo = (elementId: string, duration = 1.5) => {
  const element = document.getElementById(elementId) || "";
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  gsap.to(window, {
    duration: duration,
    scrollTo: { y: element },
    ease: "power2.inOut",
    // onComplete: () => {
    //   window.scrollTo(0, 0); // Ensure the final position is set to (0, 0)
    // },
  });
};
