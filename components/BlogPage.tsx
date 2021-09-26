import { PostsList } from 'lib/getPosts';
import { ReactElement } from 'react';


export function BlogPage({ allPostsData }: { allPostsData: PostsList[]}):ReactElement {
  return (
    <main>
      <h1>Blog!</h1>
      <section>
        {allPostsData.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
      </section>
    </main>
  );
}

