import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import ProductSkeleton from "../../components/skeletons/ProductSkeleton";

export default function ProductPage({ product }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = useState(0);

  /* ===== fallback loading (FIRST TIME BUILD) ===== */
  // if (router.isFallback) {
  //   return <ProductSkeleton />;
  // }

  if (!product) {
    return <p className="text-center mt-5">Product not found</p>;
  }

  const images = Array.isArray(product.images) ? product.images : [];

  const mainImage =
    images[activeImage]?.replace(
      "/upload/",
      "/upload/w_900,q_auto,f_auto/"
    );

  const seoTitle =
    product?.seo?.title ||
    `${product.name} – 925 Silver Jewellery | SIVAAH`;

  const seoDescription =
  product?.seo?.description ||
  product.subtitle ||
  product.description?.slice(0, 160) ||
  `Buy ${product.name} in pure 925 sterling silver. Premium spiritual jewellery by SIVAAH.`;

  const canonical = `https://sivaah.in/product/${product.slug}`;

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={product?.seo?.keywords || ""} />
        <meta name="robots" content="index, follow" />

        <link rel="canonical" href={canonical} />

        {/* OpenGraph */}
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={product.images?.[0]} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={canonical} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={product.images?.[0]} />

        {/* Google Rich Product */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Product",
              name: product.name,
              image: product.images,
              description: seoDescription || "Premium 925 silver jewellery by SIVAAH.",
              brand: {
                "@type": "Brand",
                name: "SIVAAH"
              },
              offers: {
                "@type": "Offer",
                priceCurrency: "INR",
                price: product.price,
                availability:
                  product.stock > 0
                    ? "https://schema.org/InStock"
                    : "https://schema.org/OutOfStock",
                priceValidUntil: "2026-12-31",
                url: canonical
              }
            })
          }}
        />
      </Head>


      {/* ===== YOUR UI UNCHANGED ===== */}
      <div className="container mt-4">
        <div className="row g-5">
          <div className="col-md-6">
            <div className="pdp-image-wrap">
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={`${product.name} 925 silver jewellery SIVAAH`}
                  className="img-fluid rounded"
                />
              ) : (
                <div className="border p-5 text-center">
                  No image available
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="d-flex gap-2 mt-3">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img.replace(
                      "/upload/",
                      "/upload/w_120,h_120,c_fill,q_auto,f_auto/"
                    )}
                    alt="thumb"
                    className={`pdp-thumb ${i === activeImage ? "active" : ""}`}
                    onClick={() => setActiveImage(i)}
                    style={{ cursor: "pointer", borderRadius: 6 }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="col-md-6">
            <span className="text-uppercase small text-muted">
              {product.emotion}
            </span>

            <h1 className="mt-2">{product.name}</h1>
            <p className="text-muted">{product.subtitle}</p>

            <div className="fs-4 fw-semibold mt-3">
              ₹{product.price}
              {product.mrp && (
                <span className="text-muted fs-6 ms-2 text-decoration-line-through">
                  ₹{product.mrp}
                </span>
              )}
            </div>

            <p className="text-danger small mt-1">Only few pieces left</p>

            <hr />

            <div className="d-grid gap-2 mt-4">
              <button
                className="btn btn-dark btn-lg"
                onClick={() => {
                  addToCart(product);
                  router.push("/cart");
                }}
              >
                Buy Now
              </button>

              <button
                className="btn btn-outline-dark"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
            <hr />
            <h6>Description</h6>
            <p>{product.description}</p>

            <h6>Specifications</h6>
            {Array.isArray(product.benefits) && product.benefits.length > 0 && (
              <ul className="ps-3">
                {product.benefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
export async function getStaticPaths() {
  const res = await fetch(
    "https://sivaahbackend.onrender.com/api/products"
  );

  const products = await res.json();

  const paths = products.map((p) => ({
    params: { slug: p.slug }
  }));

  return {
    paths,
    fallback: "blocking"
  };
}

export async function getStaticProps({ params }) {
  try {
    const res = await fetch(
      `https://sivaahbackend.onrender.com/api/products/slug/${params.slug}`
    );

    if (!res.ok) return { notFound: true };

    const product = await res.json();

    return {
      props: { product },
      revalidate: 3600
    };
  } catch {
    return { notFound: true };
  }
}
