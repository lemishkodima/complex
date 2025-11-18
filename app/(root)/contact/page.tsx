"use client";
import ContactForm from "@/components/form-page/contact-form/ContactForm";
import ContactHero from "@/components/form-page/contact-hero/ContactHero";
import ContactsInformation from "@/components/form-page/contacts-information/ContactsInformation";
import Cta from "@/components/home-page/cta/Cta";
import Questions from "@/components/home-page/questions/Questions";
import { pageTransitionOut } from "@/components/shared/transition-page/animations";
import { useEffect } from "react";

export default function Contact() {
  useEffect(() => {
    setTimeout(() => {
      pageTransitionOut();
    }, 600);
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();

      setTimeout(() => {
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 2000);
    })();
  }, []);
  return (
    <main>
      <ContactHero />
      <ContactForm />
      <ContactsInformation />
      <Questions />
      <Cta />
    </main>
  );
}
