"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { BannerDTO } from "@/app/api/banners/route";

const AboutImage = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const { i18n } = useTranslation();
  const [banner, setBanner] = useState<BannerDTO | null>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], ["-0%", "-25%"]);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const locale = i18n.language || "uk";
        // ✅ 1) правильний роут: /api/banners
        // ✅ 2) правильний key: home-about (як у Strapi)
        const res = await fetch(
          `/api/banners?key=home-about&locale=${locale}`
        );

        if (!res.ok) {
          console.error("[AboutImage] Failed to load banner", res.status);
          return;
        }

        const data: BannerDTO[] = await res.json();
        console.log("[AboutImage] Banners from API:", data);
        setBanner(data[0] || null);
      } catch (error) {
        console.error("[AboutImage] Error fetching banner:", error);
      }
    };

    fetchBanner();
  }, [i18n.language]);

  // ❗ прибираємо фолбек на неіснуючу картинку
  const bannerSrc = banner?.imageUrl ?? null;
  const bannerAlt = banner?.alt || "About image";

  return (
    <div className="my-10 md:my-[60px] xl:my-20 h-[100vh] lg:h-[70vh] overflow-hidden">
      <motion.div
        className="h-[125%] relative"
        ref={container}
        style={{ translateY }}
      >
        {bannerSrc && (
          <Image
            className="object-cover h-[125%] w-full absolute"
            src={bannerSrc}
            fill
            alt={bannerAlt}
            sizes="100vw"
          />
        )}
      </motion.div>
    </div>
  );
};

export default AboutImage;
