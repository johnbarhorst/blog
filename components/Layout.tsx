
import Head from 'next/head';
import { ReactElement, ReactNode } from 'react';
import { Footer } from './Footer';

export function Layout({ children }: { children: ReactNode }): ReactElement {
  return (
    <>
      <Head>
        <title>John Barhorst | Web Developer</title>
      </Head>
      {children}
      <Footer />
    </>
  );
}
