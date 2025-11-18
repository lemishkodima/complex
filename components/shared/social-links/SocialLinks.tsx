import NavLink from "@/components/ui/nav-link/NavLink";
import clsx from "clsx";

interface SocialLinksProps {
  classes?: string;
  isDark?: boolean;
}

const SocialLinks = ({ classes, isDark }: SocialLinksProps) => {
  return (
    <div className={clsx("flex flex-col !gap-2.5", classes)}>
      <NavLink
        classes={clsx("text__medium-14 ", { "!text-dark": isDark })}
        href="/#"
        arrowDirection="top-right"
      >
        X
      </NavLink>
      <NavLink
        classes={clsx("text__medium-14 ", { "!text-dark": isDark })}
        arrowDirection="top-right"
        href="/#"
      >
        Tik Tok
      </NavLink>
      <NavLink
        classes={clsx("text__medium-14 ", { "!text-dark": isDark })}
        arrowDirection="top-right"
        href="/#"
      >
        Instagram
      </NavLink>
    </div>
  );
};

export default SocialLinks;
