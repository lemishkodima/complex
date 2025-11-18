  import gsap from "gsap";

  // Animation - Page transition In
  export function pageTransitionIn() {
    var tl = gsap.timeline();

    tl.set(".loading-screen", {
      top: "100%",
    });

    tl.set(".loading-words", {
      opacity: 0,
      y: 0,
    });

    tl.set("html", {
      cursor: "wait",
    });

    if (window.innerWidth > 540) {
      tl.set(".loading-screen .rounded-div-wrap.bottom", {
        height: "10vh",
      });
    } else {
      tl.set(".loading-screen .rounded-div-wrap.bottom", {
        height: "5vh",
      });
    }

    tl.to(".loading-screen", {
      duration: 0.4,
      top: "0%",
      ease: "Power4.easeIn",
    });

    if (window.innerWidth > 540) {
      tl.to(
        ".loading-screen .rounded-div-wrap.top",
        {
          duration: 0.3,
          height: "10vh",
          ease: "Power4.easeIn",
        },
        "=-.4"
      );
    } else {
      tl.to(
        ".loading-screen .rounded-div-wrap.top",
        {
          duration: 0.3,
          height: "10vh",
          ease: "Power4.easeIn",
        },
        "=-.4"
      );
    }

    tl.to(".loading-words", {
      duration: 0.7,
      opacity: 1,
      y: -50,
      ease: "Power4.easeOut",
      delay: 0.04,
    });

    tl.set(".loading-screen .rounded-div-wrap.top", {
      height: "0vh",
    });

    // tl.to(
    //   ".loading-screen",
    //   {
    //     duration: 0.7,
    //     top: "-100%",
    //     ease: "Power3.easeInOut",
    //   },
    //   "=-.1"
    // );

    // tl.to(
    //   ".loading-words",
    //   {
    //     duration: 0.5,
    //     opacity: 0,
    //     ease: "linear",
    //   },
    //   "=-.7"
    // );

    // tl.to(
    //   ".loading-screen .rounded-div-wrap.bottom",
    //   {
    //     duration: 0.7,
    //     height: "0",
    //     ease: "Power3.easeInOut",
    //   },
    //   "=-.5"
    // );

    // tl.set(
    //   "html",
    //   {
    //     cursor: "auto",
    //   },
    //   "=-0.5"
    // );

    // if (window.innerWidth > 540) {
    //   tl.set(".loading-screen .rounded-div-wrap.bottom", {
    //     height: "10vh",
    //   });
    // } else {
    //   tl.set(".loading-screen .rounded-div-wrap.bottom", {
    //     height: "5vh",
    //   });
    // }
    //   tl.fromTo(
    //     "main",
    //     { translateY: 200 },
    //     {
    //       duration: 0.85,
    //       translateY: 0,
    //       ease: "Power3.easeInOut",
    //     },
    //     "=-.4"
    //   );

    // tl.set(".loading-screen", {
    //   top: "100%",
    // });

    // tl.set(".loading-words", {
    //   opacity: 0,
    // });
  }

  export function pageTransitionOut() {
    var tl = gsap.timeline();
    // tl.set(".loading-screen .rounded-div-wrap.top", {
    //   height: "0vh",
    // });

    tl.to(
      ".loading-screen",
      {
        duration: 0.7,
        top: "-100%",
        ease: "Power3.easeInOut",
      },
      "=-.1"
    );

    tl.to(
      ".loading-words",
      {
        duration: 0.5,
        opacity: 0,
        ease: "linear",
      },
      "=-.7"
    );

    tl.to(
      ".loading-screen .rounded-div-wrap.bottom",
      {
        duration: 0.7,
        height: "0",
        ease: "Power3.easeInOut",
      },
      "=-.5"
    );

    tl.set(
      "html",
      {
        cursor: "auto",
      },
      "=-0.5"
    );

    // if (window.innerWidth > 540) {
    //   tl.set(".loading-screen .rounded-div-wrap.bottom", {
    //     height: "10vh",
    //   });
    // } else {
    //   tl.set(".loading-screen .rounded-div-wrap.bottom", {
    //     height: "5vh",
    //   });
    // }
    tl.fromTo(
      "main",
      { translateY: 50, opacity: 0.7 },
      {
        duration: 0.95,
        opacity: 1,
        translateY: 0,
        ease: "Power3.easeInOut",
      },
      "=-.9"
    );

    tl.set(".loading-screen", {
      top: "100%",
    });

    tl.set(".loading-words", {
      opacity: 0,
    });

    /////////////
    // if (window.innerWidth > 540) {
    //   tl.set("main .once-in", {
    //     y: "50vh",
    //   });
    // } else {
    //   tl.set("main .once-in", {
    //     y: "20vh",
    //   });
    // }

    // tl.to("main .once-in", {
    //   duration: 0.8,
    //   y: "0vh",
    //   stagger: 0.05,
    //   ease: "Expo.easeOut",
    //   delay: 0.6,
    //   clearProps: "true",
    // });
  }
