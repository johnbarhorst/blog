import 'styles/globals.css';
import 'styles/Home.module.css';
import { AppProps } from 'next/app';
import { Layout } from 'components/Layout';
import { ReactElement } from 'react';

export default function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
