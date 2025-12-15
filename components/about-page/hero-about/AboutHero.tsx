import NavLink from "@/components/ui/nav-link/NavLink";
import "./aboutHero.scss";
import PanToolIcon from "@mui/icons-material/PanTool";
import { scrollTo } from "@/lib/utils/scrollTo";
import { useTranslation } from "react-i18next";
// prettier-ignore
const AboutHero = () => {
  const {t} = useTranslation("about");
  return (
    <section className="aboutHero container">
      <div className="aboutHero__container relative ">
        <h1 className="aboutHero__title "><span className="aboutHero__title--indent aboutHero__title--accent">{t('about.hero.title.line1')}</span> {t('about.hero.title.line2')} <span className="aboutHero__title--accent">{t('about.hero.title.line3')}</span> {t('to problem-solving')}.</h1>
        {/* <p className="text__medium-14 aboutHero__subtitle uppercase">SVAROG COMPLEX</p> */}
      </div>
      <div className="aboutHero__secondContainer">
        <div className="md:mr-auto md:max-w-[301px]">
          <h4 className="aboutHero__textTitle">{t('about.values.section1.text')}</h4>
          <p className="aboutHero__textContent">
           {t('about.values.section1.description')}
          </p>
          <h4 className="aboutHero__textTitle">{t('about.values.section2.text')}</h4>
          <p className="aboutHero__textContent">
          {t('about.values.section2.description')}
          </p>
        </div>
      </div>
      <div onClick={() => scrollTo('about-service')}>
        <NavLink href="/about" arrowDirection="bottom-right">
        {t('about.hero.scrollCta')}
        </NavLink>
      </div>
    </section>
  );
};

export default AboutHero;
