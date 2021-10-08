import { ReactElement } from 'react';
import ReactMarkdown from 'react-markdown';
import style from './BlogPage.module.css';

export function BlogPage({ content }: {content: string}):ReactElement {
  return (
    <main className={style.main}>
      <ReactMarkdown skipHtml >{content}</ReactMarkdown>
    </main>
  );
}