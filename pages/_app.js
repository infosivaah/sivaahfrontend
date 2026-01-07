import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from '../context/CartContext';
import Layout from '../components/layout/Layout';
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// 🔥 Configure progress bar
NProgress.configure({
  showSpinner: false,
  trickleSpeed: 120,
  minimum: 0.2
});
Router.events.on("routeChangeStart", () => {
  NProgress.start();
  document.body.classList.add("page-loading");
});

Router.events.on("routeChangeComplete", () => {
  NProgress.done();
  document.body.classList.remove("page-loading");
});

Router.events.on("routeChangeError", () => {
  NProgress.done();
  document.body.classList.remove("page-loading");
});
export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Layout>
         <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}

