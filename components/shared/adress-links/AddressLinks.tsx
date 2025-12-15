import NavLink from "@/components/ui/nav-link/NavLink";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

interface AddressLinksProps {
  classes?: string;
  isDark?: boolean;
}

const AddressLinks = ({ classes, isDark = false }: AddressLinksProps) => {
  const { t } = useTranslation("translation");
  return (
    <div className={clsx("flex flex-col !gap-2.5", classes)}>
      <NavLink
        passHref
        target="_blank"
        classes={clsx("text__medium-14 ", { "!text-dark": isDark })}
        arrowDirection="top-right"
        href="mailto:hello@svarog.group"
      >
        hello@svarog.group
      </NavLink>
      <NavLink
        passHref
        target="_blank"
        classes={clsx("text__medium-14", { "!text-dark": isDark })}
        arrowDirection="top-right"
        href="tel:+380975345549"
      >
        +38(090) 000-00-00
      </NavLink>
      <NavLink
        passHref
        target="_blank"
        href="https://maps.app.goo.gl/XXbGdaBsHeWf5cbB9"
        classes={clsx("text__medium-14 max-w-[168px] mt-2.5", {
          "!text-dark": isDark,
        })}
        arrow={false}
      >
        {t("common.location.main")}
      </NavLink>
    </div>
  );
};

export default AddressLinks;
