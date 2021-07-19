import { ReactElement } from 'react';
import style from 'styles/ProjectsPage.module.css';

export function ProjectsPage():ReactElement {
  return (
    <main className={style.main}>
      <h1>My Projects</h1>
      <section>
        <p>I have projects. They were good. I swear.</p>
      </section>
    </main>
  );
}