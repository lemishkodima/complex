import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import "./ticker.scss";
const TickerAnimation = () => {
  useEffect(() => {
    gsap.to(".scroll div", {
      xPercent: -100,
      duration: 30,
      ease: "linear",
      repeat: -1,
    });

    gsap.to(".scroll div:nth-child(2)", {
      xPercent: -200,
      duration: 30,
      ease: "linear",
      repeat: -1,
      delay: -15,
    });
  }, []);

  return (
    <section className="section">
      <div className="scroll">
        <div>
          Доллар по тридцать <span>5 секретов успешного дизайна </span>
          Двигай пиксели <span> Без комиссии и регистрации </span>
        </div>
        <div>
          Доллар по тридцать <span> 5 секретов успешного дизайна </span> Двигай
          пиксели <span> Без комиссии и регистрации </span>
        </div>
      </div>
    </section>
  );
};

export default TickerAnimation;
