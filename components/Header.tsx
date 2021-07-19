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
    left: 0,
    transition: {
      duration: .1,
      when: 'beforeChildren',
      staggerChildren: .1
    }
  },
  exit: {
    left: '-100%',
    transition: {
      duration: .1,
      when: 'afterChildren',
      staggerChildren: .1
    }
  }
};

const linkVariants: Variants = {
  initial: {
    x: '-100%'
  },
  animate: {
    x: 0
  },
  exit: {
    x: '-100%'
  }
};

const links = [
  {
    href:'/',
    text:'Home'
  },
  {
    href: '/blog',
    text: 'Blog'
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
  const { isToggled: isOpen, toggle } = useToggle(false);
  return (
    <header className={style.header}>
      <h3><Link href='/'>John Barhorst</Link></h3>
      <AnimateSharedLayout>
        <motion.nav className={style.nav}>
          {links.map(link => <ActiveLink href={link.href} text={link.text} key={link.text} />)}
        </motion.nav>
        <Hamburger isOpen={isOpen} toggleOpen={toggle} />
      </AnimateSharedLayout>
      <AnimatePresence>
        {isOpen && 
          <motion.nav 
            variants={menuVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            className={style.mobileNav}>
            <ul>
              {links.map(link => 
                <motion.li
                  key={link.text}
                  variants={linkVariants}
                  onClick={toggle}
                >
                  <ActiveLink href={link.href} text={link.text} />
                </motion.li>
              )}
            </ul>
          </motion.nav>}
      </AnimatePresence>
    </header>
  );
}