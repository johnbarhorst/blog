import { PostMeta } from 'lib/posts';
import { ReactElement } from 'react';


export function BlogPage({ allPostsData }: { allPostsData: PostMeta[]}):ReactElement {
  return (
    <main>
      <h1>Blog!</h1>
      <section>
        {allPostsData.map(({ id, title }) => (
          <li key={id}><a href={`/blog/${id}`}>{title}</a></li>
        ))}
      </section>
    </main>
  );
}

