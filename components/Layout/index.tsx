import Head from 'next/head';
import { ReactElement, ReactNode } from 'react';
import { Footer } from '../Footer';
import styles from './Layout.module.css';
import Header from '../Header';


export function Layout({ children }: { children: ReactNode }): ReactElement {
  return (
    <div className={styles.layout_wrapper} >
      <Head>
        <title>John Barhorst | Web Developer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"></meta>
      </Head>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
