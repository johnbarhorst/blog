import { ReactElement } from 'react';
import style from './AboutMe.module.css';

export function AboutMePage():ReactElement {
  return (
    <main className={style.main}>
      <h1>More About Me.</h1>
      <p>
        I&apos;ve been building for the web since 2015. While I primarily have focused on react based web development, I enjoy learning all things web related.</p>
    </main>
  );
}