import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Стилі для datepicker
import { Controller, Control, FieldValues, FieldPath } from "react-hook-form";
import "./DateTimeSelector.scss"; // Для ваших кастомних стилів, якщо потрібно

// Визначення пропсів для типування з react-hook-form
interface DateTimeSelectorProps<TFormValues extends FieldValues> {
  control: Control<TFormValues>;
  name: FieldPath<TFormValues>;
  title: string;
}

// Компонент вибору дати та часу
const DateTimeSelector = <TFormValues extends FieldValues>({
  control,
  name,
  title,
}: DateTimeSelectorProps<TFormValues>) => {
  return (
    
    <div className="date-time-selector">
      <label className="date-time-selector__title">{title}</label>
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <DatePicker
                selected={(field.value as Date | null) ?? null}
                onChange={(d: Date | null) => {
                    console.log("[DTP pick]:", d);
                    field.onChange(d ?? null);
                }}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                dateFormat="dd.MM.yyyy HH:mm"
                minDate={new Date()}
                placeholderText="Оберіть дату та час"
                className="date-time-selector__input"
                wrapperClassName="svr-dtp__wrapper"
                popperClassName="svr-dtp__popper"
                calendarClassName="svr-dtp__calendar"
                weekDayClassName={() => "svr-dtp__weekday"}
                dayClassName={() => "svr-dtp__day"}
                timeClassName={() => "svr-dtp__time-item"}
                />
            )}
            />
      {/* Тут можна додати відображення помилки, якщо потрібно */}
      {/* {error && <p className="error-message">{error.message}</p>} */}
    </div>
  );
};

export default DateTimeSelector;