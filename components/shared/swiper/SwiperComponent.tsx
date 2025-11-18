"use client";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import clsx from "clsx";
import { useMyContext } from "@/providers/CursorProvide";
import { useRef } from "react";
import RoundedBtn from "@/components/ui/rounded-btn/RoundedBtn";
import { useTranslation } from "react-i18next";

const SwiperComponent = () => {
  const { t } = useTranslation("about");
  const { setHoverCursor } = useMyContext();
  const swiperRef = useRef(null);

  const nextSlide = () => {
    //@ts-ignore
    swiperRef.current?.swiper.slideNext();
  };

  const prevSlide = () => {
    //@ts-ignore
    swiperRef.current?.swiper.slidePrev();
  };

  return (
    <section className="py-[60px] lg:py-20 px-5 md:px-0 md:pl-10 lg:pl-20">
      <div className="w-full max-w-[630px] md:ml-[50%] md:pr-10 lg:pr-20 mb-[60px] lg:mb-20">
        <h4 className="text__medium-20">{t("Our best advertising")}</h4>
      </div>
      <div className="md:hidden mb-10 flex gap-5">
        <RoundedBtn revert onCLick={prevSlide} />
        <RoundedBtn onCLick={nextSlide} />
      </div>
      <Swiper
        ref={swiperRef}
        breakpoints={{
          "320": { slidesPerView: 1, spaceBetween: 100 },
          "768": { slidesPerView: 1.5, spaceBetween: 100 },
          "1280": { slidesPerView: 1.5, spaceBetween: 200 },
        }}
        loop
      >
        {Array.from({ length: 10 }, () => 0).map((k, i) => {
          return (
            <SwiperSlide key={i}>
              {({ isActive }) => (
                <div
                  onClick={() => (isActive ? prevSlide() : nextSlide())}
                  onMouseEnter={() =>
                    setHoverCursor(
                      true,
                      !isActive ? "rotate-45" : "-rotate-[135deg]"
                    )
                  }
                  onMouseLeave={() => setHoverCursor(false)}
                  className={clsx(
                    "w-full  opacity-100 transition-opacity duration-700 cursor-none",
                    {
                      "!opacity-40": !isActive,
                    }
                  )}
                >
                  <p className="text__regular-30  normal-case mb-20">
                    {t("I am pleased")}
                  </p>
                  <div className="flex gap-5 items-center">
                    <Image
                      className="rounded-full w-16 h-16 object-cover"
                      src="/assets/images/person.png"
                      width={64}
                      height={64}
                      alt="person-photo"
                    />
                    <div>
                      <p className="text__medium-20">Анастасія</p>
                      <p className="text__medium-20 text-silver">
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default SwiperComponent;
