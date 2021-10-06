import { ReactElement } from 'react';
import ReactMarkdown from 'react-markdown';

export function BlogPage({ content }: {content: string}):ReactElement {
  return (
    <main>
      <ReactMarkdown>{content}</ReactMarkdown>
    </main>
  );
}