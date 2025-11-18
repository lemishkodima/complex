"use client";

import "./pageTransition.scss";

import clsx from "clsx";
import { useMyContext } from "@/providers/CursorProvide";
const PageTransition = () => {
  const { pathNameAddress = "" } = useMyContext();

  // useEffect(() => {
  //   pageTransitionOut();
  //   pageTransitionIn();
  // }, []);

  return (
    <div className="loading-container">
      <div className={clsx("loading-screen", {})}>
        <div className="rounded-div-wrap top">
          <div className="rounded-div"></div>
        </div>
        <div className="loading-words">
          <h2 className="active">
            <div className=" text__medium-40 capitalize flex items-center gap-2">
              {pathNameAddress?.length < 2
                ? "Home"
                : pathNameAddress.replaceAll("/", "")}
            </div>
          </h2>
        </div>
        <div className="rounded-div-wrap bottom">
          <div className="rounded-div"></div>
        </div>
      </div>
    </div>
  );
};

export default PageTransition;
