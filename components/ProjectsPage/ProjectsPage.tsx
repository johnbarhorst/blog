import { ProjectCard } from 'components/ProjectCard';
import { ReactElement } from 'react';
import style from './ProjectsPage.module.css';

export function ProjectsPage():ReactElement {
  return (
    <main>
      <h1 className='text_center'>Digital Garden</h1>
      <p className='text_center'>This is a place for small projects or ideas I&apos;ve had.</p>
      <section className={style.projects}>
        {/* <ProjectCard 
          href='projects/form'
          title='A Form of Fun'
          description='A practice in form styling and animation.'
        >
        </ProjectCard> */}
        <ProjectCard
          href='projects/dial'
          title='Animated Dial'
          description='A spinnable, animated dial selector.'
        >
        </ProjectCard>
      </section>
    </main>
  );
}