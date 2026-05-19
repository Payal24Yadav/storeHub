// Framer Motion animation variants for reuse across the app
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.3 } },
};

export const fadeInDown = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export const fadeInRight = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.94 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } },
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export const pageTransition = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.3 } },
};

export const cardHover = {
  rest: { y: 0, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', borderColor: 'rgba(243, 244, 246, 1)' },
  hover: {
    y: -8,
    boxShadow: '0 20px 45px -12px rgba(11, 31, 92, 0.12)',
    borderColor: 'rgba(255, 122, 0, 0.25)',
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

export const glowPulse = {
  initial: { boxShadow: '0 0 5px rgba(255, 122, 0, 0.25)' },
  animate: {
    boxShadow: [
      '0 0 5px rgba(255, 122, 0, 0.25)',
      '0 0 25px rgba(255, 122, 0, 0.55)',
      '0 0 5px rgba(255, 122, 0, 0.25)',
    ],
    transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
  },
};
