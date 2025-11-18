"use client";
import clsx from "clsx";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "./navLink.scss";
import { IoMdArrowForward } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import { pageTransitionIn } from "@/components/shared/transition-page/animations";
import { useMyContext } from "@/providers/CursorProvide";

interface NavLinkProps {
  children?: React.ReactNode;
  classes?: string;
  arrow?: boolean;
  arrowDirection?: "top-right" | "bottom-right";
  color?: "text-gold" | "text-platinum" | "text-platinum-10";
  href?: string;
  swapAnimation?: boolean;
  passHref?: boolean;
  target?: string;
}

const NavLink = ({
  children,
  classes,
  arrow = true,
  arrowDirection = "bottom-right",
  color = "text-platinum",
  href = "/",
  swapAnimation = false,
  passHref = false,
  target = "_self",
}: NavLinkProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { setPathName } = useMyContext();
  const externalLink = /https?:\/\//.test(href);
  const bol = Boolean(href.includes("/") && !externalLink);
  const swapPage = (e: any) => {
    e.preventDefault();
    if (href === pathname) return;
    let pathForAnimation = href;
    if (href === "/projects") {
      pathForAnimation = "/services"; // Встановлюємо /services для контексту
    }
    

    setPathName(pathForAnimation);

    pageTransitionIn();
    setTimeout(() => {
      router.push(href);
    }, 400);
  };

  if (href.includes("/") && !externalLink) {
    return (
      <>
        {!swapAnimation ? (
          <a
            onClick={(e) => swapPage(e)}
            href={href}
            className={clsx(
              "text__medium-14 flex  uppercase hover:text-silver transition-colors",
              classes,
              color
            )}
          >
            <div className="flex-center gap-2">
              {arrow && (
                <IoMdArrowForward
                  className={clsx(classes, {
                    "-rotate-45": arrowDirection === "top-right",
                    "rotate-45": arrowDirection === "bottom-right",
                  })}
                />
              )}
              {children || "Add your text"}
            </div>
          </a>
        ) : (
          <a
            onClick={(e) => swapPage(e)}
            href={href}
            className={clsx(
              "text__medium-14 flex swipeLink group uppercase ",
              classes,
              color
            )}
          >
            <span className="!flex gap-2">
              {arrow && (
                <IoMdArrowForward
                  className={clsx("translate-y-[15%]", classes, {
                    "-rotate-45": arrowDirection === "top-right",
                    "rotate-45": arrowDirection === "bottom-right",
                  })}
                />
              )}
              {children}
            </span>
            <div className="swipeLinkAfter group-hover:translate-y-[0] gap-2">
              {arrow && (
                <IoMdArrowForward
                  className={clsx("translate-y-[15%]", classes, {
                    "-rotate-45": arrowDirection === "top-right",
                    "rotate-45": arrowDirection === "bottom-right",
                  })}
                />
              )}
              {children}
            </div>
          </a>
        )}
      </>
    );
  }

  return (
    <>
      {!swapAnimation ? (
        <Link
          href={href}
          target={target}
          passHref={passHref}
          className={clsx(
            "text__medium-14 flex  uppercase hover:text-silver transition-colors",
            classes,
            color
          )}
        >
          <div className="flex-center gap-2">
            {arrow && (
              <IoMdArrowForward
                className={clsx(classes, {
                  "-rotate-45": arrowDirection === "top-right",
                  "rotate-45": arrowDirection === "bottom-right",
                })}
              />
            )}
            {children || "Add your text"}
          </div>
        </Link>
      ) : (
        <Link
          passHref={passHref}
          target={target}
          href={href}
          className={clsx(
            "text__medium-14 flex swipeLink group uppercase ",
            classes,
            color
          )}
        >
          <span className="!flex gap-2">
            {arrow && (
              <IoMdArrowForward
                className={clsx("translate-y-[15%]", classes, {
                  "-rotate-45": arrowDirection === "top-right",
                  "rotate-45": arrowDirection === "bottom-right",
                })}
              />
            )}
            {children}
          </span>
          <div className="swipeLinkAfter group-hover:translate-y-[0] gap-2">
            {arrow && (
              <IoMdArrowForward
                className={clsx("translate-y-[15%]", classes, {
                  "-rotate-45": arrowDirection === "top-right",
                  "rotate-45": arrowDirection === "bottom-right",
                })}
              />
            )}
            {children}
          </div>
        </Link>
      )}
    </>
  );
};

export default NavLink;
