"use client";
import SelectBtn from "@/components/ui/select-btn/SelectBtn";
import clsx from "clsx";
import React from "react";
import "./selectList.scss";
import { Controller } from "react-hook-form";

interface SelectListProps {
  title: string;
  values: string[];
  classes?: string;
  name: string;
  control: any;
  selectMany?: boolean;
}

const SelectList = ({
  title,
  values,
  classes,
  name,
  control,
  selectMany = false,
}: SelectListProps) => {
  if (selectMany) {
    // ✅ Мультивибір: поле = масив string[]
    return (
      <div className={clsx("selectList", classes)}>
        <p className="selectList__title">{title}</p>
        <Controller
          control={control}
          name={name}
          render={({ field }) => {
            const selected: string[] = field.value || [];

            const toggle = (value: string) => {
              if (selected.includes(value)) {
                field.onChange(selected.filter((v) => v !== value));
              } else {
                field.onChange([...selected, value]);
              }
            };

            return (
              <ul className="selectList__list">
                {values.map((value) => (
                  <SelectBtn
                    key={value}
                    onClick={() => toggle(value)}
                    classes={clsx("selectList__item", {
                      "bg-platinum text-dark": selected.includes(value),
                    })}
                  >
                    {value}
                  </SelectBtn>
                ))}
              </ul>
            );
          }}
        />
      </div>
    );
  }

  // ✅ Одиночний вибір як і був
  return (
    <div className={clsx("selectList", classes)}>
      <p className="selectList__title">{title}</p>
      <ul className="selectList__list">
        {values.map((value) => (
          <Controller
            key={value}
            control={control}
            name={name}
            render={({ field }) => (
              <SelectBtn
                onClick={() => {
                  field.onChange(value);
                }}
                classes={clsx("selectList__item", {
                  "bg-platinum text-dark": field.value === value,
                })}
              >
                {value}
              </SelectBtn>
            )}
          />
        ))}
      </ul>
    </div>
  );
};

export default SelectList;
