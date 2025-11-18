"use client";
import React from "react";
import "./notfound.scss";
import NavLink from "../ui/nav-link/NavLink";

const NotFound = () => {
  // const swapPage = (href: string) => {
  //   setPathName(href);

  //   pageTransitionIn();
  //   setTimeout(() => {
  //     router.push("/project/1");
  //   }, 400);
  // };
  return (
    <div className="not__found">
      <div className="container__main">
        <div className="container__top max-xs:text__medium-30 max-sm:text__medium-30 max-md:text__medium-30 max-lg:text__medium-40 text__medium-40">
          This page seems to have slipped through a time portal.
        </div>
        <div className="container__bottom text__medium-20">
          We apologize for any disruption to the space-tim continuum. Feel free
          to journey back to our homepage.
        </div>
        <NavLink href="/">GO BACK HOME</NavLink>
      </div>
    </div>
  );
};

export default NotFound;
