import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Modal } from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}

const backdropVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      delayChildren: 0.2,
    },
  },
};

const modalVariant = {
  hidden: {
    y: "30vh",
  },
  visible: {
    y: "-30vh",
    transition: {
      type: "spring",
      stiffness: 70,
    },
  },
};

export const ModalComponent: FC<Props> = ({ isOpen, setIsOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          data-scroll
          data-scroll-sticky
          data-scroll-to
          data-scroll-target="#scroll-container"
          className="bg-[rgb(1, 1, 1)] fixed  h-screen flex-center z-50"
          variants={backdropVariant}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="text-dark  relative max-w-[400px] p-10 h-[300px] bg-platinum"
            variants={modalVariant}
          >
            <h1>Modal Header</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
              reprehenderit dolores iure facilis libero repellendus pariatur,
              totam voluptate magnam dolorem assumenda soluta. Repellendus
              praesentium, ducimus corporis ab odio dignissimos quam?
            </p>
            <motion.div
              whileHover={{ rotate: 180 }}
              className="absolute top-5 right-5 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <div>X</div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
