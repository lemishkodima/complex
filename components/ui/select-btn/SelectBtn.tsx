"use client";
import clsx from "clsx";
import React from "react";
import "./selectBtn.scss";

interface OutlineBtnProps {
  children: React.ReactNode;
  classes?: string;
  value?: string;
  onClick?: () => void;
}

const SelectBtn = ({ children, classes, value, onClick }: OutlineBtnProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={clsx("selectBtn transition-colors ", classes)}
    >
      {children}
    </button>
  );
};

export default SelectBtn;
