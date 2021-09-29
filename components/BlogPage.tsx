import { PostMeta } from 'lib/posts';
import { ReactElement } from 'react';


export function BlogPage({ allPostsData }: { allPostsData: PostMeta[]}):ReactElement {
  return (
    <main>
      <h1>Blog!</h1>
      <section>
        {allPostsData.map(({ id, title, description }) => (
          <a href={`/blog/${id}`} key={id}>
            <h3>{title}</h3>
            <p>{description}</p>
          </a>
        ))}
      </section>
    </main>
  );
}

