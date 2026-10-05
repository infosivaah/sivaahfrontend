import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "../components/ProductCard";

export default function Home({
  products = [],
  categories = [],
  carousel = [],
}) {
  const heroImages = carousel?.length
    ? carousel
    : [
        "https://res.cloudinary.com/dh61336lh/image/upload/v1771238437/WhatsApp_Image_2025-12-29_at_6.33.25_PM_2_hjxx2s.jpg",
      ];

  return (
    <>
      <Head>
        <title>SIVAAH® | 925 Silver Jewellery & Meaningful Gifts</title>

        <meta
          name="description"
          content="Discover Sivaah 925 silver jewellery for everyday wear and meaningful gifting. Explore rings, earrings, pendants, bracelets and more with real product weights and transparent pricing."
        />

        <meta
          property="og:title"
          content="SIVAAH® | 925 Silver Jewellery & Meaningful Gifts"
        />

        <meta
          property="og:description"
          content="925 silver jewellery designed for everyday wear and meaningful moments, with real product weights and transparent pricing."
        />

        <meta
          property="og:image"
          content="https://res.cloudinary.com/dh61336lh/image/upload/f_webp,q_auto,w_1200/v1771238437/WhatsApp_Image_2025-12-29_at_6.33.25_PM_2_hjxx2s.jpg"
        />

        <meta property="og:url" content="https://www.sivaah.in" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SIVAAH" />

        <meta name="twitter:card" content="summary_large_image" />

        <link
          rel="canonical"
          href="https://www.sivaah.in"
        />

        <meta
          name="robots"
          content="index, follow"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "SIVAAH",
              url: "https://www.sivaah.in",
              logo: "https://www.sivaah.in/logo.png",
              sameAs: [
                "https://www.instagram.com/sivaah.in",
              ],
            }),
          }}
        />
      </Head>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap');

        :root {
          --sivaah-bg: #faf7f2;
          --sivaah-soft: #f2ebe2;
          --sivaah-text: #1d1b18;
          --sivaah-muted: #746d63;
          --sivaah-gold: #b88b4a;
          --sivaah-gold-light: #d8b786;
          --sivaah-border: #e5dbce;
        }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: var(--sivaah-bg);
          color: var(--sivaah-text);
          font-family: "Montserrat", sans-serif;
          overflow-x: hidden;
        }

        a {
          text-decoration: none;
        }

        .sivaah-container {
          width: min(1380px, 92%);
          margin: 0 auto;
        }

        .sivaah-section {
          padding: 105px 0;
        }

        .sivaah-eyebrow {
          color: var(--sivaah-gold);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          margin-bottom: 15px;
        }

        .sivaah-section-title {
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(44px, 5vw, 72px);
          font-weight: 500;
          line-height: 0.96;
          letter-spacing: -0.035em;
          margin: 0;
        }

        .sivaah-description {
          color: var(--sivaah-muted);
          font-size: 14px;
          line-height: 1.9;
        }

        /* =========================================
           HERO
        ========================================= */

        .sivaah-hero {
          position: relative;
          min-height: calc(100vh - 80px);
          overflow: hidden;
          display: flex;
          align-items: center;
          background: #eee7dd;
        }

        .sivaah-hero-images {
          position: absolute;
          inset: 0;
        }

        .sivaah-hero-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          animation: sivaahHeroFade 20s infinite;
        }

        .sivaah-hero-slide:nth-child(1) {
          animation-delay: 0s;
        }

        .sivaah-hero-slide:nth-child(2) {
          animation-delay: 5s;
        }

        .sivaah-hero-slide:nth-child(3) {
          animation-delay: 10s;
        }

        .sivaah-hero-slide:nth-child(4) {
          animation-delay: 15s;
        }

        .sivaah-hero-slide img {
          object-fit: cover;
          animation: sivaahHeroZoom 20s infinite;
        }

        @keyframes sivaahHeroFade {
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

        @keyframes sivaahHeroZoom {
          from {
            transform: scale(1);
          }

          to {
            transform: scale(1.07);
          }
        }

        .sivaah-hero-overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
          background:
            linear-gradient(
              90deg,
              rgba(250,247,242,0.96) 0%,
              rgba(250,247,242,0.82) 28%,
              rgba(250,247,242,0.28) 64%,
              rgba(250,247,242,0.08) 100%
            ),
            linear-gradient(
              0deg,
              rgba(250,247,242,0.48),
              transparent 55%
            );
        }

        .sivaah-hero-content {
          position: relative;
          z-index: 3;
          width: min(760px, 90%);
          margin-left: 7%;
          padding: 90px 0;
        }

        .sivaah-hero-kicker {
          font-size: 11px;
          letter-spacing: 0.35em;
          color: var(--sivaah-gold);
          text-transform: uppercase;
          margin-bottom: 22px;
        }

        .sivaah-hero h1 {
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(62px, 8vw, 112px);
          font-weight: 500;
          line-height: 0.83;
          letter-spacing: -0.055em;
          margin: 0;
        }

        .sivaah-hero h1 em {
          font-weight: 400;
          color: var(--sivaah-gold);
        }

        .sivaah-hero-copy {
          max-width: 540px;
          margin-top: 28px;
          color: #5e574e;
          font-size: 16px;
          line-height: 1.9;
        }

        .sivaah-hero-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 36px;
        }

        .sivaah-primary-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 54px;
          padding: 0 30px;
          background: var(--sivaah-gold);
          color: #fff;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          transition: 0.3s ease;
        }

        .sivaah-primary-btn:hover {
          background: var(sivaah-primary-btn);
          color: #fff;
          transform: translateY(-2px);
        }

        .sivaah-secondary-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 54px;
          padding: 0 30px;
          border: 1px solid rgba(29,27,24,0.28);
          color: var(--sivaah-text);
          background: rgba(255,255,255,0.32);
          backdrop-filter: blur(10px);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          transition: 0.3s ease;
        }

        .sivaah-secondary-btn:hover {
          background: #fff;
          color: var(--sivaah-text);
        }

        .sivaah-hero-proof {
          display: flex;
          gap: 28px;
          flex-wrap: wrap;
          margin-top: 42px;
        }

        .sivaah-proof-item {
          display: flex;
          align-items: center;
          gap: 9px;
          color: #625b52;
          font-size: 11px;
        }

        .sivaah-proof-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--sivaah-gold);
        }

        /* =========================================
           QUICK SHOP
        ========================================= */

        .sivaah-quick-shop {
          padding: 42px 0 65px;
          background: var(--sivaah-bg);
        }

        .sivaah-quick-shop-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 22px;
        }

        .sivaah-quick-shop-title {
          font-family: "Cormorant Garamond", serif;
          font-size: 38px;
          line-height: 1;
          font-weight: 500;
          letter-spacing: -0.025em;
          margin: 0;
        }

        .sivaah-quick-shop-link {
          color: var(--sivaah-text);
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          white-space: nowrap;
          border-bottom: 1px solid #aaa;
          padding-bottom: 5px;
        }

        .sivaah-quick-shop-list {
          display: flex;
          gap: 14px;
          overflow-x: auto;
          scrollbar-width: none;
          padding: 3px 2px 8px;
        }

        .sivaah-quick-shop-list::-webkit-scrollbar {
          display: none;
        }

        .sivaah-quick-shop-card {
          flex: 0 0 135px;
          color: var(--sivaah-text);
        }

        .sivaah-quick-shop-image {
          height: 105px;
          overflow: hidden;
          background: var(--sivaah-soft);
          border-radius: 4px;
        }

        .sivaah-quick-shop-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.45s ease;
        }

        .sivaah-quick-shop-card:hover img {
          transform: scale(1.05);
        }

        .sivaah-quick-shop-name {
          margin-top: 10px;
          font-size: 10px;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          text-align: center;
        }

        /* =========================================
           PRODUCTS
        ========================================= */

        .sivaah-products-header {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 48px;
        }

        .sivaah-products-header .sivaah-description {
          margin: 18px auto 0;
        }

        .sivaah-product-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 25px;
        }

        .sivaah-products-footer {
          display: flex;
          justify-content: center;
          margin-top: 30px;
        }

        .sivaah-text-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 18px;

  min-height: 52px;
  padding: 0 28px;

  color: var(--sivaah-text);
  background: transparent;

  border: 1px solid rgba(29, 27, 24, 0.45);

  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;

  transition:
    background 0.25s ease,
    color 0.25s ease,
    border-color 0.25s ease,
    transform 0.25s ease;
}

.sivaah-text-btn span {
  font-size: 17px;
  transition: transform 0.25s ease;
}

.sivaah-text-btn:hover {
  background: var(--sivaah-text);
  color: #fff;
  border-color: var(--sivaah-text);
  transform: translateY(-2px);
}

.sivaah-text-btn:hover span {
  transform: translateX(5px);
}
  @media (max-width: 768px) {

  .sivaah-text-btn {
    width: 100%;
    min-height: 50px;
    padding: 0 20px;
  }

}

        /* =========================================
           LARGE CATEGORY EDITORIAL
        ========================================= */

        .sivaah-category-head {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 30px;
          margin-bottom: 42px;
        }

        .sivaah-category-head-copy {
          max-width: 610px;
        }

        .sivaah-category-head .sivaah-description {
          max-width: 500px;
          margin: 18px 0 0;
        }

        .sivaah-view-link {
          color: var(--sivaah-text);
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          white-space: nowrap;
          border-bottom: 1px solid var(--sivaah-text);
          padding-bottom: 6px;
        }

        .sivaah-category-grid {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr 1fr;
          grid-template-rows: 300px 300px;
          gap: 18px;
        }

        .sivaah-category-card {
          position: relative;
          overflow: hidden;
          min-width: 0;
          background: #e8dfd5;
        }

        .sivaah-category-card:nth-child(1) {
          grid-row: 1 / 3;
        }

        .sivaah-category-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s ease;
        }

        .sivaah-category-card:hover img {
          transform: scale(1.06);
        }

        .sivaah-category-card::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0,0,0,0.02) 30%,
            rgba(0,0,0,0.65) 100%
          );
        }

        .sivaah-category-content {
          position: absolute;
          z-index: 2;
          left: 30px;
          right: 30px;
          bottom: 27px;
        }

        .sivaah-category-number {
          color: rgba(255,255,255,0.7);
          font-size: 9px;
          letter-spacing: 0.2em;
          margin-bottom: 7px;
        }

        .sivaah-category-name {
          color: #fff;
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(30px, 3.2vw, 50px);
          line-height: 0.9;
          font-weight: 500;
        }

        .sivaah-category-shop {
          margin-top: 12px;
          color: rgba(255,255,255,0.85);
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
                  /* =========================================
           GIFTING / MOMENTS
        ========================================= */

        .sivaah-moment-section {
          background: #eee7dc;
        }

        .sivaah-moment-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 70px;
          align-items: center;
        }

        .sivaah-moment-copy {
          max-width: 500px;
        }

        .sivaah-moment-title {
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(46px, 6vw, 80px);
          line-height: 0.92;
          letter-spacing: -0.045em;
          margin: 0;
          font-weight: 500;
        }

        .sivaah-moment-title em {
          color: var(--sivaah-gold);
          font-weight: 400;
        }

        .sivaah-moment-copy p {
          color: var(--sivaah-muted);
          line-height: 1.9;
          margin: 25px 0 30px;
          font-size: 14px;
        }

        .sivaah-moment-cards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }

        .sivaah-moment-card {
          position: relative;
          height: 270px;
          overflow: hidden;
        }

        .sivaah-moment-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s;
        }

        .sivaah-moment-card:hover img {
          transform: scale(1.05);
        }

        .sivaah-moment-card::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            transparent 35%,
            rgba(0,0,0,0.62)
          );
        }

        .sivaah-moment-card-content {
          position: absolute;
          z-index: 2;
          bottom: 22px;
          left: 22px;
          color: #fff;
        }

        .sivaah-moment-card-content small {
          display: block;
          font-size: 8px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-bottom: 6px;
          opacity: 0.8;
        }

        .sivaah-moment-card-content strong {
          font-family: "Cormorant Garamond", serif;
          font-size: 32px;
          font-weight: 500;
        }

        /* =========================================
           TRANSPARENCY
        ========================================= */

        .sivaah-transparency {
          background: var(--sivaah-text);
          color: #fff;
        }

        .sivaah-transparency-grid {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 100px;
          align-items: center;
        }

        .sivaah-transparency .sivaah-eyebrow {
          color: var(--sivaah-gold-light);
        }

        .sivaah-transparency-title {
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(48px, 6vw, 82px);
          line-height: 0.9;
          font-weight: 500;
          letter-spacing: -0.045em;
          margin: 0;
        }

        .sivaah-transparency-copy {
          color: rgba(255,255,255,0.65);
          font-size: 14px;
          line-height: 1.9;
          margin-top: 25px;
          max-width: 480px;
        }

        .sivaah-breakdown {
          border-top: 1px solid rgba(255,255,255,0.18);
        }

        .sivaah-breakdown-row {
          display: grid;
          grid-template-columns: 60px 1fr auto;
          align-items: center;
          gap: 20px;
          min-height: 92px;
          border-bottom: 1px solid rgba(255,255,255,0.18);
        }

        .sivaah-breakdown-number {
          color: var(--sivaah-gold-light);
          font-family: "Cormorant Garamond", serif;
          font-size: 28px;
        }

        .sivaah-breakdown-title {
          font-family: "Cormorant Garamond", serif;
          font-size: 27px;
        }

        .sivaah-breakdown-desc {
          color: rgba(255,255,255,0.48);
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-align: right;
        }

        /* =========================================
           STORY
        ========================================= */

        .sivaah-story-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .sivaah-story-image {
          position: relative;
          min-height: 650px;
          overflow: hidden;
        }

        .sivaah-story-image img {
          object-fit: cover;
        }

        .sivaah-story-copy {
          max-width: 590px;
        }

        .sivaah-story-quote {
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(40px, 4.5vw, 65px);
          line-height: 1.02;
          letter-spacing: -0.035em;
          margin: 0 0 30px;
          font-weight: 500;
        }

        .sivaah-story-quote em {
          color: var(--sivaah-gold);
          font-weight: 400;
        }

        .sivaah-story-text {
          color: var(--sivaah-muted);
          line-height: 2;
          font-size: 14px;
        }

        /* =========================================
           FINAL CTA
        ========================================= */

        .sivaah-final {
          padding: 110px 0;
        }

        .sivaah-final-box {
          position: relative;
          overflow: hidden;
          background: #e9dfd2;
          padding: 110px 30px;
          text-align: center;
        }

        .sivaah-final-box::before {
          content: "SIVAAH";
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(120px, 20vw, 280px);
          color: rgba(255,255,255,0.28);
          white-space: nowrap;
          pointer-events: none;
        }

        .sivaah-final-content {
          position: relative;
          z-index: 2;
        }

        .sivaah-final-title {
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(52px, 7vw, 90px);
          line-height: 0.9;
          letter-spacing: -0.045em;
          margin: 0;
          font-weight: 500;
        }

        .sivaah-final-copy {
          max-width: 600px;
          margin: 25px auto 35px;
          color: var(--sivaah-muted);
          font-size: 14px;
          line-height: 1.9;
        }

        /* =========================================
           RESPONSIVE
        ========================================= */

        @media (max-width: 1100px) {

          .sivaah-product-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .sivaah-category-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: repeat(3, 280px);
          }

          .sivaah-category-card:nth-child(1) {
            grid-column: 1 / 3;
            grid-row: 1;
          }

          .sivaah-transparency-grid {
            gap: 50px;
          }
        }

        @media (max-width: 768px) {

          .sivaah-section {
            padding: 72px 0;
          }

          /* HERO */

          .sivaah-hero {
            min-height: 88vh;
          }

          .sivaah-hero-overlay {
            background:
              linear-gradient(
                90deg,
                rgba(250,247,242,0.94),
                rgba(250,247,242,0.55)
              ),
              linear-gradient(
                0deg,
                rgba(250,247,242,0.88),
                transparent 60%
              );
          }

          .sivaah-hero-content {
            width: 90%;
            margin: 0 auto;
            padding: 80px 0;
            align-self: flex-end;
          }

          .sivaah-hero h1 {
            font-size: clamp(58px, 15vw, 86px);
          }

          .sivaah-hero-copy {
            font-size: 14px;
          }

          .sivaah-hero-actions {
            flex-direction: column;
          }

          .sivaah-primary-btn,
          .sivaah-secondary-btn {
            width: 100%;
          }

          .sivaah-hero-proof {
            gap: 14px 20px;
            margin-top: 30px;
          }

          /* QUICK SHOP */

          .sivaah-quick-shop {
          padding: 30px 0 24px;
                }

          .sivaah-quick-shop-title {
            font-size: 31px;
          }

          .sivaah-quick-shop-list {
            gap: 10px;
            margin-right: -4%;
            padding-right: 4%;
          }

          .sivaah-quick-shop-card {
            flex: 0 0 102px;
          }

          .sivaah-quick-shop-image {
            height: 82px;
          }

          .sivaah-quick-shop-name {
            font-size: 8px;
            letter-spacing: 0.11em;
          }

          /* PRODUCTS */

          .sivaah-products-header {
            margin-bottom: 30px;
          }

          .sivaah-product-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }

          /* LARGE CATEGORIES */

          .sivaah-category-head {
            display: block;
          }

          .sivaah-category-head .sivaah-view-link {
            display: inline-block;
            margin-top: 20px;
          }

          .sivaah-category-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 250px;
            grid-auto-rows: 190px;
            gap: 10px;
          }

          .sivaah-category-card:nth-child(1) {
            grid-column: 1 / 3;
            grid-row: 1;
          }

          .sivaah-category-card:nth-child(n + 2) {
            grid-column: auto;
            grid-row: auto;
          }

          .sivaah-category-content {
            left: 18px;
            right: 18px;
            bottom: 18px;
          }

          .sivaah-category-name {
            font-size: 32px;
          }

          /* GIFTING */

          .sivaah-moment-grid,
          .sivaah-transparency-grid,
          .sivaah-story-grid {
            grid-template-columns: 1fr;
            gap: 45px;
          }

          .sivaah-moment-cards {
            gap: 10px;
          }

          .sivaah-moment-card {
            height: 210px;
          }

          .sivaah-moment-card-content strong {
            font-size: 27px;
          }

          /* TRANSPARENCY */

          .sivaah-breakdown-row {
            grid-template-columns: 40px 1fr;
            min-height: 82px;
            gap: 10px;
          }

          .sivaah-breakdown-desc {
            grid-column: 2;
            text-align: left;
            margin-top: -18px;
          }

          /* STORY */

          .sivaah-story-image {
            min-height: 450px;
            order: 2;
          }

          .sivaah-story-copy {
            order: 1;
          }

          /* CTA */

          .sivaah-final {
            padding: 70px 0;
          }

          .sivaah-final-box {
            padding: 80px 20px;
          }
            .sivaah-products-header {
          margin-bottom: 28px;
              }
          .sivaah-quick-shop + .sivaah-section {
         padding-top: 38px;
          }
         .sivaah-products-footer {
             margin-top: 28px;
           }

          .sivaah-products-footer + * {
             margin-top: 0;
          }
        }
@media (max-width: 768px) {

  .sivaah-product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .sivaah-products-footer {
    margin-top: 28px;
  }

  /* Reduce space AFTER the product section */
  .sivaah-products-footer {
    margin-bottom: 0;
  }

  /* Reduce space BEFORE the editorial category section */
  .sivaah-products-footer + .sivaah-container {
    margin-top: 0;
  }
}
        @media (max-width: 480px) {

          .sivaah-category-grid {
            grid-template-rows: 250px;
            grid-auto-rows: 190px;
          }

          .sivaah-product-grid {
            gap: 9px;
          }

          .sivaah-moment-card {
            height: 180px;
          }

          .sivaah-moment-card-content {
            left: 14px;
            bottom: 14px;
          }

          .sivaah-moment-card-content strong {
            font-size: 24px;
          }
        }
          @media (max-width: 768px) {

  .sivaah-editorial-categories {
    padding-top: 38px;
  }

}
  @media (max-width: 768px) {

  .sivaah-products-header .sivaah-section-title {
    font-size: 43px;
    line-height: 0.92;
  }

  .sivaah-products-header .sivaah-description {
    font-size: 13px;
    line-height: 1.7;
  }

}
  @media (max-width: 768px) {

  .sivaah-text-btn {
    width: 100%;
    min-height: 50px;
    padding: 0 20px;
  }

}
  /* =========================================
   DESKTOP SECTION SPACING
========================================= */

@media (min-width: 769px) {

  .sivaah-products-section {
    padding-bottom: 45px;
  }

  .sivaah-editorial-categories {
    padding-top: 45px;
  }

}
      `}</style>
            {/* =========================================================
          HERO
      ========================================================= */}

      <section className="sivaah-hero">

        <div className="sivaah-hero-images">

          {heroImages.slice(0, 4).map((img, index) => (

            <div
              key={`${img}-${index}`}
              className="sivaah-hero-slide"
            >

              <Image
                src={img}
                alt={
                  index === 0
                    ? "Sivaah 925 silver jewellery"
                    : "Sivaah silver jewellery collection"
                }
                fill
                priority={index === 0}
                sizes="100vw"
              />

            </div>

          ))}

        </div>

        <div className="sivaah-hero-overlay" />

        <div className="sivaah-hero-content">

          <div className="sivaah-hero-kicker">
            925 SILVER · REAL WEIGHT · TRANSPARENT PRICING
          </div>

          <h1>
            Crafted
            <br />
            With <em>Intention.</em>
          </h1>

          <p className="sivaah-hero-copy">
            Silver pieces made to be worn, gifted and remembered —
            with the weight of your jewellery and the story behind
            its price made clear.
          </p>

          <div className="sivaah-hero-actions">

            <Link
              href="/shop"
              className="sivaah-primary-btn"
            >
              Shop Jewellery
            </Link>

            <Link
              href="/shop"
              className="sivaah-secondary-btn"
            >
              Explore Collection
            </Link>

          </div>

          <div className="sivaah-hero-proof">

            <div className="sivaah-proof-item">
              <span className="sivaah-proof-dot" />
              925 Sterling Silver
            </div>

            <div className="sivaah-proof-item">
              <span className="sivaah-proof-dot" />
              Real Product Weight
            </div>

            <div className="sivaah-proof-item">
              <span className="sivaah-proof-dot" />
              Transparent Pricing
            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          QUICK SHOP
          SMALL + FAST CATEGORY NAVIGATION
      ========================================================= */}

      <section className="sivaah-quick-shop">

        <div className="sivaah-container">

          <div className="sivaah-quick-shop-head">

            <h2 className="sivaah-quick-shop-title">
              Shop by category
            </h2>

            <Link
              href="/shop"
              className="sivaah-quick-shop-link"
            >
              View All
            </Link>

          </div>

          <div className="sivaah-quick-shop-list">

            {categories?.slice(0, 8).map((cat, index) => (

              <Link
                key={`quick-${cat._id || cat.name || index}`}
                href={`/shop?category=${encodeURIComponent(
                  cat.name
                )}`}
                className="sivaah-quick-shop-card"
                aria-label={`Shop ${cat.name} 925 silver jewellery`}
              >

                <div className="sivaah-quick-shop-image">

                  <img
                    src={cat.image}
                    alt={`${cat.name} 925 silver jewellery`}
                    loading="lazy"
                  />

                </div>

                <div className="sivaah-quick-shop-name">
                  {cat.name}
                </div>

              </Link>

            ))}

          </div>

        </div>

      </section>


      {/* =========================================================
          PRODUCTS
      ========================================================= */}

      <section className="sivaah-section sivaah-products-section">

        <div className="sivaah-container">

          <div className="sivaah-products-header">

            <div className="sivaah-eyebrow">
              MOST LOVED PIECES
            </div>

            <h2 className="sivaah-section-title">
              The pieces people
              <br />
              come back for.
            </h2>

            <p className="sivaah-description">
              Discover some of Sivaah's most-loved 925 silver
              jewellery, made for everyday wear and meaningful
              gifting.
            </p>

          </div>

          <div className="sivaah-product-grid">

            {products?.slice(0, 8).map((product) => (

              <div key={product._id}>

                <ProductCard product={product} />

              </div>

            ))}

          </div>

          <div className="sivaah-products-footer">

            <Link
              href="/shop"
              className="sivaah-text-btn"
            >
              Explore Full Collection

              <span>
                →
              </span>

            </Link>

          </div>

        </div>

      </section>


      {/* =========================================================
          LARGE EDITORIAL CATEGORY EXPERIENCE
      ========================================================= */}

      <section className="sivaah-section sivaah-editorial-categories">

        <div className="sivaah-container">

          <div className="sivaah-category-head">

            <div className="sivaah-category-head-copy">

              <div className="sivaah-eyebrow">
                FIND YOUR PIECE
              </div>

              <h2 className="sivaah-section-title">
                Start with what
                <br />
                you love to wear.
              </h2>

              <p className="sivaah-description">
                Explore Sivaah's 925 silver jewellery by style,
                occasion and everyday expression.
              </p>

            </div>

            <Link
              href="/shop"
              className="sivaah-view-link"
            >
              View All Jewellery
            </Link>

          </div>

          <div className="sivaah-category-grid">

            {categories?.slice(0, 5).map((cat, index) => (

              <Link
                key={`large-${cat._id || cat.name || index}`}
                href={`/shop?category=${encodeURIComponent(
                  cat.name
                )}`}
                className="sivaah-category-card"
                aria-label={`Shop ${cat.name} 925 silver jewellery`}
              >

                <img
                  src={cat.image}
                  alt={`${cat.name} 925 silver jewellery by Sivaah`}
                  loading="lazy"
                />

                <div className="sivaah-category-content">

                  <div className="sivaah-category-number">
                    0{index + 1}
                  </div>

                  <div className="sivaah-category-name">
                    {cat.name}
                  </div>

                  <div className="sivaah-category-shop">
                    Explore
                  </div>

                </div>

              </Link>

            ))}

          </div>

        </div>

      </section>


      {/* =========================================================
          GIFTING / MOMENTS
      ========================================================= */}

      <section className="sivaah-section sivaah-moment-section">

        <div className="sivaah-container">

          <div className="sivaah-moment-grid">

            <div className="sivaah-moment-copy">

              <div className="sivaah-eyebrow">
                MADE FOR THE MOMENT
              </div>

              <h2 className="sivaah-moment-title">
                Give them
                <br />
                something <em>personal.</em>
              </h2>

              <p>
                The best gifts don't need an explanation.
                They're a small reminder of someone,
                somewhere or something that matters.
              </p>

              <Link
                href="/shop"
                className="sivaah-primary-btn"
              >
                Find A Gift
              </Link>

            </div>

            <div className="sivaah-moment-cards">

              {categories?.slice(0, 4).map((cat, index) => (

                <Link
                  key={`moment-${cat._id || cat.name || index}`}
                  href={`/shop?category=${encodeURIComponent(
                    cat.name
                  )}`}
                  className="sivaah-moment-card"
                >

                  <img
                    src={cat.image}
                    alt={`${cat.name} silver jewellery gift`}
                    loading="lazy"
                  />

                  <div className="sivaah-moment-card-content">

                    <small>
                      Discover
                    </small>

                    <strong>
                      {cat.name}
                    </strong>

                  </div>

                </Link>

              ))}

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          TRANSPARENCY
      ========================================================= */}

      <section className="sivaah-section sivaah-transparency">

        <div className="sivaah-container">

          <div className="sivaah-transparency-grid">

            <div>

              <div className="sivaah-eyebrow">
                NOTHING HIDDEN
              </div>

              <h2 className="sivaah-transparency-title">
                Know what
                <br />
                you're paying for.
              </h2>

              <p className="sivaah-transparency-copy">
                Jewellery shouldn't come with a mystery price tag.
                We show the important components behind the price
                so you can understand what you're buying.
              </p>

            </div>

            <div className="sivaah-breakdown">

              <div className="sivaah-breakdown-row">

                <div className="sivaah-breakdown-number">
                  01
                </div>

                <div className="sivaah-breakdown-title">
                  Silver Value
                </div>

                <div className="sivaah-breakdown-desc">
                  Based on product weight
                </div>

              </div>

              <div className="sivaah-breakdown-row">

                <div className="sivaah-breakdown-number">
                  02
                </div>

                <div className="sivaah-breakdown-title">
                  Craftsmanship
                </div>

                <div className="sivaah-breakdown-desc">
                  Making & finishing
                </div>

              </div>

              <div className="sivaah-breakdown-row">

                <div className="sivaah-breakdown-number">
                  03
                </div>

                <div className="sivaah-breakdown-title">
                  Taxes & Charges
                </div>

                <div className="sivaah-breakdown-desc">
                  Clearly shown
                </div>

              </div>

              <div className="sivaah-breakdown-row">

                <div className="sivaah-breakdown-number">
                  04
                </div>

                <div className="sivaah-breakdown-title">
                  Final Price
                </div>

                <div className="sivaah-breakdown-desc">
                  No mystery
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          STORY
      ========================================================= */}

      <section className="sivaah-section">

        <div className="sivaah-container">

          <div className="sivaah-story-grid">

            <div className="sivaah-story-image">

              <Image
                src="https://res.cloudinary.com/dh61336lh/image/upload/f_webp,q_auto,w_1000/v1771238437/WhatsApp_Image_2025-12-29_at_6.33.25_PM_2_hjxx2s.jpg"
                alt="Sivaah 925 silver jewellery"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />

            </div>

            <div className="sivaah-story-copy">

              <div className="sivaah-eyebrow">
                OUR STORY
              </div>

              <h2 className="sivaah-story-quote">
                Silver is more than metal.
                <br />
                It carries <em>meaning.</em>
              </h2>

              <div className="sivaah-story-text">

                <p>
                  Sivaah was born from a simple belief:
                  jewellery becomes special when it means
                  something to the person wearing it.
                </p>

                <p>
                  We create 925 silver pieces that balance
                  modern aesthetics with emotion — jewellery
                  you can wear every day and gifts you can
                  give on the days that matter.
                </p>

                <p>
                  And because the value of something should
                  never feel mysterious, we believe in showing
                  you the real weight and the components behind
                  the price.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          FINAL CTA
      ========================================================= */}

      <section className="sivaah-final">

        <div className="sivaah-container">

          <div className="sivaah-final-box">

            <div className="sivaah-final-content">

              <div className="sivaah-eyebrow">
                FIND SOMETHING MEANINGFUL
              </div>

              <h2 className="sivaah-final-title">
                Wear the feeling.
              </h2>

              <p className="sivaah-final-copy">
                Explore Sivaah's collection of 925 silver
                jewellery and find a piece that feels like yours.
              </p>

              <Link
                href="/shop"
                className="sivaah-primary-btn"
              >
                Shop Sivaah
              </Link>

            </div>

          </div>

        </div>

      </section>

    </>
  );
}


/* =========================================================
   STATIC PROPS
========================================================= */

export async function getStaticProps() {

  try {

    const [
      productsRes,
      categoriesRes,
      carouselRes,
    ] = await Promise.all([

      fetch(
        "https://sivaahbackend.onrender.com/api/products/featured"
      ),

      fetch(
        "https://sivaahbackend.onrender.com/api/categories"
      ),

      fetch(
        "https://sivaahbackend.onrender.com/api/collections/carousel"
      ),

    ]);

    const products = await productsRes.json();

    const categories = await categoriesRes.json();

    const carouselData = await carouselRes.json();

    return {

      props: {

        products: products || [],

        categories: categories || [],

        carousel: carouselData?.imageList || [],

      },

      revalidate: 1800,

    };

  } catch (err) {

    console.error(
      "Home page fetch error:",
      err
    );

    return {

      props: {

        products: [],

        categories: [],

        carousel: [],

      },

      revalidate: 60,

    };

  }

}