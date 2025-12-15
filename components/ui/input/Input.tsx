"use client";

import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import "./input.scss";

type InputProps = {
  label?: string;
  placeholder?: string;
  /** Ім'я поля у формі (будь-який ключ) */
  name: string;
  /** register з useForm */
  register: UseFormRegister<any>;
  /** Помилка від RHF */
  error?: FieldError;
  /** Рендерити textarea замість input */
  asTextAria?: boolean;
  /** Додаткові хендлери (якщо десь використовуєш) */
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur2?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  name,
  register,
  error,
  asTextAria,
  onFocus,
  onBlur2,
}) => {
  const inputProps = {
    placeholder,
    onFocus,
    // важливо: name тут string, для TypeScript кастимо до any
    ...register(name as any),
    onBlur: onBlur2,
    id: name,
    className: "input !normal-case resize-none max-w-full",
  };

  return (
    <div className="input-wrapper">
      {label && (
        <label htmlFor={name} className="input-label">
          {label}
        </label>
      )}

      {asTextAria ? (
        <textarea {...(inputProps as any)} rows={4} />
      ) : (
        <input type="text" {...(inputProps as any)} />
      )}

      {error && (
        <p className="input-error text-red-500 text-sm mt-1">
          {String(error.message)}
        </p>
      )}
    </div>
  );
};

export default Input;
