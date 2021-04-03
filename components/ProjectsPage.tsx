import { ReactElement } from 'react';
import { FadeIn } from './FadeIn';
import { ImplodingText } from './ImplodingText';
import style from 'styles/ProjectsPage.module.css';

export function ProjectsPage():ReactElement {
  return (
    <FadeIn>
      <main className={style.main}>
        <h1>My Projects</h1>
        <section>
          <p>
            <ImplodingText string={'This is only a test.'}/>
          </p>
        </section>
      </main>
    </FadeIn>
  );
}