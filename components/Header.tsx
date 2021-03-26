import Link from 'next/link';
import { ReactElement } from 'react';

export default function Header():ReactElement {
  return (
    <header>
      <h3>John Barhorst</h3>
      <nav>
        <Link href='/'>Home</Link>
        <Link href='/projects'>Projects</Link>
        <Link href='/blog'>Blog</Link>
      </nav>
    </header>
  );
}