"use client";
import "./services.scss";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import {
  brandingCategories,
  designCategories,
  developmentCategories,
  marketingCategories,
} from "@/lib/data";
import { useLayoutEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState("development");
  const { t } = useTranslation("about");
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".text-category",
        start: "top 90%",
        end: "top 40%",
      },
    });

    scrollTl.fromTo(
      ".text-category",
      { translateY: 35, opacity: 0.5 },
      { translateY: 0, opacity: 1, stagger: { each: 0.08 }, duration: 0.3 }
    );
  }, [selectedCategory]);

  function shuffleArray(category: string) {
    if (category === "development") return developmentCategories;
    if (category === "design") return designCategories;
    if (category === "marketing") return marketingCategories;
    return brandingCategories;
  }

  return (
    <section id="about-service" className="services-about container">
      <h2 className="services-about__title">{t("about.about.text")}</h2>
      <div className="flex md:items-end max-md:flex-col">
        <div className="md:w-1/2">
          <div className="md:ml-auto lg:w-[630px] max-lg:mb-[60px ]">
            <div className="text__regular-20 md:text__medium-30 xl:text__medium-60 cursor-pointer lg:text-left lg:w-[630px] max-md:flex flex-col gap-2.5 max-md:mb-10 uppercase">
              <div
                onClick={() => setSelectedCategory("design")}
                className="hover:text-silver  duration-500 transition-all relative"
              >
                <ArrowOutwardIcon
                  className={clsx(
                    "text-gold max-md:-translate-y-0.5 translate-y-0.5 !w-[25px] xl:!w-[60px] !h-[30px] xl:!h-[60px] mb-1.5 lg:mb-3  absolute opacity-0 transition-opacity delay-100",
                    {
                      "!opacity-100": selectedCategory === "design",
                      "!d-none": selectedCategory !== "design",
                    }
                  )}
                />
                <p
                  className={clsx(
                    "translate-x-0 transition-transform duration-500",
                    {
                      "!translate-x-14 max-xl:!translate-x-8":
                        selectedCategory === "design",
                    }
                  )}
                >
                  {t("about.features.card1.title")}
                </p>
              </div>
              <div
                onClick={() => setSelectedCategory("development")}
                className="hover:text-silver transition-all duration-500"
              >
                <ArrowOutwardIcon
                  className={clsx(
                    "text-gold max-md:-translate-y-0.5 translate-y-0.5 !w-[25px] xl:!w-[60px] !h-[30px] xl:!h-[60px] mb-1.5 lg:mb-3  absolute opacity-0 transition-opacity delay-100",
                    {
                      "!opacity-100": selectedCategory === "development",
                      "!d-none": selectedCategory !== "development",
                    }
                  )}
                />
                <p
                  className={clsx(
                    "translate-x-0 transition-transform duration-500",
                    {
                      "!translate-x-14 max-xl:!translate-x-8":
                        selectedCategory === "development",
                    }
                  )}
                >
                  {t("about.features.card2.title")}
                </p>
              </div>
              <div
                onClick={() => setSelectedCategory("branding")}
                className="hover:text-silver transition-all duration-500"
              >
                <ArrowOutwardIcon
                  className={clsx(
                    "text-gold max-md:-translate-y-0.5 translate-y-0.5 !w-[25px] xl:!w-[60px] !h-[30px] xl:!h-[60px] mb-1.5 lg:mb-3  absolute opacity-0 transition-opacity delay-100",
                    {
                      "!opacity-100": selectedCategory === "branding",
                      "!d-none": selectedCategory !== "branding",
                    }
                  )}
                />
                <p
                  className={clsx(
                    "translate-x-0 transition-transform duration-500",
                    {
                      "!translate-x-14 max-xl:!translate-x-8":
                        selectedCategory === "branding",
                    }
                  )}
                >
                  {t("about.features.card3.title")}
                </p>
              </div>
              <div
                onClick={() => setSelectedCategory("marketing")}
                className="hover:text-silver transition-all duration-500"
              >
                <ArrowOutwardIcon
                  className={clsx(
                    "text-gold max-md:-translate-y-0.5 translate-y-0.5 !w-[25px] xl:!w-[60px] !h-[30px] xl:!h-[60px] mb-1.5 lg:mb-3  absolute opacity-0 transition-opacity delay-100",
                    {
                      "!opacity-100": selectedCategory === "marketing",
                      "!d-none": selectedCategory !== "marketing",
                    }
                  )}
                />
                <p
                  className={clsx(
                    "translate-x-0 transition-transform duration-500",
                    {
                      "!translate-x-14 max-xl:!translate-x-8":
                        selectedCategory === "marketing",
                    }
                  )}
                >
                  {t("about.features.card4.title")}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 gap-5 max-md:gap-[60px]">
          <div className="md:mr-auto max-w-[315px] lg:max-w-[432px]">
            <h4 className="text__regular-20 lg:text__regular-30 mb-20 ">
              {t("about.offer.text")}
            </h4>
            <ul className="min-h-[432px]">
              {shuffleArray(selectedCategory).map((category, i) => {
                return (
                  <li key={i} className="overflow-hidden">
                    <p className="text-gold text__medium-20 mb-2.5 text-category">
                      {category}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
