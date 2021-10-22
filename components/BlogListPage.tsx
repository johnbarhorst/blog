import { PostMeta } from 'lib/posts';
import { ReactElement } from 'react';


export function BlogListPage({ allPostsMeta }: { allPostsMeta: PostMeta[]}):ReactElement {
  return (
    <main>
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

