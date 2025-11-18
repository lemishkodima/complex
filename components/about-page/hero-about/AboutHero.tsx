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
        <h1 className="aboutHero__title "><span className="aboutHero__title--indent aboutHero__title--accent">{t('Just a design')}</span> {t('and strategy agency with an')} <span className="aboutHero__title--accent">{t('adaptive approach')}</span> {t('to problem-solving')}.</h1>
        {/* <p className="text__medium-14 aboutHero__subtitle uppercase">SVAROG COMPLEX</p> */}
      </div>
      <div className="aboutHero__secondContainer">
        <div className="md:mr-auto md:max-w-[301px]">
          <h4 className="aboutHero__textTitle">{t('Innovation and creativity')}</h4>
          <p className="aboutHero__textContent">
           {t('We thrive on pushing')}
          </p>
          <h4 className="aboutHero__textTitle">{t('Commitment to quality')}</h4>
          <p className="aboutHero__textContent">
          {t('Your satisfaction is')}
          </p>
        </div>
      </div>
      <div onClick={() => scrollTo('about-service')}>
        <NavLink href="/about" arrowDirection="bottom-right">
        {t('Scroll to Explore')}
        </NavLink>
      </div>
    </section>
  );
};

export default AboutHero;
