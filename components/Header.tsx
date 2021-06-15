import Link from 'next/link';
import { ReactElement } from 'react';
import { ActiveLink } from './ActiveLink';
import style from 'styles/Header.module.css';
import { AnimateSharedLayout, motion } from 'framer-motion';
import useToggle from 'hooks/useToggle';

const topbarVariants = {
  open: {
    y: 8,
    rotate: 45
  },
  closed: {
    y: 0,
    rotate: 0 
  }
};

const midbarVariants = {
  open: {
    opacity: 0,
    transition: {
      duration: 0
    }
  },
  closed: {
    opacity: 1
  }
};

const bottombarVariants = {
  open: {
    y: -8,
    rotate: -45
  },
  closed: {
    y: 0
  }
};

export default function Header():ReactElement {
  const { isToggled: isOpen, toggle: toggleOpen, setToggle } = useToggle(false);
  return (
    <header className={style.header}>
      <h3><Link href='/'>John Barhorst</Link></h3>
      <AnimateSharedLayout>
        <nav className={style.nav}>
          <ActiveLink href='/' text='Home' />
          <ActiveLink href='/projects' text='My Work' />
          <ActiveLink href='/about' text='About' />
          <ActiveLink href='/contact' text='Get In Touch' />
        </nav>
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
      </AnimateSharedLayout>
    </header>
  );
}