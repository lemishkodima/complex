"use client";
import "./hero.scss";
import NavLink from "@/components/ui/nav-link/NavLink";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { animateImage, animateTitle, revealMenu } from "../animations";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Projects from "../projects/Projects";
import { scrollTo } from "@/lib/utils/scrollTo";
import { useTranslation } from "react-i18next";
// prettier-ignore
const Hero = () => {
  const timeline = useRef(gsap.timeline());
  const heroRef = useRef(null);
const {t} = useTranslation('home')
  useEffect(() => {
    const context = gsap.context(() => {
      const tl = timeline.current;

      tl.add(animateTitle()).add(revealMenu(), 0).add(animateImage(), 0);
    }, heroRef);

    return () => context.revert();
  }, []);

  return (
    <div ref={heroRef}>
    <section className="hero container" >
      <div className="hero__container">
        <h1 className="hero__title"><span className="hero__title--indent"> {t('Unleash your')} <ArrowForwardIcon className="hero__icons lg:hidden " /><span className="hero__title--accent">{t('creative')}</span></span> {t('brilliance with us')} <EmojiEmotionsIcon className="hero__icons" /> {t('where')} <span className="hero__title--accent">{t('ideas')}</span> {t('flow')} <ArrowForwardIcon className="hero__icons max-lg:hidden" /> {t('and')} <span className="hero__title--accent">{t('brands')} </span>{t('shine')} <WbSunnyIcon className="hero__icons" />.
        </h1>
        <h4 className="text__medium-14 hero__subtitle uppercase">SVAROG COMPLEX</h4>
      </div>
      <div onClick={() => scrollTo('about')}>
      <NavLink   arrowDirection="bottom-right">
       {t('Scroll to Explore')} 
      </NavLink>
      </div>
    </section>
    <div ><Projects/></div>
    </div>
  );
};

export default Hero;
