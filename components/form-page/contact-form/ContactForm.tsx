import Form from "@/components/shared/form/Form";
import "./contactForm.scss";
import { useTranslation } from "react-i18next";

const ContactForm = () => {
  const { t } = useTranslation("contact");
  return (
    <section className="contactForm container ">
      <div className="contactForm__container">
        <h4 className="text__medium-30 contactForm__title">
          {t("Write to Us")}
        </h4>
        <Form />
      </div>
    </section>
  );
};

export default ContactForm;
