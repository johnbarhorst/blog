import { getAllPostIds, getPostData, PostMeta } from 'lib/posts';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ReactElement } from 'react';
import { Prism as SyntaxHighlighter, SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import ReactMarkdown from 'react-markdown';

export default function BlogPost({ postData }: {postData: PostMeta}):ReactElement {
  const { content } = postData;
  
  return (
    <main>
      <ReactMarkdown
        components={{
          code({ inline, className, children, ...props }: SyntaxHighlighterProps) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={tomorrow}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }
        }}
      >{content}</ReactMarkdown>
    </main>
  );
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