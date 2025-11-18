import Image from "next/image";
import React, { useRef } from "react";
import SwiperInfoProject from "./SwiperInfo";
import RoundedButton from "@/components/ui/rounded-btn2/RoundedButton";
import { motion, useScroll, useTransform } from "framer-motion";

const ProjectInfo = () => {
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
    <section>
      <div className="my-[120px] lg:my-[160px] relative h-[932px] md:h-[1194px] lg:h-[1024px] overflow-hidden">
        <motion.div
          className="h-[125%] relative"
          ref={container}
          style={{ translateY: translateY }}
        >
          <Image
            className="object-cover h-[125%]  absolute"
            src="/assets/images/bank-of-america.png"
            fill
            alt="bank of america"
          />
        </motion.div>
      </div>
      <div className="container ">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:items-end">
          <RoundedButton classes="max-lg:order-2 w-fit">
            <p> Open Site</p>
          </RoundedButton>
          <p
            id="project-info"
            className="text__medium-20 w-full md:max-w-[624px]"
          >
            Bank of America is an American multinational investment bank and
            financial services company headquartered in Charlotte, with central
            hubs in New York City, London, Hong Kong, Minneapolis, and Toronto.
            This is our vision of how the website used by millions should look
            and feel. We made a visual and usability overhaul while keeping the
            structure mainly the same.
          </p>
        </div>
        <SwiperInfoProject />
        <div className="flex flex-col gap-[60px] lg:gap-20">
          <div className="relative h-[200px] md:h-[400px] xl:h-[700px]">
            <Image
              src="/assets/images/project-4.png"
              fill
              alt="/assets/images/project-4.png"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-5 ">
            <div className="relative h-[440px] xl:h-[720px]  md:w-1/2">
              <Image
                src="/assets/images/project-5.png"
                fill
                alt="/assets/images/project-5.png"
                className="object-cover"
              />
            </div>
            <div className="relative h-[440px] xl:h-[720px]  md:w-1/2">
              <Image
                src="/assets/images/project-6.png"
                fill
                alt="/assets/images/project-6.png"
                className="object-cover"
              />
            </div>
          </div>
          <div className="relative h-[200px] md:h-[400px] xl:h-[700px]">
            <Image
              src="/assets/images/project-7.png"
              fill
              alt="/assets/images/project-7.png"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectInfo;
