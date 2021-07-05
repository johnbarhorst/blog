import Link from 'next/link';
import { ReactElement } from 'react';
import { ActiveLink } from './ActiveLink';
import style from 'styles/Header.module.css';
import { AnimateSharedLayout, motion, Variants, AnimatePresence } from 'framer-motion';
import useToggle from 'hooks/useToggle';
import Hamburger from './Hamburger';

const menuVariants: Variants = {
  initial: {
    left: '-100%'
  },
  animate: {
    left: 0
  },
  exit: {
    left: '-100%'
  }
};

const links = [
  {
    href:'/',
    text:'Home'
  },
  {
    href:'/projects',
    text:'My Work'
  },
  {
    href:'/about',
    text:'About'
  },
  {
    href:'/contact',
    text:'Get In Touch'
  }
];

export default function Header():ReactElement {
  const { isToggled: isOpen, toggle: toggleOpen } = useToggle(false);
  return (
    <header className={style.header}>
      <h3><Link href='/'>John Barhorst</Link></h3>
      <AnimateSharedLayout>
        <motion.nav className={style.nav}>
          {links.map(link => <ActiveLink href={link.href} text={link.text} key={link.text} />)}
        </motion.nav>
        <Hamburger isOpen={isOpen} toggleOpen={toggleOpen} />
      </AnimateSharedLayout>
      <AnimatePresence>
        {isOpen && 
          <motion.nav 
            variants={menuVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            className={style.mobileNav}>
            {links.map(link => <ActiveLink href={link.href} text={link.text} key={link.text} />)}
          </motion.nav>}
      </AnimatePresence>
    </header>
  );
}