// components/projects-page/portfolio/Portfolio.tsx
"use client";

import Image from "next/image";
import "./portfolio.scss";
import { useMyContext } from "@/providers/CursorProvide";
import clsx from "clsx";
import { useEffect, useState, useRef } from "react";
import RoundedButton from "@/components/ui/rounded-btn2/RoundedButton";
import { useTranslation } from "react-i18next";
import { pageTransitionIn } from "@/components/shared/transition-page/animations";
import { useRouter } from "next/navigation";
import { slideUpQuick } from "@/components/shared/footer/animations";
import { motion, useInView } from "framer-motion";
import type {
  Service as ApiService,
  ServiceCategory,
} from "@/app/api/services/route";

export type Service = ApiService;
export type { ServiceCategory };

// Значення фільтрів = або "All", або категорії зі Strapi
type FilterId = "All" | ServiceCategory;

// Просто список фільтрів (id == значення, по якому фільтруємо)
const FILTERS: FilterId[] = ["All", "residence", "activity", "comfort"];

const Portfolio = () => {
  const { i18n } = useTranslation("projects");
  const { setHoverCursor, setPathName } = useMyContext();

  const [services, setServices] = useState<Service[]>([]);
  const [activeCategory, setActiveCategory] = useState<FilterId>("All");
  const [projectsToShow, setProjectsToShow] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const observerTarget = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLUListElement | null>(null);
  const isInView = useInView(scrollContainerRef);

  const router = useRouter();
  const [animate, setAnimate] = useState(false);

  // Лейбли для кнопок фільтрів
  const getFilterLabel = (id: FilterId) => {
    const lang = i18n.language || "uk";
    const isUk = lang.startsWith("uk") || lang.startsWith("ua");

    if (isUk) {
      switch (id) {
        case "All":
          return "Всі";
        case "residence":
          return "Проживання";
        case "activity":
          return "Активність";
        case "comfort":
          return "Затишок";
        default:
          return id;
      }
    } else {
      switch (id) {
        case "All":
          return "All";
        case "residence":
          return "Residence";
        case "activity":
          return "Activity";
        case "comfort":
          return "Comfort";
        default:
          return id;
      }
    }
  };

  // Лейбл категорії під карткою
  const getCategoryLabel = (cat: ServiceCategory) => {
    const lang = i18n.language || "uk";
    const isUk = lang.startsWith("uk") || lang.startsWith("ua");

    if (isUk) {
      switch (cat) {
        case "residence":
          return "Проживання";
        case "activity":
          return "Активність";
        case "comfort":
          return "Затишок";
        default:
          return cat;
      }
    } else {
      switch (cat) {
        case "residence":
          return "Residence";
        case "activity":
          return "Activity";
        case "comfort":
          return "Comfort";
        default:
          return cat;
      }
    }
  };

  // 🔹 Тягнемо сервіси зі Strapi через API route
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const locale = i18n.language || "uk";
        const res = await fetch(`/api/services?locale=${locale}`);
        if (!res.ok) {
          console.error("Failed to load services", res.status);
          setIsLoading(false);
          return;
        }
        const data: Service[] = await res.json();
        setServices(data);
        setProjectsToShow(data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [i18n.language]);

  // 🔹 Фільтрація по категорії
  useEffect(() => {
    if (activeCategory === "All") {
      setProjectsToShow(services);
    } else {
      setProjectsToShow(
        services.filter((project) => project.category === activeCategory)
      );
    }

    setAnimate(false);
    const timer = setTimeout(() => setAnimate(true), 200);
    return () => clearTimeout(timer);
  }, [activeCategory, services]);

  const swapPage = (href: string) => {
    setPathName("/services");
    pageTransitionIn();
    setTimeout(() => {
      router.push("/project/1");
    }, 400);
  };

  // Якщо хочеш — тут можна підключити Infinite Scroll
  useEffect(() => {
    if (!observerTarget.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // TODO: loadMore();
        }
      },
      { threshold: 1 }
    );

    observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="portfolio" className="container portfolio">
      <div className="flex gap-10 md:items-center mb-10 max-md:flex-col">
        <div className="flex gap-5 flex-wrap">
          {FILTERS.map((id) => (
            <div key={id} onClick={() => setActiveCategory(id)}>
              <RoundedButton isActive={activeCategory === id}>
                <p>{getFilterLabel(id)}</p>
              </RoundedButton>
            </div>
          ))}
        </div>
      </div>

      {isLoading && (
        <p className="text__medium-14 opacity-60 mb-6">
          Loading services...
        </p>
      )}

      {!isLoading && projectsToShow.length === 0 && (
        <p className="text__medium-14 opacity-60 mb-6">
          Немає сервісів за цією категорією.
        </p>
      )}

      <ul ref={scrollContainerRef} className="portfolio__container">
        {projectsToShow.map((project, i) => (
          <a
            key={project.id}
            target={!project.href.includes("#") ? "_self" : "_self"}
            href={project.href}
            onMouseEnter={() => setHoverCursor(true)}
            onMouseLeave={() => setHoverCursor(false)}
            className={clsx("portfolio__item cursor-none")}
          >
            <motion.div
              variants={slideUpQuick}
              custom={i}
              animate={animate ? "open" : "closed"}
              className="footer-element"
            >
              <div className="relative portfolio__imageContainer overflow-hidden">
                <Image
                  className="portfolio__itemImage hover:scale-105 transition-transform duration-[250ms]"
                  src={project.imageUrl}
                  fill
                  alt={project.name}
                />
              </div>
              <div className="portfolio__properties">
                <p className="portfolio__itemName">{project.name}</p>
                <p className="portfolio__itemCategory">
                  {getCategoryLabel(project.category)}
                </p>
              </div>
            </motion.div>
          </a>
        ))}
      </ul>

      <div ref={observerTarget}></div>
    </section>
  );
};

export default Portfolio;
