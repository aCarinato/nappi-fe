import '../styles/globals.css';

import Head from 'next/head';
import Layout from '../components/layout/Layout';

import { ContextProvider } from '../context/Context';
import { StoreProvider } from '../context/Store';

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <StoreProvider>
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
      </StoreProvider>
    </ContextProvider>
  );
}

export default MyApp;
