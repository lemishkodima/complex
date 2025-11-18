// components/ui/date-time-selector/DateOnlySelector.tsx
"use client";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, Control, FieldValues, FieldPath } from "react-hook-form";
import "./DateTimeSelector.scss";

interface DateOnlySelectorProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  title: string;
}

const DateOnlySelector = <T extends FieldValues>({
  control, name, title,
}: DateOnlySelectorProps<T>) => {
  return (
    <div className="date-time-selector">
      <label className="date-time-selector__title">{title}</label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <DatePicker
            selected={(field.value as Date | null) ?? null}
            onChange={(d: Date | null) => field.onChange(d ?? null)}
            showTimeSelect={false}
            dateFormat="dd.MM.yyyy"
            minDate={new Date()}
            placeholderText="Оберіть дату"
            className="date-time-selector__input"
          />
        )}
      />
    </div>
  );
};

export default DateOnlySelector;
