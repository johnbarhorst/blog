import { PostMeta } from 'lib/posts';
import { ReactElement } from 'react';
import style from './BlogListPage.module.css';

export function BlogListPage({ allPostsMeta }: { allPostsMeta: PostMeta[]}):ReactElement {
  return (
    <main className={style.main}>
      <h1>Blog!</h1>
      <section>
        {allPostsMeta.map(({ id, title, description }) => (
          <a href={`/blog/${id}`} key={id}>
            <h3>{title}</h3>
            <p>{description}</p>
          </a>
        ))}
      </section>
    </main>
  );
}

