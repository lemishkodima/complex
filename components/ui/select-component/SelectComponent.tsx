"use client";
import useClickOutside from "@/lib/hooks";
import clsx from "clsx";
import { useRef, useState } from "react";
import { Controller } from "react-hook-form";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useTranslation } from "react-i18next";

interface SelectListProps {
  control: any; // or import { FieldValues } from 'react-hook-form'
  name: string;
}

const SelectComponent = ({ control, name }: SelectListProps) => {
  const [value, setValue] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const myRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    setIsOpen(false);
  };
  const { t } = useTranslation("contact");
  const options = [
    "Google",
    t("contact.form.source.friends"),
    t("contact.form.source.socials"),
    t("contact.form.source.other"),
  ];
  const setNewValue = (value: string, field: any) => {
    setValue(value);
    setIsOpen(false);
    field.onChange(value);
  };
  useClickOutside({ ref: myRef, handler: handleClickOutside });
  return (
    <div
      ref={myRef}
      className="text__medium-20 w-full cursor-pointer rounded-none border-b border-platinum-10 bg-dark relative"
    >
      <p className="text__label text-silver mb-5 block">
        {t("contact.form.source.label")}
      </p>
      <p onClick={() => setIsOpen(!isOpen)} className="pb-5 flex-between">
        {value || t("contact.form.source.placeholder")}
        <KeyboardArrowDownIcon
          className={clsx("text-platinum transition-transform duration-500", {
            "rotate-180": isOpen,
          })}
        />
      </p>
      <ul
        className={clsx(
          "h-0 gap-1 flex flex-col overflow-hidden transition-all linear duration-500 absolute bg-platinum w-full border-b border-platinum-10",
          {
            "h-40": isOpen,
          }
        )}
        placeholder={t("contact.form.source.placeholder")}
      >
        {options.map((option) => (
          <Controller
            key={option}
            control={control}
            name={name}
            render={({ field }) => (
              <li
                className="ml-5 transition-colors  first:mt-5 cursor-pointer pb-1.5 text-dark hover:text-gold"
                onClick={() => setNewValue(option, field)}
                key={option}
              >
                {option}
              </li>
            )}
          />
        ))}
      </ul>
    </div>
  );
};

export default SelectComponent;
