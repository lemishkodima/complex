export const slideUp = {
  initial: {
    y: "100%",
  },
  open: (i = 1) => ({
    y: "0%",
    transition: { duration: 0.8, delay: 0.01 * i },
  }),
  closed: {
    y: "100%",
    transition: { duration: 0.5 },
  },
};

export const slideUpQuick = {
  initial: {
    y: "5%",
    opacity: 0,
  },
  open: (i = 1) => ({
    y: "0%",
    transition: { duration: 0.5, delay: 0.04 * i },
  }),
  closed: {
    opacity: 0,
    y: "5%",
    transition: { duration: 0.5 },
  },
};

export const opacity = {
  initial: {
    opacity: 0,
  },
  open: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
  closed: {
    opacity: 0,
    transition: { duration: 0.5 },
  },
};
