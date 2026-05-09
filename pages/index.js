import Head from "next/head";
import Link from "next/link";
import ProductCard from "../components/ProductCard";

export default function Home({
  products,
  categories,
  carousel
}) {

  const bestsellers = products?.slice(0, 4);

  return (
    <>
      <Head>
        <title>
          SIVAAH® | Premium 925 Silver Jewellery
        </title>

        <meta
          name="description"
          content="Luxury 925 silver jewellery crafted with meaning."
        />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </Head>

      <style jsx global>{`

@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap');

:root {

  --bg: #faf7f2;
  --bg-soft: #f4eee5;

  --card: #ffffff;

  --gold: #b88b4a;
  --gold-soft: #d8b786;

  --text: #1d1b18;
  --muted: #7b7468;

  --border: #e9dfd2;

  --shadow:
    0 12px 40px rgba(0,0,0,0.06);

  --gold-gradient:
    linear-gradient(
      135deg,
      #d8b786,
      #b88b4a
    );
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: "Montserrat", sans-serif;
  overflow-x: hidden;
}

a {
  text-decoration: none;
}

.container-lux {
  width: min(1400px, 92%);
  margin: auto;
}

.section-space {
  padding: 110px 0;
}

.eyebrow {

  color: var(--gold);

  text-transform: uppercase;

  letter-spacing: 0.35em;

  font-size: 11px;

  margin-bottom: 14px;
}

.lux-title {

  font-family:
    "Cormorant Garamond",
    serif;

  font-size:
    clamp(48px, 7vw, 100px);

  line-height: 0.95;

  letter-spacing: -0.04em;

  font-weight: 500;

  color: #1d1b18;
}

.section-title {

  font-family:
    "Cormorant Garamond",
    serif;

  font-size:
    clamp(38px, 5vw, 72px);

  line-height: 1;

  letter-spacing: -0.03em;

  margin-bottom: 14px;

  color: #1d1b18;
}

.lux-text {

  color: var(--muted);

  line-height: 1.9;

  font-size: 15px;
}

/* HERO */

.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.hero-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: zoomHero 16s ease infinite alternate;
}

@keyframes zoomHero {

  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.08);
  }
}

.hero-overlay {

  position: absolute;

  inset: 0;

  background:

    linear-gradient(
      to right,
      rgba(250,247,242,0.88),
      rgba(250,247,242,0.28)
    ),

    linear-gradient(
      to top,
      rgba(250,247,242,0.94),
      rgba(250,247,242,0.08)
    );

  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 3;
  width: min(760px, 92%);
  margin-left: 6%;
}

.hero-sub {

  color: var(--gold);

  letter-spacing: 0.32em;

  text-transform: uppercase;

  font-size: 12px;

  margin-bottom: 18px;
}

.hero-text {

  max-width: 620px;

  color: #5d564b;

  font-size: 18px;

  line-height: 1.8;

  margin-top: 28px;
}

.hero-btns {
  display: flex;
  gap: 18px;
  margin-top: 42px;
  flex-wrap: wrap;
}

/* BUTTONS */

.btn-main {

  padding: 18px 34px;

  background: var(--gold-gradient);

  color: white;

  border-radius: 999px;

  font-weight: 600;

  letter-spacing: 0.12em;

  text-transform: uppercase;

  font-size: 12px;

  transition: 0.35s;

  border: none;

  box-shadow:
    0 12px 30px rgba(184,139,74,0.24);
}

.btn-main:hover {
  transform: translateY(-3px);
  color: white;
}

.btn-outline {

  padding: 18px 34px;

  border:
    1px solid #d9ccbc;

  color: #1d1b18;

  border-radius: 999px;

  font-weight: 500;

  letter-spacing: 0.12em;

  text-transform: uppercase;

  font-size: 12px;

  backdrop-filter: blur(10px);

  background:
    rgba(255,255,255,0.52);

  transition: 0.35s;
}

.btn-outline:hover {

  background:
    rgba(255,255,255,0.8);

  color: #1d1b18;
}

/* TRUST MINI */

.hero-trust {
  margin-top: 52px;
  display: flex;
  gap: 28px;
  flex-wrap: wrap;
}

.trust-mini {

  color: #5d564b;

  font-size: 13px;

  display: flex;

  align-items: center;

  gap: 10px;
}

.trust-dot {

  width: 8px;

  height: 8px;

  border-radius: 50%;

  background: var(--gold);
}

/* TRUST */

.trust-grid {

  display: grid;

  grid-template-columns:
    repeat(4,1fr);

  gap: 1px;

  background: #ece2d5;

  border: 1px solid #ece2d5;
}

.trust-card {

  background: white;

  padding: 52px 28px;

  text-align: center;
}

.trust-icon {

  width: 72px;

  height: 72px;

  border-radius: 50%;

  background:
    rgba(184,139,74,0.08);

  display: flex;

  align-items: center;

  justify-content: center;

  margin: auto;

  margin-bottom: 24px;

  color: var(--gold);

  font-size: 24px;
}

.trust-title {

  font-family:
    "Cormorant Garamond",
    serif;

  font-size: 34px;

  margin-bottom: 10px;

  color: #1d1b18;
}

.trust-desc {

  color: #756e63;

  line-height: 1.8;

  font-size: 14px;
}

/* PRODUCTS */

.product-grid {
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 28px;
}

.product-wrap {
  position: relative;
}

.badge {

  position: absolute;

  top: 14px;

  left: 14px;

  z-index: 2;

  background:
    rgba(255,255,255,0.92);

  color: #1d1b18;

  padding: 7px 12px;

  border-radius: 999px;

  font-size: 10px;

  letter-spacing: 0.12em;

  text-transform: uppercase;

  border:
    1px solid #e7ddd1;

  backdrop-filter: blur(10px);
}

/* STORY */

.story-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.story-img {

  border-radius: 34px;

  overflow: hidden;

  min-height: max-content;

  box-shadow: var(--shadow);
}

.story-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.quote {

  font-family:
    "Cormorant Garamond",
    serif;

  font-size:
    clamp(36px, 4vw, 60px);

  line-height: 1.2;

  margin-bottom: 34px;

  color: #1d1b18;
}

/* COLLECTIONS */

.collection-scroll {
  display: flex;
  overflow-x: auto;
  gap: 24px;
  padding-bottom: 12px;
}

.collection-scroll::-webkit-scrollbar {
  display: none;
}

.collection-card {

  min-width: 340px;

  height: 520px;

  border-radius: 34px;

  overflow: hidden;

  position: relative;

  flex-shrink: 0;

  box-shadow:
    0 16px 42px rgba(0,0,0,0.08);
}

.collection-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.5s;
}

.collection-card:hover img {
  transform: scale(1.08);
}

.collection-overlay {

  position: absolute;

  inset: 0;

  background:
    linear-gradient(
      to top,
      rgba(28,24,18,0.76),
      rgba(28,24,18,0.08)
    );

  padding: 38px;

  display: flex;

  flex-direction: column;

  justify-content: flex-end;
}

.collection-title {

  font-family:
    "Cormorant Garamond",
    serif;

  font-size: 52px;

  color: white;
}

/* REVIEWS */

.review-grid {
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 28px;
}

.review-card {

  background: white;

  border: 1px solid var(--border);

  border-radius: 28px;

  padding: 38px;

  box-shadow: var(--shadow);
}

.stars {

  color: var(--gold);

  margin-bottom: 22px;

  letter-spacing: 0.2em;
}

.review-text {

  color: #5f584d;

  line-height: 1.9;

  margin-bottom: 28px;
}

.review-user {

  color: var(--gold);

  font-size: 14px;
}

/* CTA */

.cta-box {

  background:
    linear-gradient(
      180deg,
      #fffdf9,
      #f6f0e8
    );

  border:
    1px solid #eadfce;

  border-radius: 38px;

  padding: 90px 40px;

  text-align: center;

  box-shadow:
    0 20px 50px rgba(0,0,0,0.04);
}

/* MOBILE */

@media(max-width: 992px) {

  .product-grid {
    grid-template-columns: repeat(2,1fr);
  }

  .story-grid {
    grid-template-columns: 1fr;
  }

  .review-grid {
    grid-template-columns: 1fr;
  }

  .trust-grid {
    grid-template-columns: repeat(2,1fr);
  }

  .story-img {
    min-height: max-content;
  }
}
/* HERO CAROUSEL */

.hero-bg {

  position: absolute;

  inset: 0;

  z-index: 1;

  overflow: hidden;
}

.hero-carousel {

  position: relative;

  width: 100%;

  height: 100%;
}

.hero-slide {

  position: absolute;

  inset: 0;

  opacity: 0;

  animation:
    heroFade 20s infinite;
}

.hero-slide img {

  width: 100%;

  height: 100%;

  object-fit: cover;

  animation:
    heroZoom 20s infinite;
}

/* FADE */

@keyframes heroFade {

  0% {
    opacity: 0;
  }

  5% {
    opacity: 1;
  }

  25% {
    opacity: 1;
  }

  30% {
    opacity: 0;
  }

  100% {
    opacity: 0;
  }
}

/* SLOW ZOOM */

@keyframes heroZoom {

  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.08);
  }
}
@media(max-width: 768px) {

  .hero {
    min-height: 92vh;
  }

  .hero-content {
    margin-left: 5%;
    width: 90%;
  }

  .hero-text {
    font-size: 15px;
  }

  .hero-btns {
    flex-direction: column;
  }

  .btn-main,
  .btn-outline {
    width: 100%;
    text-align: center;
  }

  .product-grid {
    gap: 18px;
  }

  .trust-card {
    padding: 34px 18px;
  }

  .trust-title {
    font-size: 24px;
  }

  .collection-card {
    min-width: 260px;
    height: 390px;
    border-radius: 22px;
  }

  .collection-title {
    font-size: 38px;
  }

  .section-space {
    padding: 70px 0;
  }

  .cta-box {
    padding: 70px 24px;
  }

}

`}</style>

      {/* HERO */}

      <section className="hero">

        <div className="hero-bg">

          <div className="hero-carousel">

            {(carousel?.length
              ? carousel
              : [
                "https://res.cloudinary.com/dh61336lh/image/upload/v1771238437/WhatsApp_Image_2025-12-29_at_6.33.25_PM_2_hjxx2s.jpg"
              ]
            ).map((img, index) => (

              <div
                key={index}
                className="hero-slide"
                style={{
                  animationDelay: `${index * 5}s`
                }}
              >

                <img
                  src={img}
                  alt={`hero-${index}`}
                />

              </div>

            ))}

          </div>

        </div>

        <div className="hero-overlay"></div>

        <div className="hero-content">

          <div className="hero-sub">
            925 Silver | Real Weight | Fair Price.
          </div>

          <div className="lux-title">
            Crafted In Silver.
            <br />
            Worn With Intention.
          </div>

          <div className="hero-text">
           India's first fully transparent silver brand. Weight, price breakup, silver rate — all visible. Always.
          </div>

          <div className="hero-btns">

            <Link
              href="/shop"
              className="btn-main"
            >
              Shop Now
            </Link>

            <Link
              href="/shop"
              className="btn-outline"
            >
              Explore Collection
            </Link>

          </div>

          <div className="hero-trust">

            <div className="trust-mini">
              <span className="trust-dot"></span>
              925 Hallmarked
            </div>

            <div className="trust-mini">
              <span className="trust-dot"></span>
              Secure Payments
            </div>

            <div className="trust-mini">
              <span className="trust-dot"></span>
              PAN India Shipping
            </div>

          </div>

        </div>

      </section>


      {/* COLLECTIONS */}

      <section className="section-space">

        <div className="container-lux">

          <div className="text-center mb-5">

            <div className="eyebrow">
              Curated Collections
            </div>

            <div className="section-title">
              Explore Categories
            </div>

          </div>

          <div className="collection-scroll">

            {categories?.map((cat) => (

              <Link
                key={cat._id}
                href={`/shop?category=${encodeURIComponent(
                  cat.name
                )}`}
              >

                <div className="collection-card">

                  <img
                    src={cat.image}
                    alt={cat.name}
                  />

                  <div className="collection-overlay">

                    <div className="eyebrow">
                      Luxury Collection
                    </div>

                    <div className="collection-title">
                      {cat.name}
                    </div>

                  </div>

                </div>

              </Link>

            ))}

          </div>

        </div>

      </section>
      {/* BESTSELLERS */}

      <section className="section-space">

        <div className="container-lux">

          <div className="text-center mb-5">

            <div className="eyebrow">
              Most Loved Pieces
            </div>

            <div className="section-title">
              Bestsellers
            </div>

          </div>

          <div className="product-grid">

            {products?.map((product) => (

              <div
                key={product._id}
                className="product-wrap"
              >



                <ProductCard product={product} />

              </div>

            ))}

          </div>

        </div>

      </section>
      {/* TRUST SECTION */}

      <section className="trust-grid">

        <div className="trust-card">
          <div className="trust-icon">
            ✦
          </div>

          <div className="trust-title">
            925 Hallmarked
          </div>

          <div className="trust-desc">
            Genuine certified sterling silver
            jewellery crafted with precision.
          </div>
        </div>

        <div className="trust-card">
          <div className="trust-icon">
            🔒
          </div>

          <div className="trust-title">
            Secure Checkout
          </div>

          <div className="trust-desc">
            Trusted Razorpay encrypted
            payment protection.
          </div>
        </div>

        <div className="trust-card">
          <div className="trust-icon">
            🚚
          </div>

          <div className="trust-title">
            PAN India Delivery
          </div>

          <div className="trust-desc">
            Fast delivery with live
            WhatsApp tracking support.
          </div>
        </div>

        <div className="trust-card">
          <div className="trust-icon">
            🎁
          </div>

          <div className="trust-title">
            Luxury Packaging
          </div>

          <div className="trust-desc">
            Elegant gift-ready packaging
            with every order.
          </div>
        </div>

      </section>
      {/* STORY */}

      <section className="section-space">

        <div className="container-lux">

          <div className="story-grid">

            <div className="story-img">

              <img
                src="https://res.cloudinary.com/dh61336lh/image/upload/v1771238437/WhatsApp_Image_2025-12-29_at_6.33.25_PM_2_hjxx2s.jpg"
                alt=""
              />

            </div>

            <div>

              <div className="eyebrow">
                Our Story
              </div>

              <div className="quote">
                “Silver is not just metal —
                it is memory, devotion,
                and the quiet promise
                of forever.”
              </div>

              <div className="lux-text">

                SIVAAH was born from the belief
                that jewellery should carry meaning.

                <br /><br />

                We fuse spiritual inspiration
                with modern luxury aesthetics,
                creating timeless pieces
                crafted in certified 925 silver.

                <br /><br />

                Every design reflects elegance,
                emotion, energy, and intention.

              </div>

            </div>

          </div>

        </div>

      </section>



      {/* REVIEWS */}

      <section className="section-space">

        <div className="container-lux">

          <div className="text-center mb-5">

            <div className="eyebrow">
              Loved By Customers
            </div>

            <div className="section-title">
              What Women Say
            </div>

          </div>

          <div className="review-grid">

            <div className="review-card">

              <div className="stars">
                ★★★★★
              </div>

              <div className="review-text">
                Looks even more premium in real
                life. Packaging and finishing
                felt truly luxurious.
              </div>

              <div className="review-user">
                — Priya S.
              </div>

            </div>

            <div className="review-card">

              <div className="stars">
                ★★★★★
              </div>

              <div className="review-text">
                The designs feel spiritual
                without looking outdated.
                Absolutely loved it.
              </div>

              <div className="review-user">
                — Aakriti M.
              </div>

            </div>

            <div className="review-card">

              <div className="stars">
                ★★★★★
              </div>

              <div className="review-text">
                Got compliments the very first
                day I wore it. Feels like
                a true luxury brand.
              </div>

              <div className="review-user">
                — Radhika K.
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="section-space">

        <div className="container-lux">

          <div className="cta-box">

            <div className="eyebrow">
              Wear Something Meaningful
            </div>

            <div className="section-title">
              Jewellery That
              <br />
              Feels Personal
            </div>

            <div
              className="lux-text"
              style={{
                maxWidth: "720px",
                margin: "20px auto 40px"
              }}
            >
              Timeless silver jewellery
              designed to carry elegance,
              emotion, devotion, and energy.
            </div>

            <Link
              href="/shop"
              className="btn-main"
            >
              Shop Bestsellers
            </Link>

          </div>

        </div>

      </section>

    </>
  );
}

/* STATIC PROPS */

export async function getStaticProps() {

  try {

    const [
      productsRes,
      categoriesRes,
      carouselRes
    ] = await Promise.all([
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

    const products =
      await productsRes.json();

    const categories =
      await categoriesRes.json();

    const carouselData =
      await carouselRes.json();

    return {
      props: {
        products: products || [],
        categories: categories || [],
        carousel:
          carouselData?.imageList || []
      },
      revalidate: 60
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