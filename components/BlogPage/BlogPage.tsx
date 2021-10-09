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
          code({ inline, className, children, ...props }: SyntaxHighlighterProps) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={darcula}
                language={match[1]}
                {...props}
              >{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
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