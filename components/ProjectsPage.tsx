import { ReactElement } from 'react';
import style from 'styles/ProjectsPage.module.css';

export function ProjectsPage():ReactElement {
  return (
    <main className={style.main}>
      <h1>Digital Garden</h1>
      <section>
        <p>This is a place for small projects or ideas I&apos;ve had.</p>
      </section>
    </main>
  );
}