import { ReactElement } from 'react';
import { HomePage } from 'components/HomePage';
import Head from 'next/head';


export default function Home(): ReactElement {
  return (
    <>
      <Head>
        <title>John Barhorst | Web Developer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage />
    </>
  );
}
