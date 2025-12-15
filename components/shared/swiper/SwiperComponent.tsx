// components/about-page/swiper/SwiperComponent.tsx (або твій шлях)
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";
import clsx from "clsx";
import { useMyContext } from "@/providers/CursorProvide";
import { useEffect, useRef, useState } from "react";
import RoundedBtn from "@/components/ui/rounded-btn/RoundedBtn";
import { useTranslation } from "react-i18next";
import type { TestimonialDTO as Testimonial } from "@/app/api/testimonials/route";

const SwiperComponent = () => {
  const { t, i18n } = useTranslation("about");
  const { setHoverCursor } = useMyContext();
  const swiperRef = useRef<any>(null);

  const [items, setItems] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const nextSlide = () => {
    swiperRef.current?.swiper?.slideNext();
  };

  const prevSlide = () => {
    swiperRef.current?.swiper?.slidePrev();
  };

  // 🔹 Тягнемо відгуки з нашого API (який ходить в Strapi)
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const locale = i18n.language || "uk";
        const res = await fetch(`/api/testimonials?locale=${locale}`);
        if (!res.ok) {
          console.error("Failed to load testimonials", res.status);
          setIsLoading(false);
          return;
        }
        const data: Testimonial[] = await res.json();
        setItems(data);
      } catch (e) {
        console.error("Error fetching testimonials", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, [i18n.language]);

  return (
    <section className="py-[60px] lg:py-20 px-5 md:px-0 md:pl-10 lg:pl-20">
      <div className="w-full max-w-[630px] md:ml-[50%] md:pr-10 lg:pr-20 mb-[60px] lg:mb-20">
        <h4 className="text__medium-20">
          {t("about.testimonials.sectionIntro")}
        </h4>
      </div>

      {/* Мобільні кнопки навігації */}
      <div className="md:hidden mb-10 flex gap-5">
        <RoundedBtn revert onCLick={prevSlide} />
        <RoundedBtn onCLick={nextSlide} />
      </div>

      {isLoading && (
        <p className="text__medium-14 opacity-60 mb-6">
          {t("about.testimonials.loading", "Завантажуємо відгуки...")}
        </p>
      )}

      {!isLoading && items.length === 0 && (
        <p className="text__medium-14 opacity-60 mb-6">
          {t(
            "about.testimonials.empty",
            "Поки що немає відгуків. Незабаром вони з’являться!"
          )}
        </p>
      )}

      {items.length > 0 && (
        <Swiper
          ref={swiperRef}
          breakpoints={{
            "320": { slidesPerView: 1, spaceBetween: 100 },
            "768": { slidesPerView: 1.5, spaceBetween: 100 },
            "1280": { slidesPerView: 1.5, spaceBetween: 200 },
          }}
          loop
        >
          {items.map((item, i) => (
            <SwiperSlide key={item.id ?? i}>
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
                    "w-full opacity-100 transition-opacity duration-700 cursor-none",
                    {
                      "!opacity-40": !isActive,
                    }
                  )}
                >
                  <p className="text__regular-30 normal-case mb-20">
                    {item.text}
                  </p>
                  <div className="flex gap-5 items-center">
                    <Image
                      className="rounded-full w-16 h-16 object-cover"
                      src={item.avatarUrl || "/assets/images/person.png"}
                      width={64}
                      height={64}
                      alt={item.alt || item.name}
                    />
                    <div>
                      <p className="text__medium-20">{item.name}</p>
                      {item.role && (
                        <p className="text__medium-20 text-silver">
                          {item.role}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default SwiperComponent;
