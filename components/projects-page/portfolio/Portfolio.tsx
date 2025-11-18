"use client";
import Image from "next/image";
import "./portfolio.scss";
import { useMyContext } from "@/providers/CursorProvide";
import clsx from "clsx";
import { useEffect, useState, useRef } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import RoundedButton from "@/components/ui/rounded-btn2/RoundedButton";
import { useTranslation } from "react-i18next";
import { pageTransitionIn } from "@/components/shared/transition-page/animations";
import { useRouter } from "next/navigation";
import { slideUpQuick } from "@/components/shared/footer/animations";
import { motion, useInView } from "framer-motion";

const Portfolio = () => {
  const projects = [
      {
        imgSource: "/assets/images/projects/Residence/preview.png",
        name: "Проживання",
        category: "Residence",
        href: "/contact",
      },
      {
        imgSource: "/assets/images/projects/Pool/preview.jpg",
        name: "Басейн",
        category: "Pool",
        href: "/contact",
      },
      {
        imgSource: "/assets/images/projects/Tennis/preview.jpg",
        name: "Тенісний корт",
        category: "Tennis court",
        href: "/contact",
      },
      {
        imgSource: "/assets/images/projects/Paddle/preview.jpg",
        name: "Паддл теніс",
        category: "Paddle tennis",
        href: "/contact",
      },
      {
        imgSource: "/assets/images/projects/Gym/preview.jpg",
        name: "Спортзал",
        category: "Gym",
        href: "/contact",
      },
            {
        imgSource: "/assets/images/projects/SPA/preview.jpg",
        name: "SPA",
        category: "SPA",
        href: "/contact",
      },
  ];
  const { t } = useTranslation("projects");
  const { setHoverCursor, setPathName } = useMyContext();
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState<any[]>(projects);
  const [projectsToShow, setProjectsToShow] = useState<any[]>([]);
  const observerTarget = useRef(null);

  const loadMore = async () => {
    setProjectsToShow((prev) => [
      ...prev,
      filteredProjects[projectsToShow.length],
      filteredProjects[projectsToShow.length + 1],
    ]);

    setTimeout(() => {
      setProjectsToShow((prev) => prev.map((item) => ({ ...item, loading: false })));
    }, 1200);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // loadMore();
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);

  const filterProjects = () => {
    if (activeCategory === "All") {
      setProjectsToShow(projects);
      return;
    }

    setProjectsToShow(projects.filter((project) => project.category === activeCategory));
  };

  useEffect(() => {
    filterProjects();
  }, [activeCategory]);
  const router = useRouter();

  const swapPage = (href: string) => {
    setPathName("/services");

    pageTransitionIn();
    setTimeout(() => {
      router.push("/project/1");
    }, 400);
  };
  const [animate, setAnimate] = useState(false);
  const scrollContainerRef = useRef(null);
  const isInView = useInView(scrollContainerRef);

  useEffect(() => {
    setAnimate(false);
    setTimeout(() => {
      setAnimate(true);
    }, 1000);
  }, [activeCategory]);
  return (
    <section id="portfolio" className="container portfolio">
      <div className="flex gap-10 md:items-center mb-10 max-md:flex-col">
        <div className="uppercase">{t("Filter:")}</div>
        <div className="flex gap-5 flex-wrap">
          <div onClick={() => setActiveCategory("All")}>
            <RoundedButton isActive={activeCategory === "All"}>
              <p>{t("All")}</p>
            </RoundedButton>
          </div>
          <div onClick={() => setActiveCategory("Design")}>
            <RoundedButton isActive={activeCategory === "Design"}>
              <p>{t("Design")}</p>
            </RoundedButton>
          </div>
          <div onClick={() => setActiveCategory("Branding")}>
            <RoundedButton isActive={activeCategory === "Branding"}>
              <p>{t("Branding")}</p>
            </RoundedButton>
          </div>
          <div onClick={() => setActiveCategory("Web development")}>
            <RoundedButton isActive={activeCategory === "Web development"}>
              <p>{t("Development")}</p>
            </RoundedButton>
          </div>
          <div onClick={() => setActiveCategory("Marketing")}>
            <RoundedButton isActive={activeCategory === "Marketing"}>
              <p>{t("Marketing")}</p>
            </RoundedButton>
          </div>
        </div>
      </div>
      <ul ref={scrollContainerRef} className="portfolio__container">
        {projectsToShow.map((project, i) => (
          <a
            target={!project.href.includes("#") ? "_blank" : "_self"}
            href={project.href}
            //@ts-ignore
            onMouseEnter={() => setHoverCursor(true)}
            //@ts-ignore
            onMouseLeave={() => setHoverCursor(false)}
            // onClick={() => swapPage(project.name)}
            key={i}
            className={clsx("portfolio__item cursor-none", {})}
          >
            {/* {project.loading ? (
              <SkeletonTheme
                baseColor="#202020"
                highlightColor="rgba(234, 234, 234, 0.10)"
              >
                <Skeleton className="h-[500px]" />
              </SkeletonTheme>
            ) : ( */}
            <motion.div
              variants={slideUpQuick}
              custom={i}
              key={i}
              animate={animate ? "open" : "closed"}
              className="footer-element"
            >
              <div className="relative portfolio__imageContainer overflow-hidden">
                <Image
                  className="portfolio__itemImage hover:scale-105 transition-transform duration-[250ms]"
                  src={project?.imgSource}
                  fill
                  alt="project-preview"
                />
              </div>
              <div className="portfolio__properties">
                <p className="portfolio__itemName">{project?.name}</p>
                <p className="portfolio__itemCategory">{project?.category}</p>
              </div>
            </motion.div>
            {/* )} */}
          </a>
        ))}
      </ul>
      <div ref={observerTarget}></div>
    </section>
  );
};

export default Portfolio;
