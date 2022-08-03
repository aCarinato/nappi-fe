import '../styles/globals.css';

import Head from 'next/head';
import Layout from '../components/layout/Layout';

import { ContextProvider } from '../context/Context';
import { StoreProvider } from '../context/Store';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

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
          <PayPalScriptProvider>
            <Component {...pageProps} />
          </PayPalScriptProvider>
        </Layout>
      </StoreProvider>
    </ContextProvider>
  );
}

export default MyApp;
