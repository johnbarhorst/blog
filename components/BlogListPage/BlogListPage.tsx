import Link from 'next/link';
import { PostMeta } from 'lib/posts';
import { ReactElement } from 'react';
import style from './BlogListPage.module.css';

export function BlogListPage({ allPostsMeta }: { allPostsMeta: PostMeta[]}):ReactElement {
  return (
    <main className={style.main}>
      <section className={style.banner}>
        <h1>Blog!</h1>
        <p>These are my musings on some recent projects. Each blog is still a work in progress at the moment, but you&apos;re welcome to take a sneak peek!</p>
      </section>
      <section className={style.blog_list} >
        {allPostsMeta.filter(({ title }) => title !== 'BI Worldwide').map(({ id, title, description }) => (
          <Link href={`/blog/${id}`} key={id}>
            <a className={style.blog_card}>
              <h3>{title}</h3>
              <p>{description}</p>
            </a>
          </Link>
        ))}
      </section>
    </main>
  );
}

