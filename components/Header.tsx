import Link from 'next/link';
import { ReactElement } from 'react';
import { ActiveLink } from './ActiveLink';
import style from 'styles/Header.module.css';
import { AnimateSharedLayout } from 'framer-motion';

export default function Header():ReactElement {
  return (
    <header className={style.header}>
      <h3><Link href='/'>John Barhorst</Link></h3>
      <AnimateSharedLayout>
        <nav className={style.nav}>
          <ActiveLink href='/'>Home</ActiveLink>
          <ActiveLink href='/projects'>My Work</ActiveLink>
          <ActiveLink href='/about'>About</ActiveLink>
          <ActiveLink href='/contact'>Get In Touch</ActiveLink>
        </nav>
      </AnimateSharedLayout>
    </header>
  );
}