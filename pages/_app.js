import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from '../context/CartContext';
import Layout from '../components/layout/Layout';
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";

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

