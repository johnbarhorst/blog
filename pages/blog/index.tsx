import { BlogListPage } from 'components/BlogListPage';
import { getPosts, PostMeta } from 'lib/posts';
import { GetStaticProps } from 'next';
import { ReactElement } from 'react';

export default function Blog({ allPostsMeta }: { allPostsMeta: PostMeta[]}):ReactElement {
  return <BlogListPage allPostsMeta={allPostsMeta} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsMeta = getPosts();
  return {
    props: {
      allPostsMeta
    }
  };
};