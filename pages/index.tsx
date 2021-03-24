import { ReactElement } from 'react';
import { HomePage } from 'components/HomePage';
import Head from 'next/head';
import styles from 'styles/Home.module.css';


export default function Home(): ReactElement {
  return (
    <div className={styles.container}>
      <Head>
        <title>John Barhorst | Web Developer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage />
    </div>
  );
}
