import { motion } from 'framer-motion';
import { ReactElement, ReactNode } from 'react';

type Props = {
  children: ReactNode,
  direction?: number,
  distance?: number
}

export function Slide({ children, direction = 1, distance = 200 }: Props):ReactElement {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: direction * (distance * -1)
      }}
      animate={{
        opacity: 1,
        x: 0
      }}
      exit={{
        opacity: 0,
        x: direction * distance
      }}
    >
      {children}
    </motion.div>
  );
}