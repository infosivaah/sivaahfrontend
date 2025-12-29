import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";

export default function ProductPage() {
  const router = useRouter();
  const { slug } = router.query;
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH PRODUCT ---------------- */
  useEffect(() => {
    if (!router.isReady || !slug) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://sivaahbackend.onrender.com/api/products/slug/${slug}`
        );

        if (!res.ok) throw new Error("Product not found");

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [router.isReady, slug]);

  /* ---------------- LOADING / ERROR ---------------- */

  if (loading) {
    return <p className="text-center mt-5">Loading product...</p>;
  }

  if (!product) {
    return <p className="text-center mt-5">Product not found</p>;
  }

  const images = Array.isArray(product.images)
    ? product.images
    : [];

  const mainImage =
    images[activeImage]?.replace(
      "/upload/",
      "/upload/w_900,q_auto,f_auto/"
    );

  /* ---------------- UI ---------------- */

  return (
    <>
      <Head>
        <title>{product.name} – 925 Silver Jewellery</title>
        <meta name="description" content={product.subtitle} />

        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.subtitle} />
        <meta property="og:image" content={product.images?.[0]} />
        <meta property="og:type" content="product" />
      </Head>

      <div className="container mt-4">
        <div className="row g-5">
          {/* LEFT — IMAGE GALLERY */}
          <div className="col-md-6">
            <div className="pdp-image-wrap">
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={product.name}
                  className="img-fluid rounded"
                />
              ) : (
                <div className="border p-5 text-center">
                  No image available
                </div>
              )}
            </div>

            {/* THUMBNAILS */}
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
                    className={`pdp-thumb ${i === activeImage ? "active" : ""
                      }`}
                    onClick={() => setActiveImage(i)}
                    style={{
                      cursor: "pointer",
                      borderRadius: 6
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — PRODUCT INFO */}
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

            <p className="text-danger small mt-1">
              Only few pieces left
            </p>

            <hr />
            <h6>Description</h6>
            <p>{product.description}</p>
            {/* BENEFITS */}
            <h6>Specifications</h6>
            {Array.isArray(product.benefits) &&
              product.benefits.length > 0 && (
                <ul className="ps-3">
                  {product.benefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}

            {/* CTA */}
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
          </div>
        </div>
      </div>
    </>
  );
}
