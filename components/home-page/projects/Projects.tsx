"use client";

import Image from "next/image";
import "./projects.scss";

import dynamic from "next/dynamic";
import { useMyContext } from "@/providers/CursorProvide";
import { pageTransitionIn } from "@/components/shared/transition-page/animations";
import { useRouter } from "next/navigation";

import RoundedButton from "@/components/ui/rounded-btn2/RoundedButton";
import NavLink from "@/components/ui/nav-link/NavLink";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useRef } from "react";

// тип сервісу з нашого API /api/services
import type { Service } from "@/app/api/services/route";

const DynamicMagneticElement = dynamic(
  () => import("@/components/ui/magnetic/MagneticElement"),
  {
    loading: () => <div className="h-[185px]"></div>,
    ssr: false,
  }
);

const Projects = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation("home");
  const { setHoverCursor, setPathName } = useMyContext();

  const [projects, setProjects] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const swapPage = (href: string) => {
    setPathName("/services");
    pageTransitionIn();
    setTimeout(() => {
      router.push("/project/1");
    }, 400);
  };

  // 🔹 Тягнемо перші 4 послуги зі Strapi через наш API route
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const locale = i18n.language || "uk";
        const res = await fetch(`/api/services?locale=${locale}`);
        if (!res.ok) {
          console.error("Failed to load services for home projects", res.status);
          setIsLoading(false);
          return;
        }

        const data: Service[] = await res.json();

        // беремо тільки перші 4
        const firstFour = data.slice(0, 4);
        setProjects(firstFour);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [i18n.language]);

  return (
    <section className="projects container">
      <div className="projects__info">
        <div>
          <h4 className="text__medium-20 mb-4">
            {t("home.services.sectionTitle")}
          </h4>
          <p className="projects__infoText text-silver">
            {t("home.services.sectionDescription")}
          </p>
        </div>

        <DynamicMagneticElement>
          <div className="w-[187px] h-[62px] relative">
            <div className="absolute p-1 w-[210px] h-[110px] top-1/2 left-1/2 flex-center -translate-x-1/2 -translate-y-1/2">
              <NavLink arrow={false} href="/projects" classes="">
                <RoundedButton>
                  <p>{t("home.services.allLink")}</p>
                </RoundedButton>
              </NavLink>
            </div>
          </div>
        </DynamicMagneticElement>
      </div>

      <ul className="projects__list">
        {isLoading && (
          <>
            <li className="projects__item skeleton-card" />
            <li className="projects__item skeleton-card" />
            <li className="projects__item skeleton-card" />
            <li className="projects__item skeleton-card" />
          </>
        )}

        {!isLoading &&
          projects.map((project) => (
            <a
              key={project.id}
              target={!project.href.includes("#") ? "_self" : "_self"}
              href={project.href}
              onMouseEnter={() => setHoverCursor(true)}
              onMouseLeave={() => setHoverCursor(false)}
              className="projects__item group cursor-none"
              // onClick={() => swapPage(project.href)}
            >
              <div className="relative projects__imageContainer">
                <Image
                  className="projects__itemImage"
                  src={project.imageUrl}
                  fill
                  alt={project.name}
                />
              </div>
              <div className="projects__properties lg:group-hover:flex-between">
                <p className="projects__itemName">{project.name}</p>
                {/* якщо хочеш виводити категорію — можна або сирою, або через t(...) */}
                <p className="projects__itemCategory opacity-0 delay-700 duration-700 transition-opacity lg:group-hover:opacity-100 lg:group-hover:mt-5">
                  {project.category}
                </p>
              </div>
            </a>
          ))}
      </ul>
    </section>
  );
};

export default Projects;
