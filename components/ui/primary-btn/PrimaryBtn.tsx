import clsx from "clsx";
import Link from "next/link";
import React from "react";
import "./primaryBtn.scss";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
interface OutlineBtnProps {
  asLink?: boolean;
  children: React.ReactNode;
  href?: string;
  classes?: string;
  type?: "submit" | "button";
}

const PrimaryBtn = ({
  asLink,
  children,
  href,
  classes,
  type = "button",
}: OutlineBtnProps) => {
  if (asLink && href) {
    return (
      <Link className={clsx("outlineBtn group", classes)} href={href}>
        <ArrowForwardIcon className="w-4 h-4 transition-colors duration-300 text-gold group-active:text-dark" />
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={clsx("outlineBtn group", classes)}>
      <ArrowForwardIcon className="w-4 h-4 transition-colors duration-300 text-gold group-active:text-dark" />
      {children}
    </button>
  );
};

export default PrimaryBtn;
