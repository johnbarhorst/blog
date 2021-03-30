import { ReactElement } from 'react';

export function HomePage(): ReactElement {
  return (
    <main>
      <h3>John Barhorst</h3>
      <p>Hi! I&apos;m John, a web developer in Minneapolis, MN.</p>
      <p>I build fast, responsive, and accessible websites and apps in exchange for money.</p>
      <h4>My Main Tech</h4>
      <ul>
        <li>React.js</li>
        <li>Next.js</li>
        <li>Node/Express</li>
        <li>Mongoose/MongoDB</li>
        <li>Framer Motion</li>
        <li>Styled Components</li>
      </ul>
      <h4>I like to dabble in</h4>
      <ul>
        <li>Svelte</li>
        <li>TypeScript</li>
        <li>Sass</li>
      </ul>
    </main>
  );
}


