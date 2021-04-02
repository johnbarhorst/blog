import { ReactElement, ReactNode } from 'react';
import { motion } from 'framer-motion';

type Props = {
  children: ReactNode
}

const variants = {
  initial: {
    
  },
  animate: {

  },
  exit: {

  }
};

export function Stagger({ children }: Props):ReactElement {
  return (
    <motion.div
      variants={variants}
      initial='initial'
      animate='animate'
      exit='exit'
    >
      {children}
    </motion.div>
  );
}