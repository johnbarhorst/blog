import { ReactElement } from 'react';
import style from 'styles/Home.module.css';
import { FadeIn } from './FadeIn';

export function HomePage(): ReactElement {
  return (
    <FadeIn>
      <main className={style.main}>
        <h3>John Barhorst</h3>
        <p>Hi! I&apos;m John, a web developer in Minneapolis, MN.</p>
        <p>I build fast, responsive, and accessible websites and apps in exchange for money.</p>
        <div className={style.wrapper}>
          <section>
            <h4>My Main Tech</h4>
            <ul>
              <li>React.js</li>
              <li>Next.js</li>
              <li>Node/Express</li>
              <li>Mongoose/MongoDB</li>
              <li>Framer Motion</li>
              <li>Styled Components</li>
            </ul>
          </section>
          <section>
            <h4>I like to dabble in</h4>
            <ul>
              <li>Svelte</li>
              <li>TypeScript</li>
              <li>Sass</li>
            </ul>
          </section>
        </div>
      </main>
    </FadeIn>
  );
}


