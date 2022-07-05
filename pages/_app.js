import '../styles/globals.css';

import Head from 'next/head';
import Layout from '../components/layout/Layout';

function MyApp({ Component, pageProps }) {
  return (
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
  );
}

export default MyApp;
