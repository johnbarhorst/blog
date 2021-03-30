import Link from 'next/link';
import { ReactElement } from 'react';
import { ActiveLink } from './ActiveLink';

export default function Header():ReactElement {
  return (
    <header>
      <h3><Link href='/'>John Barhorst</Link></h3>
      <nav>
        <ActiveLink href='/'>Home</ActiveLink>
        <ActiveLink href='/projects'>Projects</ActiveLink>
        <ActiveLink href='/about'>About</ActiveLink>
        <ActiveLink href='/contact'>Get In Touch</ActiveLink>
      </nav>
    </header>
  );
}