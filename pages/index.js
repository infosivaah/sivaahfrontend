import Head from "next/head";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
export default function Home() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [carousel, setCarousel] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(setProducts);

    fetch("http://localhost:5000/api/categories")
      .then(res => res.json())
      .then(setCategories);

    fetch("http://localhost:5000/api/collections/carousel")
      .then(res => res.json())
      .then(data => setCarousel(data?.imageList || []));
  }, []);
  const budgetData = [
    {
      label: "Under ₹999",
      max: 999,
      image: "https://luxaore.com/cdn/shop/files/Pure_92.5_Sterling_Silver_Jewellery@2x.jpg?v=1765117589"
    },
    {
      label: "Under ₹1499",
      max: 1999,
      image: "https://luxaore.com/cdn/shop/files/Classic_silver_necklace_a_timeless_anniversary_gift_for_wife.jpg?v=1734776312"
    },
    {
      label: "Under ₹1999",
      max: 2999,
      image: "https://jewllerydesign.com/cdn/shop/products/IMG_7931.jpg?crop=center&height=720&v=1693716387&width=720"
    },
    {
      label: "Premium Gifts",
      max: "10000",
      image: "https://jewllerydesign.com/cdn/shop/products/IMG_0616.jpg?crop=center&height=720&v=1666184362&width=720"
    }
  ];

  return (
    <>
      <Head>
        <title>SIVAAH | Destroy Negativity With Style</title>
      </Head>

      {/* 🔥 HERO CAROUSEL */}
      {/* 🔥 HERO CAROUSEL */}
      <section className="container-fluid px-0">
        <div
          id="heroCarousel"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          data-bs-interval="2000"
          data-bs-pause="false"
        >

          {/* 🔘 INDICATORS */}
          <div className="carousel-indicators">
            {carousel.map((_, i) => (
              <button
                key={i}
                type="button"
                data-bs-target="#heroCarousel"
                data-bs-slide-to={i}
                className={i === 0 ? "active" : ""}
                aria-current={i === 0 ? "true" : undefined}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          {/* 🖼 SLIDES */}
          <div className="carousel-inner">
            {carousel.map((img, i) => (
              <div
                key={i}
                className={`carousel-item ${i === 0 ? "active" : ""}`}
              >
                <img
                  src={img}
                  className="d-block w-100 hero-carousel-img"
                  alt={`Hero banner ${i + 1}`}
                />

              </div>
            ))}
          </div>

          {/* ⬅️➡️ CONTROLS (OPTIONAL BUT NICE) */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" />
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" />
          </button>

        </div>
      </section>


      {/* 🧿 OUR COLLECTION */}
      <section className=" mt-5 w-100 collection">
        <h1 className="mb-4 display-5">Our Collection</h1>

        <div className="category-scroll-wrapper w-100">
          {categories.map(cat => (
            <Link
              key={cat._id}
              href={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="text-decoration-none"
            >
              <div
                className="category-card horizontal"
                style={{
                  backgroundImage: `url(${cat.image})`
                }}
              >
                <div className="category-overlay">
                  <h5 className="category-title text-center w-100">
                    {cat.name}
                  </h5>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </section>

      {/* 💰 SHOP BY BUDGET */}
      <section className="container mt-5">
        <h3 className="mb-4 display-5">Shop By Budget</h3>
        <div className="row g-3">
          {budgetData.map((b, i) => (
            <div className="col-6 col-md-3" key={i}>
              <Link
                href={`/shop?maxPrice=${b.max}`}
                className="text-decoration-none"
              >
                <div
                  className="category-card budget-variant"
                  style={{
                    backgroundImage: `url(${b.image})`
                  }}
                >
                  <div className="category-overlay">
                    <h5 className="category-title text-center w-100">
                      {b.label}
                    </h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

      </section>

      {/* 🛍 OUR PRODUCTS */}
      <section className="container mt-5 mb-5">
        <h3 className="mb-4 display-5">Our Products</h3>

        <div className="row g-4">
          {products.map(product => (
            <div key={product._id} className="col-6 col-md-3">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
