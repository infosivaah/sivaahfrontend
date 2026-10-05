import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { CartProvider } from '../context/CartContext';
import Layout from '../components/layout/Layout';

import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";

import { useEffect } from "react";

export default function App({ Component, pageProps }) {

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <CartProvider>
      <Layout>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}