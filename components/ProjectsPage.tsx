import { ReactElement } from 'react';
import style from 'styles/ProjectsPage.module.css';

export function ProjectsPage():ReactElement {
  return (
    <main className={style.main}>
      <h2>My Projects</h2>
      <section>
        <p>I have projects. They are good. I swear. Now for a longer sentence for testing purposes,</p>
      </section>
    </main>
  );
}