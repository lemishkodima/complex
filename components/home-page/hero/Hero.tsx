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
        <h1 className="hero__title"><span className="hero__title--indent"> {t('home.hero.title.line1.part1')} <ArrowForwardIcon className="hero__icons lg:hidden " /><span className="hero__title--accent">{t('home.hero.title.line1.part2')}</span></span> {t('home.hero.title.line1.part3')} <EmojiEmotionsIcon className="hero__icons" /> {t('home.hero.title.line2.part1')} <span className="hero__title--accent">{t('home.hero.title.line2.part2')}</span> {t('home.hero.title.flowWord')} <ArrowForwardIcon className="hero__icons max-lg:hidden" /> {t('home.hero.title.line2.part3')} <span className="hero__title--accent">{t('home.hero.title.line2.part4')} </span>{t('home.hero.title.line2.part5')} <WbSunnyIcon className="hero__icons" />.
        </h1>
        <h4 className="text__medium-14 hero__subtitle uppercase">SVAROG COMPLEX</h4>
      </div>
      <div onClick={() => scrollTo('about')}>
      <NavLink   arrowDirection="bottom-right">
       {t('about.hero.scrollCta')} 
      </NavLink>
      </div>
    </section>
    <div ><Projects/></div>
    </div>
  );
};

export default Hero;
