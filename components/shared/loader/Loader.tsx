"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import styles from "./loader.module.scss";
import { introAnimation, collapseWords, progressAnimation } from "./animations";
import { loaderWords } from "@/lib/data";
import clsx from "clsx";
import gsap from "gsap";

const Loader = () => {
  const loaderRef = useRef(null);
  const wordGroupsRef = useRef(null);
  const [loaderFinished, setLoaderFinished] = useState(false);
  const [timeline, setTimeline] = useState<any>(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setLoaderFinished(true);
        },
      });
      setTimeline(tl);
    });

    return () => context.revert();
  }, []);

  useEffect(() => {
    timeline &&
      timeline
        .add(introAnimation(wordGroupsRef))
        // .add(progressAnimation(progressRef, progressNumberRef), 0)
        .add(collapseWords(loaderRef), "-=1");
  }, [timeline]);

  if (loaderFinished) {
    return;
  }

  return (
    <div className={styles.loader__wrapper}>
      {/* <div className={styles.loader__progressWrapper}>
        <div
          className={clsx(styles.loader__progress, "bg-dark text__medium-20 ")}
          ref={progressRef}
        ></div>
        <span
          className={clsx(
            styles.loader__progressNumber,
            "text-platinum text__medium-30 !max-md:translate-x-20"
          )}
          ref={progressNumberRef}
        >
          0
        </span>
      </div> */}
      <div className={styles.loader} ref={loaderRef}>
        <div className={styles.loader__words}>
          <div className={styles.loader__overlay}></div>
          <div ref={wordGroupsRef} className={styles.loader__wordsGroup}>
            {loaderWords.map((word, index) => {
              return (
                <span
                  key={index}
                  className={clsx(
                    styles.loader__word,
                    "text-dark text__medium-40"
                  )}
                >
                  {word}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
