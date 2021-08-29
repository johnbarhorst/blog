import { ReactElement } from 'react';
import style from 'styles/ProjectsPage.module.css';

export function ProjectsPage():ReactElement {
  return (
    <main className={style.main}>
      <h2>Digital Garden</h2>
      <section>
        <p>This is a place for small projects or ideas I&apos;ve had.</p>
      </section>
    </main>
  );
}