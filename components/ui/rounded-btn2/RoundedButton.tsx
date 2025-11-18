"use client";

import React from "react";
import { useEffect, useRef } from "react";
import "./style.scss";
import gsap from "gsap";
import Magnetic from "../magnetic/MagneticElement";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import clsx from "clsx";
export default function RoundedButton({
  //@ts-ignore
  children,
  isActive = false,
  backgroundColor = "#B49B56",
  ...attributes
}) {
  const circle = useRef(null);
  let timeline = useRef(null);
  //@ts-ignore
  let timeoutId = null;
  useEffect(() => {
    //@ts-ignore
    timeline.current = gsap.timeline({ paused: true });
    //@ts-ignore
    timeline.current
      .to(
        circle.current,
        { top: "-25%", width: "150%", duration: 0.4, ease: "power3.in" },
        "enter"
      )
      .to(
        circle.current,
        { top: "-150%", width: "125%", duration: 0.25 },
        "exit"
      );
  }, []);

  const manageMouseEnter = () => {
    //@ts-ignore
    if (timeoutId) clearTimeout(timeoutId);
    //@ts-ignore
    timeline.current.tweenFromTo("enter", "exit");
  };

  const manageMouseLeave = () => {
    timeoutId = setTimeout(() => {
      //@ts-ignore
      timeline.current.play();
    }, 300);
  };

  return (
    <Magnetic>
      <div
        className={clsx("roundedButton group gap-2.5", {
          "!text-dark !bg-gold": isActive,
        })}
        style={{ overflow: "hidden" }}
        onMouseEnter={() => {
          manageMouseEnter();
        }}
        onMouseLeave={() => {
          manageMouseLeave();
        }}
        {...attributes}
      >
        <ArrowForwardIcon
          style={{ fontFamily: "Material Icons" }}
          className={clsx(
            "w-4 z-10 h-4 transition-colors duration-300 text-gold delay-200 group-hover:text-dark group-active:text-dark",
            { "!text-dark": isActive }
          )}
        />
        {children}
        <div
          ref={circle}
          style={{ backgroundColor }}
          className={"circle !text__regular-14"}
        ></div>
      </div>
    </Magnetic>
  );
}
