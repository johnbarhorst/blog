import Link from 'next/link';
import { ReactElement } from 'react';
import { ActiveLink } from './ActiveLink';
import style from 'styles/Header.module.css';

export default function Header():ReactElement {
  return (
    <header className={style.header}>
      <h3><Link href='/'>John Barhorst</Link></h3>
      <nav className={style.nav}>
        <ActiveLink href='/'>Home</ActiveLink>
        <ActiveLink href='/projects'>Projects</ActiveLink>
        <ActiveLink href='/about'>About</ActiveLink>
        <ActiveLink href='/contact'>Get In Touch</ActiveLink>
      </nav>
    </header>
  );
}