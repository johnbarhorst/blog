import Head from 'next/head';
import { ReactElement, ReactNode } from 'react';
import { Footer } from '../Footer';
import styles from './Layout.module.css';
import { Header } from '../Header';


export function Layout({ children }: { children: ReactNode }): ReactElement {
  return (
    <div className={styles.layout_wrapper} >
      <Head>
        <title>John Barhorst | Web Developer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"></meta>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
      </Head>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
