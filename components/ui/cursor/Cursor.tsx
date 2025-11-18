"use client";

import { useEffect } from "react";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import "./cursor.scss";
import { motion, useMotionValue, useSpring } from "framer-motion";
import clsx from "clsx";
import { useMyContext } from "@/providers/CursorProvide";

export default function Cursor() {
  const { isHoverElement, rotation } = useMyContext();

  const mouse = {
    x: useMotionValue(0),

    y: useMotionValue(0),
  };

  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };

  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),

    y: useSpring(mouse.y, smoothOptions),
  };

  const manageMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;

    mouse.x.set(clientX);

    mouse.y.set(clientY);
  };

  useEffect(() => {
    window.addEventListener("mousemove", manageMouseMove);

    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
    };
  }, []);

  return (
    <div className={"cursorContainer z-[200]"}>
      <motion.div
        style={{
          left: smoothMouse.x,

          top: smoothMouse.y,
        }}
        className={clsx("cursor z-50", {
          cursorHover: isHoverElement,
        })}
      >
        <ArrowOutwardIcon
          className={clsx(
            "w-5 h-5 opacity-0 transition-opacity text-dark duration-[1.2s]",
            {
              "!opacity-100": isHoverElement,
              [rotation]: rotation,
            }
          )}
        />
      </motion.div>
    </div>
  );
}
