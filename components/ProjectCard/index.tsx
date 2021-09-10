import { ReactElement, ReactNode } from 'react';
import style from './ProjectCard.module.css';

interface Props {
  href: string,
  children: ReactNode
}

export function ProjectCard({ href, children }: Props):ReactElement {
  return (
    <a href={href} className={style.card} >
      <div>
        {children}
      </div>
    </a>
  );
}