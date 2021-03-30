import { motion } from 'framer-motion';
import { ReactElement, ReactNode } from 'react';

const variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1
    }
  },
  exit: {
    opacity: 0
  }
};

export function FadeIn({ children }: {children: ReactNode}):ReactElement {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}