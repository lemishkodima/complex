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
const DynamicMagneticElement = dynamic(() => import("@/components/ui/magnetic/MagneticElement"), {
  loading: () => <div className="h-[185px]"></div>,
  ssr: false,
});

const projects = [
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
];

const Projects = () => {
  const router = useRouter();
  const { t } = useTranslation("home");
  const { setHoverCursor, setPathName } = useMyContext();
  const swapPage = (href: string) => {
    setPathName("/services");

    pageTransitionIn();
    setTimeout(() => {
      router.push("/project/1");
    }, 400);
  };
  return (
    <section className="projects container">
      <div className="projects__info">
        <div>
          <h4 className="text__medium-20  mb-4">{t("Our services")}</h4>
          <p className="projects__infoText text-silver">{t("We’re obsessed")}</p>
        </div>
        <DynamicMagneticElement>
          <div className="w-[187px] h-[62px] relative">
            <div className="absolute p-1 w-[210px] h-[110px] top-1/2 left-1/2 flex-center -translate-x-1/2 -translate-y-1/2">
              <NavLink arrow={false} href="/projects" classes="">
                <RoundedButton>
                  <p>{t("All Projects")}</p>
                </RoundedButton>
              </NavLink>
            </div>
          </div>
        </DynamicMagneticElement>
      </div>
      <ul className="projects__list ">
        {projects.map((project, i) => (
          <a
            target={!project.href.includes("#") ? "_blank" : "_self"}
            href={project.href}
            //@ts-ignore
            onMouseEnter={() => setHoverCursor(true)}
            //@ts-ignore
            onMouseLeave={() => setHoverCursor(false)}
            key={i}
            // onClick={() => swapPage(project.name)}
            className="projects__item group cursor-none"
          >
            <div className="relative projects__imageContainer">
              <Image className="projects__itemImage" src={project.imgSource} fill alt="project-preview" />
            </div>
            <div className="projects__properties lg:group-hover:flex-between">
              <p className="projects__itemName ">{project.name}</p>
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
