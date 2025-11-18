"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const AboutImage = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(
    scrollYProgress,
    // Map x from these values:
    [0, 1],
    // Into these values:
    ["-0%", "-25%"]
  );

  return (
    <div className="my-10 md:my-[60px] xl:my-20 h-[100vh] lg:h-[70vh] overflow-hidden">
      <motion.div
        className="h-[125%] relative"
        ref={container}
        style={{ translateY: translateY }}
      >
        <Image
          className="object-cover h-[125%] w-full absolute"
          src="/assets/images/we_1.png"
          fill
          alt="We"
        />
      </motion.div>
    </div>
  );
};

export default AboutImage;
