import NavLink from "@/components/ui/nav-link/NavLink";
import "./projectsHero.scss";
import { scrollTo } from "@/lib/utils/scrollTo";
import { useTranslation } from "react-i18next";

// prettier-ignore
const ProjectsHero = () => {
  const { t } = useTranslation("projects");
  return  <section className="projectsHero container">
  <div className="projectsHero__container relative">
    <h1 className="projectsHero__title"><span className="projectsHero__title--indent"></span>{t('Experience the embodiment')} 
    </h1>
    <p className="text__medium-14 projectsHero__subtitle uppercase">{t('Our Lates Projects')}</p>
  </div>
  <div onClick={() => scrollTo("portfolio")}>
  <NavLink href="#" arrowDirection="bottom-right">
    {t('Scroll to Explore')}
  </NavLink>
  </div>
</section>;
};

export default ProjectsHero;
