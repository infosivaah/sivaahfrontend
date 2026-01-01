import Head from "next/head";
import ProductCard from "../components/ProductCard";
import Link from "next/link";

/* ===============================
   HOME PAGE (SEO + PREMIUM UX)
================================ */

export default function Home({
  products,
  categories,
  carousel
}) {
  const budgetData = [
    {
      label: "Under ₹999",
      max: 999,
      image:
        "https://luxaore.com/cdn/shop/files/Pure_92.5_Sterling_Silver_Jewellery@2x.jpg?v=1765117589"
    },
    {
      label: "Under ₹1499",
      max: 1999,
      image:
        "https://luxaore.com/cdn/shop/files/Classic_silver_necklace_a_timeless_anniversary_gift_for_wife.jpg?v=1734776312"
    },
    {
      label: "Under ₹1999",
      max: 2999,
      image:
        "https://jewllerydesign.com/cdn/shop/products/IMG_7931.jpg?crop=center&height=720&v=1693716387&width=720"
    },
    {
      label: "Premium Gifts",
      max: 10000,
      image:
        "https://jewllerydesign.com/cdn/shop/products/IMG_0616.jpg?crop=center&height=720&v=1666184362&width=720"
    }
  ];

  return (
    <>
      {/* ================= SEO ================= */}
      <Head>
        <title>SIVAAH® | Premium 925 Silver Jewellery with Meaning</title>
        <meta
          name="description"
          content="Discover SIVAAH – premium 925 silver jewellery crafted with purpose. Explore Rudraksha malas, intention jewellery, and meaningful designs."
        />
        <meta
          name="keywords"
          content="925 silver jewellery, rudraksha mala silver, intention jewellery, spiritual jewellery, SIVAAH"
        />
        <link rel="canonical" href="https://sivaah.in/" />
      </Head>

      {/* ================= HERO CAROUSEL ================= */}
      <section className="container-fluid px-0">
        <div
          id="heroCarousel"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          data-bs-interval="3000"
          data-bs-pause="false"
        >
          {/* INDICATORS */}
          <div className="carousel-indicators">
            {carousel.map((_, i) => (
              <button
                key={i}
                type="button"
                data-bs-target="#heroCarousel"
                data-bs-slide-to={i}
                className={i === 0 ? "active" : ""}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          {/* SLIDES */}
          <div className="carousel-inner">
            {carousel.map((img, i) => (
              <div
                key={i}
                className={`carousel-item ${i === 0 ? "active" : ""}`}
              >
                <img
                  src={img}
                  className="d-block w-100 hero-carousel-img"
                  alt={`SIVAAH jewellery banner ${i + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= COLLECTION ================= */}
      <section className="mt-5 w-100 collection">
        <h1 className="mb-4 display-5 text-center">
          Our Collection
        </h1>

        <div className="category-scroll-wrapper w-100">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/shop?category=${encodeURIComponent(
                cat.name
              )}`}
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

      {/* ================= SHOP BY BUDGET ================= */}
      <section className="container mt-5">
        <h2 className="mb-4 display-5 text-center">
          Shop By Budget
        </h2>

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

      {/* ================= PRODUCTS ================= */}
      <section className="container mt-5 mb-5">
        <h2 className="mb-4 display-5 text-center">
          Our Products
        </h2>

        <div className="row g-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="col-6 col-md-3"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/* ===============================
   STATIC DATA FETCH (ISR)
================================ */

export async function getStaticProps() {
  try {
    const [productsRes, categoriesRes, carouselRes] =
      await Promise.all([
        fetch(
          "https://sivaahbackend.onrender.com/api/products"
        ),
        fetch(
          "https://sivaahbackend.onrender.com/api/categories"
        ),
        fetch(
          "https://sivaahbackend.onrender.com/api/collections/carousel"
        )
      ]);

    const products = await productsRes.json();
    const categories = await categoriesRes.json();
    const carouselData = await carouselRes.json();

    return {
      props: {
        products: products || [],
        categories: categories || [],
        carousel: carouselData?.imageList || []
      },
      revalidate: 60 // 🔥 refresh every 60 seconds
    };
  } catch (err) {
    return {
      props: {
        products: [],
        categories: [],
        carousel: []
      },
      revalidate: 60
    };
  }
}
