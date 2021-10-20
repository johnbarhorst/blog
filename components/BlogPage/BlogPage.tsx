import { ReactElement } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter, SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import style from './BlogPage.module.css';

export function BlogPage({ content }: {content: string}):ReactElement {
  return (
    <main className={style.main}>
      <ReactMarkdown 
        skipHtml
        components={{
          // inline is a either true or undefined. undefined = code block, true = inline backticked code.
          // className is either undefined, or 'language-somelanguage'
          code({ inline, className, children, ...props }: SyntaxHighlighterProps) {
            // match returns an array, or null. example of one on a ts code block: 
            // ['language-ts', 'ts', index: 0, input: 'language-ts', groups: undefined]
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={darcula}
                language={match[1]}
                {...props}
              >{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
            ) : (
              <code className={style.code} {...props}>
                {children}
              </code>
            );
          }
        }}
      >{content}</ReactMarkdown>
    </main>
  );
}