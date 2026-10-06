import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { CartProvider } from '../context/CartContext';
import Layout from '../components/layout/Layout';

import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";

import { useEffect, useState } from "react";
import Router from "next/router";


export default function App({ Component, pageProps }) {

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    import("bootstrap/dist/js/bootstrap.bundle.min.js");

    const handleStart = () => {
      setLoading(true);
    };

    const handleComplete = () => {
      setLoading(false);
    };

    const handleError = () => {
      setLoading(false);
    };

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleError);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleError);
    };

  }, []);

  return (
    <>
      <div
        className={
          loading
            ? "sivaah-navigation-loader sivaah-navigation-loader-active"
            : "sivaah-navigation-loader"
        }
      />

      <CartProvider>
        <Layout>

          <DefaultSeo {...SEO} />

          <Component {...pageProps} />

        </Layout>
      </CartProvider>
    </>
  );
}