import { BlogPage } from 'components/BlogPage';
import { getAllPostIds, getPostData, PostMeta } from 'lib/posts';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ReactElement } from 'react';


export default function BlogPost({ postData }: {postData: PostMeta}):ReactElement {
  const { content } = postData;
  
  return <BlogPage content={content} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if(typeof(params.id) === 'string') {
    const postData = getPostData(params.id);
    return {
      props: {
        postData
      }
    };
  }
  throw new Error(`Id paramater must be a string, instead got ${typeof(params.id)}`);
};