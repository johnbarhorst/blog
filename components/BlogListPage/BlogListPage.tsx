import Link from 'next/link';
import { PostMeta } from 'lib/posts';
import { ReactElement } from 'react';
import style from './BlogListPage.module.css';

export function BlogListPage({ allPostsMeta }: { allPostsMeta: PostMeta[]}):ReactElement {
  return (
    <main className={style.main}>
      <section>
        <h1>Blog!</h1>
        <p>If you&apos;ve stumbled across this site early, please note these blogs are unfinished. I had to do some live testing and felt safe enough in my obscurity to go ahead and put these things live.</p>
      </section>
      <section>
        {allPostsMeta.map(({ id, title, description }) => (
          <Link href={`/blog/${id}`} key={id}>
            <a>
              <h3>{title}</h3>
              <p>{description}</p>
            </a>
          </Link>
        ))}
      </section>
    </main>
  );
}

