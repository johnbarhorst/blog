import { BlogPage } from 'components/BlogPage';
import { getPosts, PostMeta } from 'lib/posts';
import { GetStaticProps } from 'next';
import { ReactElement } from 'react';

export default function Blog({ allPostsData }: { allPostsData: PostMeta[]}):ReactElement {
  return <BlogPage allPostsData={allPostsData} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getPosts();
  return {
    props: {
      allPostsData
    }
  };
};