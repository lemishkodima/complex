"use client";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import clsx from "clsx";
import { useMyContext } from "@/providers/CursorProvide";
import { useRef } from "react";
import RoundedBtn from "@/components/ui/rounded-btn/RoundedBtn";

const SwiperInfoProject = () => {
  const { setHoverCursor } = useMyContext();
  const swiperRef = useRef(null);
  const imagesSrc = [
    "/assets/images/project-1.png",
    "/assets/images/project-2.png",
    "/assets/images/project-3.png",
    "/assets/images/project-4.png",
    "/assets/images/project-5.png",
    "/assets/images/project-6.png",
  ];
  const nextSlide = () => {
    //@ts-ignore
    swiperRef.current?.swiper.slideNext();
  };

  const prevSlide = () => {
    //@ts-ignore
    swiperRef.current?.swiper.slidePrev();
  };

  return (
    <div className="relative">
      <div className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 md:hidden">
        <RoundedBtn revert onCLick={prevSlide} />
      </div>
      <div className="max-md:p-10">
        <Swiper
          ref={swiperRef}
          breakpoints={{
            "768": { slidesPerView: 2.5, spaceBetween: 60 },
            "1280": { slidesPerView: 2.5, spaceBetween: 80 },
          }}
          slidesPerView={1}
          spaceBetween={0}
          centeredSlides
          loop
          className="my-[60px] lg:my-20"
        >
          {imagesSrc.map((src, i) => {
            return (
              <SwiperSlide key={i}>
                {({ isActive, isPrev }) => (
                  <div
                    onClick={() => (isPrev ? prevSlide() : nextSlide())}
                    onMouseEnter={() =>
                      setHoverCursor(
                        true,
                        !isPrev ? "rotate-45" : "-rotate-[135deg]"
                      )
                    }
                    onMouseLeave={() => setHoverCursor(false)}
                    className={clsx(
                      "w-full max-w-[513px] md:h-[340px] xl:h-[400px] h-[200px] relative  cursor-none mx-auto transition-opacity duration-500",
                      {
                        "!opacity-40": !isActive,
                      }
                    )}
                  >
                    <Image className="object-cover" fill alt={src} src={src} />
                  </div>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 md:hidden">
        <RoundedBtn onCLick={nextSlide} />
      </div>
    </div>
  );
};

export default SwiperInfoProject;
