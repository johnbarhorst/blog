import { BlogPage } from 'components/BlogPage';
import { getPosts, PostsList } from 'lib/getPosts';
import { GetStaticProps } from 'next';
import { ReactElement } from 'react';

export default function Blog({ allPostsData }: { allPostsData: PostsList[]}):ReactElement {
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