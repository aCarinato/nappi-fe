import '../styles/globals.css';

import Head from 'next/head';
import Layout from '../components/layout/Layout';

import { ContextProvider } from '../context/Context';

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Layout>
        <Head>
          <title>Nappitello</title>
          <meta
            name="description"
            content="Olio extra vergine di oliva pugliese"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  );
}

export default MyApp;
