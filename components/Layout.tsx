import Head from 'next/head';
import { ReactElement, ReactNode } from 'react';
import { Footer } from './Footer';
import styles from 'styles/Layout.module.css';
import Header from './Header';
import { AnimatePresence } from 'framer-motion';
import { FadeIn } from './FadeIn';


export function Layout({ children }: { children: ReactNode }): ReactElement {
  return (
    <div className={styles.layout_wrapper} >
      <Head>
        <title>John Barhorst | Web Developer</title>
      </Head>
      <Header />
      <AnimatePresence exitBeforeEnter>
        {children}
      </AnimatePresence>
      <Footer />
    </div>
  );
}
