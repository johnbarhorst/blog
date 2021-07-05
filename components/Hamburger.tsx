import { motion, Variants } from 'framer-motion';
import { ReactElement } from 'react';
import style from 'styles/Hamburger.module.css';

type Props = {
  isOpen: boolean,
  toggleOpen: () => void
}

const topbarVariants: Variants = {
  open: {
    y: 8,
    rotate: 45
  },
  closed: {
    y: 0,
    rotate: 0 
  }
};

const midbarVariants: Variants = {
  open: {
    opacity: 0,
    transition: {
      duration: 0
    },
  },
  closed: {
    opacity: 1
  }
};

const bottombarVariants: Variants = {
  open: {
    y: -8,
    rotate: -45
  },
  closed: {
    y: 0
  }
};

export default function Hamburger({ isOpen, toggleOpen }: Props):ReactElement {
  return (
    <motion.button 
      type='button' 
      className={style.hamburger}
      onClick={toggleOpen}
    >
      <motion.span 
        className={style.bar} 
        variants={topbarVariants}
        animate={isOpen ? 'open' : 'closed'}
      ></motion.span>
      <motion.span 
        className={style.bar}
        variants={midbarVariants}
        animate={isOpen ? 'open' : 'closed'}
      ></motion.span>
      <motion.span 
        className={style.bar}
        variants={bottombarVariants}
        animate={isOpen ? 'open' : 'closed'}
      ></motion.span>
    </motion.button>
  );
}