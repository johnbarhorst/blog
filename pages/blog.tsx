import { BlogPage } from 'components/BlogPage';
import { getPosts } from 'lib/getPosts';
import { ReactElement } from 'react';

export default function Blog({ allPostsData }: { allPostsData: any}):ReactElement {
  return <BlogPage allPostsData={allPostsData} />;
}

export async function getStaticProps() {
  const allPostsData = getPosts();
  return {
    props: {
      allPostsData
    }
  };
}