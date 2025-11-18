import clsx from "clsx";
import "./input.scss";
import { UseFormRegister } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/lib/utils/validation";
import { useState } from "react";

interface InputProps {
  label: string;
  placeholder: string;
  name: "name" | "email" | "company" | "phone" | "projectDetails";
  classes?: string;
  type?: string;
  register: UseFormRegister<z.infer<typeof formSchema>>;
  asTextAria?: boolean;
  error?: any;
}

const Input = ({
  label,
  placeholder,
  classes,
  name,
  type = "text",
  register,
  asTextAria = false,
  error,
}: InputProps) => {
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur2 = () => setFocused(false);

  if (asTextAria) {
    return (
      <div className={clsx("relative", classes)}>
        <label className="input__label" htmlFor={name}>
          {label}
        </label>
        <textarea
          placeholder={placeholder}
          onFocus={onFocus}
          {...register(name)}
          onBlur={onBlur2}
          id={name}
          className="input !normal-case resize-none max-w-full"
          name={name}
        />
        <div
          className={clsx(
            "w-0 bg-platinum  left-0  h-[1.5px] transition-all duration-300",
            {
              "!w-full": focused,
            }
          )}
        ></div>
      </div>
    );
  }

  return (
    <div className={clsx("relative", classes)}>
      <label
        className={clsx("input__label", { "!text-red-600": error })}
        htmlFor={name}
      >
        {label}
      </label>
      <input
        onFocus={onFocus}
        {...register(name)}
        onBlur={onBlur2}
        id={name}
        placeholder={placeholder}
        className={clsx("input !normal-case", {
          "!text-red-600": error,
          "placeholder:text-red-600": error,
        })}
        name={name}
        type={type}
      />
      <div
        className={clsx(
          "w-0 bg-platinum  left-0  h-[1.5px] transition-all duration-300",
          {
            "!w-full": focused,
            "!bg-red-600": error,
          }
        )}
      ></div>
    </div>
  );
};

export default Input;
