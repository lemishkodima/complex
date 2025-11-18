import AddressLinks from "@/components/shared/adress-links/AddressLinks";
import "./contactsInformation.scss";
import SocialLinks from "@/components/shared/social-links/SocialLinks";
import { useTranslation } from "react-i18next";
const ContactsInformation = () => {
  const { t } = useTranslation("contact");
  return (
    <section
      id="contact-info"
      className="contactsInformation bg-platinum lg:bg-dark"
    >
      <div className="container lg:text-platinum text-dark">
        <div className="contactsInformation__section max-w-[977px]">
          <h4 className="contactsInformation__title">{t("Our Office")}</h4>
          <AddressLinks classes="max-lg:hidden" />
          <AddressLinks classes="lg:hidden" isDark />
          <div>
            <p className="contactsInformation__text max-sm:mt-5">
              {t("Monday - Friday")}
            </p>
            <p className="contactsInformation__text">09:00 - 18:00</p>
          </div>
        </div>
        <div className="contactsInformation__section max-w-[524px]">
          <h4 className="contactsInformation__title">{t("In Socials")}</h4>
          <SocialLinks classes="max-lg:hidden" />
          <SocialLinks classes="lg:hidden" isDark />
        </div>
      </div>
    </section>
  );
};

export default ContactsInformation;
