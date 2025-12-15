import NavLink from "@/components/ui/nav-link/NavLink";
import "./contactHero.scss";
import ErrorIcon from "@mui/icons-material/Error";
import HelpIcon from "@mui/icons-material/Help";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { scrollTo } from "@/lib/utils/scrollTo";
import { useTranslation } from "react-i18next";

// prettier-ignore
const ContactHero = () => {
  const {t} = useTranslation('contact')
  return  <div className="contactHero container">
  <div className="contactHero__container relative">
    <h1 className="contactHero__title"><span className="contactHero__title--indent">{t('contact.hero.title.part1')}<ArrowForwardIcon className="contactHero__icons" /></span><span className="contactHero__title--accent">{t('contact.hero.title.part2')}</span> {t('contact.hero.title.part3')} <span className="contactHero__title--accent">{t('contact.hero.title.part4')}</span> <HelpIcon  className="contactHero__icons" /> <br/> {t('contact.hero.subtitle')} <ErrorIcon  className="contactHero__icons" />
    </h1>
    <p className="text__medium-14 contactHero__subtitle uppercase">{t('contact.hero.brand')}</p>
  </div>
  <div id="form-id" onClick={() => scrollTo('contact-info') }>
  <NavLink href="#" arrowDirection="bottom-right">
    {t('about.hero.scrollCta')}
  </NavLink>
  </div>
</div>;
};

export default ContactHero;
