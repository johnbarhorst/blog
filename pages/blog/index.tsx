import { BlogListPage } from 'components/BlogListPage';
import { getPosts, PostMeta } from 'lib/posts';
import { GetStaticProps } from 'next';
import { ReactElement } from 'react';

export default function Blog({ allPostsData }: { allPostsData: PostMeta[]}):ReactElement {
  return <BlogListPage allPostsData={allPostsData} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getPosts();
  return {
    props: {
      allPostsData
    }
  };
};