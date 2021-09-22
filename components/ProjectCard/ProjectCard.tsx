import { ReactElement, ReactNode } from 'react';
import style from './ProjectCard.module.css';

interface Props {
  href: string,
  title: string,
  description: string,
  children?: ReactNode
}

export function ProjectCard({ href, title, description, children }: Props):ReactElement {
  return (
    <a href={href} className={style.wrapper}>
      <div className={style.card}>
        <h3>{title}</h3>
        {children}
        <p>{description}</p>
      </div>
    </a>
  );
}