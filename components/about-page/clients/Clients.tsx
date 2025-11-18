import Image from "next/image";
import "./client.scss";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Clients = () => {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".client",
        start: "top 90%",
        end: "bottom 40%",
      },
    });

    scrollTl.fromTo(
      ".client",
      { scale: 0 },
      { scale: 1, opacity: 1, stagger: { each: 0.1 }, duration: 0.5 }
    );
  }, []);
  return (
    <section className="mx-auto max-w-[1440px] py-[60px] lg:py-20 client container">
      {Array.from({ length: 10 }, () => 0).map((i, k) => {
        return (
          <div
            key={k}
            className="border aspect-square border-platinum-10 rounded-full  flex-center client"
          >
            <div className="relative w-16 h-16">
              <Image
                className="object-cover"
                src="/assets/images/client.png"
                fill
                alt="clients-img"
              />
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Clients;
