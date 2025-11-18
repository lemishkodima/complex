"use client";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import { FaPlus } from "react-icons/fa6";

interface AccordionProps {
  questions: { question: string; answer: string }[];
}

const AccordionComponent = ({ questions }: AccordionProps) => {
  const accordionTitle = useRef<any>([]);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".acc",
        start: "top 90%",
        end: "top 40%",
      },
    });

    scrollTl.fromTo(
      ".accordionItem",
      { translateY: 150 },
      { translateY: 0, stagger: { each: 0.3 }, duration: 0.5 }
    );
  }, []);
  return (
    <Accordion allowToggle>
      {questions.map((question, i) => (
        <AccordionItem
          key={i}
          className="mb-10 border-b border-platinum-10 pb-10 acc"
        >
          {({ isExpanded }) => (
            <>
              <div className="overflow-hidden ">
                <h5
                  className="accordionItem"
                  ref={(el) => (accordionTitle.current[i] = el)}
                >
                  <AccordionButton>
                    <Box className="text__medium-40 max-md:text__medium-20 inline flex-1 text-left text-gold">
                      {question.question}
                    </Box>
                    <div
                      className={clsx(
                        "flex-center h-10 w-10 rounded-full border border-platinum-10 transition-transform duration-500",
                        {
                          "rotate-45 bg-gold": isExpanded,
                        }
                      )}
                    >
                      <FaPlus className={clsx({ "text-dark": isExpanded })} />
                    </div>
                  </AccordionButton>
                </h5>
              </div>
              <AccordionPanel className="text__medium-20 pt-10">
                {question.answer}
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default AccordionComponent;
