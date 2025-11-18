"use client";
import SelectBtn from "@/components/ui/select-btn/SelectBtn";
import clsx from "clsx";
import React, { useState } from "react";
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
  const [selectedValue, setSelectedValue] = useState<string>("");

  const setNewValue = (value: string) => {
    setSelectedValue(value);
  };

  const handleMultipleSelection = (value: string, field: any) => {
    if (selectedValue.includes(value) && selectedValue !== "") {
      setSelectedValue(() => selectedValue.replace(value, ""));
      field.onChange(selectedValue);
    } else {
      setSelectedValue((prev) => value + ", " + prev);
      field.onChange(selectedValue + value);
    }
  };

  if (selectMany) {
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
                  onClick={() => handleMultipleSelection(value, field)}
                  classes={clsx("selectList__item", {
                    "bg-platinum text-dark": selectedValue.includes(value),
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
  }

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
                  setNewValue(value);
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
