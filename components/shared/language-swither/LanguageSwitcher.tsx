"use client";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = ({ classes }: { classes?: string }) => {
  const [lang, setLang] = useState("UA");
  const { i18n } = useTranslation();
  const toggle = async (lang: string) => {
    setLang(lang);
    i18n.changeLanguage((i18n.language = lang.toLowerCase()));
  };

  useEffect(() => {
    setLang(i18n.language.toUpperCase());
  }, []);
  return (
    <div className={clsx("text__medium-14 uppercase z-[500]", classes)}>
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton className="text__medium-14">{lang}</MenuButton>
            <MenuList>
              <MenuItem className="uppercase" onClick={() => toggle("EN")}>
                EN
              </MenuItem>
              <MenuItem className="uppercase" onClick={() => toggle("UA")}>
                UA
              </MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
    </div>
  );
};

export default LanguageSwitcher;
