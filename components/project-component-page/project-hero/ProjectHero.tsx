import NavLink from "@/components/ui/nav-link/NavLink";
import { scrollTo } from "@/lib/utils/scrollTo";
import React from "react";

interface ProjectHeroProps {
  title: string;
  services: string[];
  year: string;
  technology: string[];
  client: string;
}

const ProjectHero = ({
  title,
  services,
  year,
  technology,
  client = "Client",
}: ProjectHeroProps) => {
  return (
    <section className="container mt-[60px] md:mt-20 xl:mt-[140px] mb-[120px] xl:mb-[160px]">
      <h1 className="text__medium-40 mb-[60px] md:text__medium-60 lg:mb-20 lg:text__medium-80">
        {title}
      </h1>
      <div className="lg:w-1/2 lg:ml-auto">
        <div className=" md:grid md:grid-cols-2 md:gap-x-5 md:gap-y-10 max-md:flex max-md:flex-col max-md:gap-5 uppercase">
          <div>
            <p className="text__medium-14 text-silver mb-2.5">Services</p>
            <ul className="w-[305px]">
              {services.map((service) => (
                <li className="text__medium-14" key={service}>
                  {service}
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 lg:max-w-[397px]">
            <p className="text__medium-14 text-silver mb-2.5">Client</p>
            <p className="text__medium-14">{client}</p>
          </div>
          <div>
            <ul>
              <p className="text__medium-14  text-silver mb-2.5">Technology</p>
              {technology.map((tech) => (
                <li className="text__medium-14" key={tech}>
                  {tech}
                </li>
              ))}
            </ul>
          </div>
          <div className="order-4 lg:max-w-[397px]">
            <p className="text__medium-14 text-silver mb-2.5">year</p>
            <p className="text__medium-14">{year}</p>
          </div>
        </div>
      </div>
      <div
        onClick={() => scrollTo("project-info")}
        className="mt-[60px] lg:mt-20"
      >
        <NavLink href="#">about.hero.scrollCta</NavLink>
      </div>
    </section>
  );
};

export default ProjectHero;
