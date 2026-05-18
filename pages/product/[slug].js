import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import ProductSkeleton from "../../components/skeletons/ProductSkeleton";
import Image from "next/image";
export default function ProductPage({ product, silverRate }) {

  const router = useRouter();
  if (router.isFallback) {
    return <ProductSkeleton />;
  }
  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [showPricing, setShowPricing] =
    useState(false);
  const [openFaq, setOpenFaq] =
    useState(null);
  // const [silverRate, setSilverRate] = useState(null);
  // useEffect(() => {

  //   fetch(
  //     "https://sivaahbackend.onrender.com/api/rate"
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {

  //       setSilverRate(
  //         data.rate
  //       );
  //     });

  // }, []);
  /* ─────────────────────────────
   TRANSPARENT PRICING CALC
───────────────────────────── */

  const silverValue =
    Math.round(
      product.grams *
      silverRate
    );

  const overallMaking =
    Math.round(
      product.grams *
      product.labourPerGram
    );

  /* GST */

  const silverGST =
    Math.round(
      silverValue * 0.03
    );

  const makingGST =
    Math.round(
      overallMaking * 0.05
    );

  const govtTax =
    silverGST +
    makingGST;

  /* REMAINING */

  const remainingMaking =
    overallMaking -
    govtTax;

  /* CRAFTSMANSHIP */

  const craftsmanshipValue =
    Math.round(
      remainingMaking * 0.5
    );

  /* PLATING */

  const remainingAfterCraft =
    remainingMaking -
    craftsmanshipValue;

  /* PLATING */

  const platingValue =
    Math.round(
      remainingAfterCraft * 0.40
    );

  /* EXPERIENCE */

  const brandValue =
    remainingMaking -
    craftsmanshipValue -
    platingValue;

  const faqData = [

    {
      q: "What is 925 sterling silver?",

      a: "925 sterling silver is made with 92.5% pure silver and 7.5% strengthening metals for durability and everyday wear."
    },

    {
      q: "Is 925 silver good quality?",

      a: "Yes. 925 sterling silver is considered premium fine jewellery material used worldwide for luxury silver jewellery."
    },

    {
      q: "Is 925 silver pure silver?",

      a: "925 silver contains 92.5% pure silver. Pure silver alone is too soft for jewellery, so small strengthening metals are added."
    },

    {
      q: "How to check if 925 silver is real?",

      a: "Authentic sterling silver jewellery usually carries a 925 hallmark stamp and BIS hallmark certification."
    },

    {
      q: "Does 925 silver tarnish?",

      a: "925 silver may naturally oxidize over time when exposed to air and moisture, but it can easily be cleaned and polished."
    },

    {
      q: "How to clean silver jewellery at home?",

      a: "Gently clean your 925 silver jewellery using mild soap, lukewarm water and a soft microfiber cloth. Avoid perfumes, harsh chemicals and chlorine exposure. Store your jewellery in a dry airtight box when not in use to maintain shine longer."
    },

    {
      q: "Can I wear 925 silver daily?",

      a: "Yes. 925 sterling silver is durable and suitable for daily wear with proper care."
    },

    {
      q: "Is 925 silver waterproof?",

      a: "Occasional water exposure is fine, but avoiding chlorine, perfumes and chemicals helps maintain shine longer."
    },


  ];



  useEffect(() => {
    if (showCartPopup) {
      const timer = setTimeout(() => {
        setShowCartPopup(false);
      }, 2200);

      return () => clearTimeout(timer);
    }
  }, [showCartPopup]);
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
  const [reviews, setReviews] = useState([]);

  const [showReviewModal, setShowReviewModal] =
    useState(false);

  const [reviewForm, setReviewForm] =
    useState({
      name: "",
      rating: 5,
      review: "",
    });
  const submitReview = async () => {
    try {
      const res = await fetch(
        "https://sivaahbackend.onrender.com/api/reviews",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            productId: product._id,
            ...reviewForm,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return alert(data.message);
      }

      setReviews([data, ...reviews]);

      setReviewForm({
        name: "",
        rating: 5,
        review: "",
      });

      setShowReviewModal(false);

    } catch (err) {
      alert("Something went wrong");
    }
  };
  useEffect(() => {
    fetch(
      `https://sivaahbackend.onrender.com/api/reviews/${product._id}`
    )
      .then((res) => res.json())
      .then((data) => setReviews(data));

  }, [product._id]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className={`pdp-cart-popup ${showCartPopup ? "show" : ""}`}>
        <svg viewBox="0 0 24 24">
          <path d="M20 6L9 17l-5-5" />
        </svg>
        Added to Cart
      </div>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={product?.seo?.keywords || ""} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />

        {/* OpenGraph */}
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        {/* <meta property="og:image" content={product.images?.[0]} /> */}
        <meta
          property="og:image"
          content={
            product.images?.[0]?.replace(
              "/upload/",
              "/upload/w_1200,h_1200,c_fill,q_auto,f_auto/"
            )
          }
        />

        <meta
          property="og:image:secure_url"
          content={
            product.images?.[0]?.replace(
              "/upload/",
              "/upload/w_1200,h_1200,c_fill,q_auto,f_auto/"
            )
          }
        />

        <meta
          property="og:image:type"
          content="image/jpeg"
        />

        <meta
          property="og:image:width"
          content="1200"
        />

        <meta
          property="og:image:height"
          content="1200"
        />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={canonical} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={product.images?.[0]} />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({

              "@context":
                "https://schema.org",

              "@type":
                "FAQPage",

              mainEntity: [

                {
                  "@type": "Question",

                  name:
                    "What is 925 sterling silver?",

                  acceptedAnswer: {

                    "@type": "Answer",

                    text:
                      "925 sterling silver is a premium silver alloy made with 92.5% pure silver and 7.5% strengthening metals for durability and everyday wear."
                  }
                },

                {
                  "@type": "Question",

                  name:
                    "Is 925 silver good quality?",

                  acceptedAnswer: {

                    "@type": "Answer",

                    text:
                      "Yes. 925 sterling silver is considered high-quality fine jewellery material used worldwide for premium jewellery."
                  }
                },

                {
                  "@type": "Question",

                  name:
                    "Is 925 silver pure silver?",

                  acceptedAnswer: {

                    "@type": "Answer",

                    text:
                      "925 silver contains 92.5% pure silver. The remaining 7.5% is added for strength and durability."
                  }
                },

                {
                  "@type": "Question",

                  name:
                    "How to check if 925 silver is real?",

                  acceptedAnswer: {

                    "@type": "Answer",

                    text:
                      "Real sterling silver jewellery usually carries a 925 hallmark stamp. You can also verify authenticity through BIS hallmarking and jeweller certification."
                  }
                },

                {
                  "@type": "Question",

                  name:
                    "Does 925 silver tarnish?",

                  acceptedAnswer: {

                    "@type": "Answer",

                    text:
                      "925 silver can naturally oxidize over time when exposed to air and moisture, but it can easily be cleaned and polished."
                  }
                },

                {
                  "@type": "Question",

                  name:
                    "How to clean silver jewellery at home?",

                  acceptedAnswer: {

                    "@type": "Answer",

                    text:
                      "You can clean sterling silver jewellery gently using mild soap, warm water and a soft cloth. Avoid harsh chemicals."
                  }
                },

                {
                  "@type": "Question",

                  name:
                    "Can I wear 925 silver daily?",

                  acceptedAnswer: {

                    "@type": "Answer",

                    text:
                      "Yes. 925 sterling silver jewellery is durable and suitable for daily wear with proper care."
                  }
                },

                {
                  "@type": "Question",

                  name:
                    "Is 925 silver waterproof?",

                  acceptedAnswer: {

                    "@type": "Answer",

                    text:
                      "925 silver can handle occasional water exposure, but avoiding perfumes, chlorine and chemicals helps maintain shine longer."
                  }
                }
              ]
            })
          }}
        />
     


        <style>{`
          /* ─────────────────────────────────────────
             BASE
          ───────────────────────────────────────── */
          /* ── Premium Review Card── */
   .pdp-review-list {
  display: flex;
  gap: 12px;

  width: 100%;
  max-width: 100%;

  overflow-x: auto;
  overflow-y: hidden;

  padding-bottom: 8px;
  margin-bottom: 1rem;

  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  box-sizing: border-box;
}
.pdp-content {
  min-width: 0;
}
.pdp-review-list::-webkit-scrollbar {
  height: 4px;
}

.pdp-review-list::-webkit-scrollbar-thumb {
  background: #D8CBB3;
  border-radius: 20px;
}

.pdp-review-card {
  flex: 0 0 82%;
  max-width: 82%;
  background: #F7F4EE;
  border: 1px solid #ECE5D8;
  border-radius: 10px;
  padding: 14px;
  scroll-snap-align: start;
  box-sizing: border-box;
}

@media (min-width: 768px) {
 .pdp-review-card {
  flex: 0 0 280px;

  background: #F7F4EE;
  border: 1px solid #ECE5D8;
  border-radius: 10px;

  padding: 14px;

  scroll-snap-align: start;

  box-sizing: border-box;
}
}

.pdp-review-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.pdp-review-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 18px;
  color: #1C1C1A;
}

.pdp-review-stars {
  color: #B08D57;
  letter-spacing: 1px;
  font-size: 12px;
}

.pdp-review-text {
  font-size: 12px;
  line-height: 1.7;
  color: #4A4840;
}
                    /* ── Premium Cart Popup ── */
          .pdp-cart-popup {
            position: fixed;
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%) translateY(20px);
            background: rgba(28, 28, 26, 0.96);
            color: #F5F0E8;
            padding: 14px 22px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-family: 'Montserrat', sans-serif;
            font-size: 11px;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            box-shadow: 0 10px 35px rgba(0,0,0,0.18);
            backdrop-filter: blur(10px);
            z-index: 9999;
            opacity: 0;
            pointer-events: none;
            transition: all 0.35s ease;
          }

          .pdp-cart-popup.show {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }

          .pdp-cart-popup svg {
            width: 16px;
            height: 16px;
            stroke: #D6B98C;
            fill: none;
            stroke-width: 2;
            stroke-linecap: round;
            stroke-linejoin: round;
            flex-shrink: 0;
          }
          .pdp-wrap {
            font-family: 'Montserrat', sans-serif;
            background: #FAFAF8;
            color: #1C1C1A;
          }

          /* ─────────────────────────────────────────
             PAGE SHELL  (max-width container + 2-col on ≥768px)
          ───────────────────────────────────────── */
          .pdp-shell {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem 1.5rem;
          }

          /* Mobile: stack */
          .pdp-grid {
            display: flex;
            flex-direction: column;
            gap: 0;
          }

          /* Tablet / Desktop: side-by-side */
          @media (min-width: 768px) {
            .pdp-shell {
              padding: 2.5rem 2rem;
            }
            .pdp-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 3rem;
              align-items: start;
            }
          }

          @media (min-width: 1024px) {
            .pdp-shell {
              padding: 3rem 2.5rem;
            }
            .pdp-grid {
              grid-template-columns: 55% 1fr;
              gap: 4rem;
            }
          }

          /* ─────────────────────────────────────────
             LEFT COL — IMAGE PANEL
             Fixed square container regardless of image shape
          ───────────────────────────────────────── */
          .pdp-image-col {
            position: relative;
          }

          /* The image container is ALWAYS a perfect square.
             Every product image — portrait, landscape, square —
             gets cropped/fitted to fill exactly this box. */
          .pdp-image-area {
            position: relative;
            width: 100%;
            /* padding-bottom trick forces a 1:1 square at any width */
            padding-bottom: 100%;
            background: #F2EDE6;
            overflow: hidden;
            border-radius: 3px;
          }

          .pdp-main-img {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;   /* fills the square, crops excess */
            object-position: center;
            display: block;
          }

          .pdp-badge-purity {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: rgba(28, 28, 26, 0.80);
            color: #F5F0E8;
            font-size: 9px;
            letter-spacing: 0.2em;
            padding: 6px 10px;
            border-radius: 2px;
            text-transform: uppercase;
            z-index: 1;
          }

          /* Thumbnails sit below the square on all screen sizes */
          .pdp-thumbs {
            display: flex;
            gap: 8px;
            padding: 10px 0 0;
            flex-wrap: wrap;
          }

          .pdp-thumb {
            width: 64px;
            height: 64px;
            object-fit: cover;        /* thumbnails also always square */
            object-position: center;
            border-radius: 2px;
            cursor: pointer;
            border: 1.5px solid transparent;
            opacity: 0.6;
            transition: border-color 0.2s, opacity 0.2s;
            flex-shrink: 0;
          }

          .pdp-thumb.active,
          .pdp-thumb:hover {
            border-color: #1C1C1A;
            opacity: 1;
          }

          /* ─────────────────────────────────────────
             RIGHT COL — CONTENT PANEL
          ───────────────────────────────────────── */
          .pdp-content {
            padding: 0.25rem 0 0;   /* small top nudge on mobile */
          }

          @media (min-width: 768px) {
            .pdp-content {
              padding: 0;
              /* stick content to top of column */
              position: sticky;
              top: 1.5rem;
            }
          }

          .pdp-emotion {
            font-size: 9px;
            letter-spacing: 0.35em;
            text-transform: uppercase;
            color: #9B8F78;
            margin-bottom: 0.5rem;
            margin-top: 1.5rem;
          }

          @media (min-width: 768px) {
            .pdp-emotion { margin-top: 0; }
          }

          .pdp-title {
            font-family: 'Cormorant Garamond', serif;
            font-size: 28px;
            font-weight: 300;
            line-height: 1.2;
            color: #1C1C1A;
            margin-bottom: 0.45rem;
          }

          @media (min-width: 1024px) {
            .pdp-title { font-size: 32px; }
          }

          .pdp-subtitle {
            font-size: 10px;
            letter-spacing: 0.14em;
            color: #8A8678;
            text-transform: uppercase;
            margin-bottom: 1.4rem;
          }

          /* ── Pricing ── */
          .pdp-price-row {
            display: flex;
            align-items: baseline;
            gap: 10px;
            margin-bottom: 0.5rem;
          }
          .pdp-price {
            font-family: 'Cormorant Garamond', serif;
            font-size: 34px;
            font-weight: 400;
            color: #1C1C1A;
          }
          .pdp-mrp {
            font-size: 13px;
            color: #B0A896;
            text-decoration: line-through;
          }
          .pdp-savings {
            font-size: 9px;
            letter-spacing: 0.14em;
            color: #7A6E58;
            background: #EDE8DE;
            padding: 3px 8px;
            border-radius: 2px;
          }

        .pdp-stock {

  display: inline-flex;

  align-items: center;

  gap: 7px;

  font-size: 10px;

  letter-spacing: 0.14em;

  text-transform: uppercase;

  color: #A0795A;

  margin-bottom: 1.4rem;
}
          .pdp-stock-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #A0795A;
            animation: pdp-pulse 2s infinite;
            flex-shrink: 0;
          }
          @keyframes pdp-pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.35; }
          }

          /* ── Buttons ── */
          .pdp-btn-primary {
            display: block;
            width: 100%;
            background: #1C1C1A;
            color: #F5F0E8;
            border: none;
            padding: 15px;
            font-family: 'Montserrat', sans-serif;
            font-size: 10px;
            letter-spacing: 0.35em;
            text-transform: uppercase;
            cursor: pointer;
            margin-bottom: 10px;
            border-radius: 1px;
            transition: background 0.2s;
          }
          .pdp-btn-primary:hover { background: #3A3832; }

          .pdp-btn-secondary {
            display: block;
            width: 100%;
            background: transparent;
            color: #1C1C1A;
            border: 0.5px solid #1C1C1A;
            padding: 14px;
            font-family: 'Montserrat', sans-serif;
            font-size: 10px;
            letter-spacing: 0.35em;
            text-transform: uppercase;
            cursor: pointer;
            border-radius: 1px;
            transition: background 0.2s;
          }
          .pdp-btn-secondary:hover { background: #F2EDE6; }

          /* ── Trust strip ── */
          .pdp-trust-row {
            display: flex;
            justify-content: space-between;
            margin: 1.4rem 0;
            padding: 1rem 0;
            border-top: 0.5px solid #D9D5C8;
            border-bottom: 0.5px solid #D9D5C8;
          }
          .pdp-trust-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;
            flex: 1;
          }
          .pdp-trust-icon {
            width: 18px;
            height: 18px;
            stroke: #7A6E58;
            fill: none;
            stroke-width: 1.5;
            stroke-linecap: round;
            stroke-linejoin: round;
          }
          .pdp-trust-label {
            font-size: 8px;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #8A8678;
            text-align: center;
            line-height: 1.4;
          }

          /* ── Sections ── */
          .pdp-section-label {
            font-size: 9px;
            letter-spacing: 0.3em;
            text-transform: uppercase;
            color: #9B8F78;
            margin-bottom: 0.7rem;
            margin-top: 1.4rem;
          }
          .pdp-desc {
            font-size: 13px;
            line-height: 1.9;
            color: #4A4840;
          }

          /* ── Specs ── */
          .pdp-spec-grid {
            display: flex;
            flex-direction: column;
            gap: 6px;
          }
          .pdp-spec {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 9px 13px;
            background: #F2EDE6;
            border-radius: 2px;
          }
          .pdp-spec-icon {
            width: 15px;
            height: 15px;
            stroke: #7A6E58;
            fill: none;
            stroke-width: 1.5;
            stroke-linecap: round;
            stroke-linejoin: round;
            flex-shrink: 0;
          }
          .pdp-spec-text {
            font-size: 11px;
            color: #4A4840;
            letter-spacing: 0.04em;
          }

          /* ── Hallmark card ── */
          .pdp-hallmark {
            margin-top: 1.5rem;
            padding: 1.1rem 1.2rem;
            border: 0.5px solid #D9D5C8;
            border-radius: 2px;
            display: flex;
            align-items: center;
            gap: 13px;
            background: #FFFFFF;
          }
          .pdp-hallmark-icon {
            width: 24px;
            height: 24px;
            stroke: #9B8F78;
            fill: none;
            stroke-width: 1.5;
            stroke-linecap: round;
            stroke-linejoin: round;
            flex-shrink: 0;
          }
          .pdp-hallmark-title {
            font-family: 'Cormorant Garamond', serif;
            font-size: 15px;
            font-weight: 400;
            color: #1C1C1A;
            margin-bottom: 2px;
          }
          .pdp-hallmark-sub {
            font-size: 10px;
            color: #8A8678;
            letter-spacing: 0.06em;
          }
            
/* ─────────────────────────────────────────
   LIVE SILVER RATE
───────────────────────────────────────── */

.pdp-live-rate {

  display: inline-flex;

  align-items: center;

  gap: 8px;

  background:
    rgba(176,141,87,0.08);

  color: #8A6B45;

  padding: 8px 14px;

  border-radius: 999px;

  font-size: 10px;

  letter-spacing: 0.12em;

  text-transform: uppercase;

  margin-bottom: 1.6rem;
}

.live-dot {

  width: 6px;

  height: 6px;

  border-radius: 50%;

  background: #B08D57;

  animation: livePulse 2s infinite;
}

@keyframes livePulse {

  0%,100% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }
}

/* ─────────────────────────────────────────
   TRANSPARENT PRICING
───────────────────────────────────────── */

.pdp-price-breakdown {

  margin-top: 0.7rem;

  border:
    0.5px solid #DDD3C4;

  background:
    linear-gradient(
      180deg,
      #FFFDF9,
      #F8F3EB
    );

  border-radius: 4px;

  overflow: hidden;
}

.pdp-break-row {

  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 12px;

  padding: 16px 18px;

  border-bottom:
    0.5px solid #E7DED1;
}

.pdp-break-row:last-child {

  border-bottom: none;
}

.pdp-break-title {

  font-family:
    'Cormorant Garamond',
    serif;

  font-size: 20px;

  color: #1C1C1A;

  margin-bottom: 2px;
}

.pdp-break-sub {

  font-size: 11px;

  color: #8A8678;

  line-height: 1.6;
}

.pdp-break-price {

  font-size: 15px;

  font-weight: 600;

  color: #1C1C1A;

  white-space: nowrap;
}

.pdp-break-total {

  display: flex;

  align-items: center;

  justify-content: space-between;

  padding: 18px;

  background:
    rgba(214,185,140,0.08);

  font-family:
    'Cormorant Garamond',
    serif;

  font-size: 28px;

  color: #1C1C1A;
}

.pdp-pricing-note {

  margin-top: 14px;

  font-size: 11px;

  line-height: 1.8;

  color: #7B7468;
}

/* MOBILE */

@media(max-width:768px){

  .pdp-break-row {

    padding: 14px;
  }

  .pdp-break-title {

    font-size: 17px;
  }

  .pdp-break-sub {

    font-size: 10px;
  }

  .pdp-break-total {

    font-size: 22px;
  }
}
  /* ─────────────────────────────────────────
   PRICING TOGGLE
───────────────────────────────────────── */

.pdp-pricing-wrap {

  margin-top: 1.8rem;

  border-top:
    0.5px solid #E8DED1;

  padding-top: 1.2rem;
}

.pdp-pricing-toggle {

  width: 100%;

  background: none;

  border: none;

  display: flex;

  align-items: center;

  justify-content: space-between;

  padding: 0;

  cursor: pointer;

  color: #1C1C1A;

  font-size: 13px;

  font-weight: 500;

  letter-spacing: 0.03em;
}

.pricing-arrow {

  transition: 0.35s ease;

  font-size: 18px;
}

.pricing-arrow.open {

  transform: rotate(180deg);
}

/* COLLAPSE */

.pdp-pricing-content {

  max-height: 0;

  overflow: hidden;

  transition:
    max-height 0.45s ease,
    opacity 0.3s ease;

  opacity: 0;
}

.pdp-pricing-content.show {

  max-height: 800px;

  opacity: 1;

  margin-top: 1.2rem;
}

/* BREAKDOWN */

.pdp-price-breakdown {

  border:
    0.5px solid #DDD3C4;

  background:
    linear-gradient(
      180deg,
      #FFFDF9,
      #F8F3EB
    );

  border-radius: 4px;

  overflow: hidden;
}

.pdp-break-row {

  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 12px;

  padding: 16px 18px;

  border-bottom:
    0.5px solid #E7DED1;
}

.pdp-break-title {

  font-family:
    'Cormorant Garamond',
    serif;

  font-size: 20px;

  color: #1C1C1A;

  margin-bottom: 2px;
}

.pdp-break-sub {

  font-size: 11px;

  color: #8A8678;

  line-height: 1.6;
}

.pdp-break-price {

  font-size: 15px;

  font-weight: 600;

  color: #1C1C1A;

  white-space: nowrap;
}

.pdp-break-total {

  display: flex;

  align-items: center;

  justify-content: space-between;

  padding: 18px;

  background:
    rgba(214,185,140,0.08);

  font-family:
    'Cormorant Garamond',
    serif;

  font-size: 28px;

  color: #1C1C1A;
}

.pdp-pricing-note {

  margin-top: 12px;

  font-size: 11px;

  line-height: 1.8;

  color: #7B7468;
}

/* MOBILE */

@media(max-width:768px){

  .pdp-break-row {

    padding: 14px;
  }

  .pdp-break-title {

    font-size: 17px;
  }

  .pdp-break-sub {

    font-size: 10px;
  }

  .pdp-break-total {

    font-size: 22px;
  }
}
  .seo-copy {

  margin-top: 22px;

  font-size: 13px;

  line-height: 1.9;

  color: #5E584D;
}
  /* ─────────────────────────────────────────
   FAQ SECTION
───────────────────────────────────────── */

.pdp-faq-wrap {

  margin-top: 1rem;

  border-top:
    0.5px solid #E8DED1;
}

.pdp-faq-item {

  border-bottom:
    0.5px solid #E8DED1;
}

.pdp-faq-question {

  width: 100%;

  background: none;

  border: none;

  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 20px;

  padding: 18px 0;

  cursor: pointer;

  text-align: left;

  color: #1C1C1A;

  font-size: 13px;

  font-weight: 500;

  line-height: 1.7;
}

.faq-arrow {

  font-size: 22px;

  color: #8A8678;

  transition: 0.35s ease;

  flex-shrink: 0;
}

.faq-arrow.open {

  transform: rotate(45deg);
}

.pdp-faq-answer {

  max-height: 0;

  overflow: hidden;

  opacity: 0;

  transition:
    max-height 0.4s ease,
    opacity 0.3s ease;

  padding-right: 28px;
}

.pdp-faq-answer.show {

  max-height: 220px;

  opacity: 1;

  padding-bottom: 18px;
}

.pdp-faq-answer p {

  font-size: 12px;

  line-height: 1.9;

  color: #6A655B;

  margin: 0;
}

/* MOBILE */

@media(max-width:768px){

  .pdp-faq-question {

    font-size: 12px;

    padding: 16px 0;
  }

  .faq-arrow {

    font-size: 18px;
  }

  .pdp-faq-answer p {

    font-size: 11px;
  }
}
  /* SHARE BUTTON */

.pdp-share-btn {

  width: 100%;

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 10px;

  background: none;

  border: none;

  padding: 15px 10px;

  cursor: pointer;

  color: #7A6E58;

  font-size: 10px;

  letter-spacing: 0.18em;

  text-transform: uppercase;

  transition: 0.3s ease;
}

.pdp-share-btn:hover {

  color: #1C1C1A;
}

.share-icon {

  width: 16px;

  height: 16px;

  stroke: currentColor;

  fill: none;

  stroke-width: 1.7;

  stroke-linecap: round;

  stroke-linejoin: round;
}
  /* BREADCRUMBS */

.pdp-breadcrumbs {

  display: flex;

  align-items: center;

  gap: 10px;

  margin-bottom: 1.2rem;

  font-size: 10px;

  color: #9B8F78;

  letter-spacing: 0.08em;

  text-transform: uppercase;
}

.pdp-breadcrumbs a {

  color: inherit;

  text-decoration: none;
}
.pdp-delivery {

  font-size: 12px;

  color: #6F685D;

  margin-bottom: 10px;

  line-height: 1.6;
}

.pdp-delivery strong {

  color: #1C1C1A;

  font-weight: 600;
}
  /* ─────────────────────────────
   NEW PRICING UI
───────────────────────────── */
/* ─────────────────────────────
   LUXURY TRANSPARENT PRICING
───────────────────────────── */

.pdp-price-breakdown {

  margin-top: 4px;

  border:
    0.5px solid #E5DDD0;

  background:
    #FCFAF7;

  border-radius: 18px;

  overflow: hidden;
}

/* TOP */

.pdp-pricing-top {

  padding:
    18px 18px 14px;

  border-bottom:
    0.5px solid #EEE5D8;
}

.pdp-pricing-name {

  font-family:
    'Cormorant Garamond',
    serif;

  font-size: 24px;

  font-weight: 500;

  line-height: 1.1;

  color: #1C1C1A;

  margin-bottom: 8px;
}

.pdp-pricing-meta {

  font-size: 11px;

  line-height: 1.8;

  color: #787264;

  letter-spacing: 0.01em;
}

/* ROWS */

.pdp-break-row {

  display: flex;

  justify-content: space-between;

  align-items: flex-start;

  gap: 14px;

  padding:
    15px 18px;

  border-bottom:
    0.5px solid #EEE5D8;
}

/* LEFT */

.pdp-break-title {

  font-size: 13px;

  font-weight: 500;

  color: #1F1F1B;

  margin-bottom: 3px;

  letter-spacing: 0.01em;
}

.pdp-break-sub {

  font-size: 11px;

  line-height: 1.7;

  color: #8B8579;
}

/* RIGHT */

.pdp-break-price {

  font-size: 14px;

  font-weight: 400;

  color: #4B463D;

  white-space: nowrap;

  letter-spacing: -0.01em;

  padding-top: 1px;
}

/* TOTAL */

.pdp-break-total {

  display: flex;

  justify-content: space-between;

  align-items: flex-start;

  gap: 20px;

  padding:
    20px 18px;

  background:
    #FAF7F2;
}

.pdp-total-title {

  font-size: 13px;

  font-weight: 500;

  color: #1C1C1A;

  margin-bottom: 7px;
}

.pdp-total-sub {

  display: inline-flex;

  align-items: center;

  gap: 6px;

  background:
    #EEF5E7;

  color:
    #537241;

  padding:
    5px 10px;

  border-radius: 999px;

  font-size: 10px;

  font-weight: 500;

  letter-spacing: 0.01em;

  text-transform: none;
}

.pdp-total-sub::before {

  content: "✦";

  font-size: 9px;
}

.pdp-break-total > div:last-child {

  font-family:
    'Cormorant Garamond',
    serif;

  font-size: 46px;

  font-weight: 500;

  line-height: 1;

  letter-spacing: -0.03em;

  color: #1C1C1A;
}

/* NOTE */

.pdp-pricing-note {

  margin-top: 16px;

  font-size: 12px;

  line-height: 1.95;

  color: #625C52;
}

.pdp-pricing-note strong {

  color: #1C1C1A;

  font-weight: 600;
}

/* MOBILE */

@media(max-width:768px){

  .pdp-pricing-name {

    font-size: 21px;
  }

  .pdp-pricing-meta {

    font-size: 10px;
  }

  .pdp-break-row {

    padding:
      14px 15px;
  }

  .pdp-break-title {

    font-size: 12px;
  }

  .pdp-break-sub {

    font-size: 10px;
  }

  .pdp-break-price {

    font-size: 13px;
  }

  .pdp-break-total {

    padding:
      18px 15px;
  }

  .pdp-break-total > div:last-child {

    font-size: 38px;
  }

  .pdp-pricing-note {

    font-size: 11px;
  }
}
/* MOBILE */

@media(max-width:768px){

  .pdp-pricing-name {

    font-size: 22px;
  }

  .pdp-break-title {

    font-size: 17px;
  }

  .pdp-break-price {

    font-size: 15px;
  }

  .pdp-break-total {

    font-size: 28px;
  }

  .pdp-total-title {

    font-size: 20px;
  }
}
  .pdp-coupon-note {

  padding:
    14px 18px;

  border-top:
    0.5px solid #EEE5D8;

  font-size: 11px;

  color: #6B655B;

  background:
    #FCFAF7;
}

.pdp-coupon-note span {

  display: inline-flex;

  align-items: center;

  justify-content: center;

  margin:
    0 4px;

  padding:
    4px 8px;

  border-radius: 999px;

  background:
    rgba(176,141,87,0.12);

  color:
    #8C6B3F;

  font-weight: 600;

  letter-spacing: 0.06em;

  font-size: 10px;
}
  /* COUPON STRIP */

.pdp-coupon-strip {

  display: inline-flex;

  align-items: center;

  flex-wrap: wrap;

  gap: 8px;

  margin:
    10px 0 18px;

  padding:
    10px 14px;

  border-radius: 999px;

  background:
    rgba(176,141,87,0.08);

  color:
    #6A614F;

  font-size: 11px;

  line-height: 1.5;
}

.pdp-coupon-strip span {

  display: inline-flex;

  align-items: center;

  justify-content: center;

  padding:
    4px 8px;

  border-radius: 999px;

  background:
    rgba(176,141,87,0.14);

  color:
    #8C6B3F;

  font-size: 10px;

  font-weight: 600;

  letter-spacing: 0.08em;
}
        `}</style>
  <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({

      "@context":
        "https://schema.org",

      "@type":
        "Product",

      name:
        product?.name || "",

      image:
        product?.images?.map(
          img =>
            img.startsWith("http")
              ? img
              : `https://www.sivaah.in${img}`
        ) || [],

      description:
        product?.description ||

        `${product?.name} handcrafted in premium 925 sterling silver by SIVAAH.`,

      sku:
        product?._id || "",

      mpn:
        product?._id || "",

      brand: {

        "@type":
          "Brand",

        name:
          "SIVAAH"
      },

      category:
        product?.category || "",

      offers: {

        "@type":
          "Offer",

        url:
          `https://www.sivaah.in/product/${product?.slug}`,

        priceCurrency:
          "INR",

        price:
          Number(product?.price || 0),

        availability:
          product?.quantity > 0

            ? "https://schema.org/InStock"

            : "https://schema.org/OutOfStock",

        itemCondition:
          "https://schema.org/NewCondition",

        seller: {

          "@type":
            "Organization",

          name:
            "SIVAAH"
        }
      }

    })
  }}
/>
      </Head>

      <div className="pdp-wrap">
        <div className="pdp-shell">
          <div className="pdp-grid">

            {/* ── LEFT: Image column ── */}
            <div className="pdp-image-col">

              {/* Fixed square image container — same shape for every product */}
              <div className="pdp-image-area">
                {mainImage ? (
                  <Image
                    src={mainImage}
                    alt={`${product.name} – 925 sterling silver jewellery by SIVAAH`}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="pdp-main-img"
                  />
                ) : (
                  <div style={{
                    position: "absolute", inset: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#8A8678", fontSize: "13px"
                  }}>
                    No image available
                  </div>
                )}
                <div className="pdp-badge-purity">925 Sterling Silver</div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="pdp-thumbs">
                  {images.map((img, i) => (
                    <img
                      key={i}
                      src={img.replace("/upload/", "/upload/w_120,h_120,c_fill,q_auto,f_auto/")}
                      alt={`${product.name} view ${i + 1}`}
                      className={`pdp-thumb ${i === activeImage ? "active" : ""}`}
                      onClick={() => setActiveImage(i)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* ── RIGHT: Content column ── */}
            <div className="pdp-content">
              <div className="pdp-breadcrumbs">

                <a href="/">
                  Home
                </a>

                <span>/</span>

                <a href="/shop">
                  Shop
                </a>

                <span>/</span>

                <span>
                  {product.category}
                </span>

              </div>
              <div className="pdp-emotion">{product.emotion}</div>
              <h1 className="pdp-title">{product.name}</h1>
              <div className="pdp-subtitle">{product.subtitle}</div>

              {/* Price */}
              <div className="pdp-price-row">
                <div className="pdp-price">₹{product.price}</div>
                {product.mrp && (
                  <>
                    <div className="pdp-mrp">₹{product.mrp}</div>
                    <div className="pdp-savings">
                      {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% off
                    </div>
                  </>
                )}
              </div>
              {/* Coupon */}
              <div className="pdp-coupon-strip">

                <span>
                  SIVAAH10
                </span>

                Enjoy 10% welcome savings at checkout

              </div>
              {/* Stock */}
              <div className="pdp-delivery">

                Free delivery by
                <strong>
                  {" "}
                  {new Date(
                    Date.now() + 5 * 24 * 60 * 60 * 1000
                  ).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "short"
                    }
                  )}
                </strong>

              </div>
              <div className="pdp-stock">

                <span className="pdp-stock-dot" />
                Only a few pieces remain
              </div>

              {/* CTA buttons */}
              <button
                className="pdp-btn-primary"
                onClick={() => {
                  addToCart(product);
                  router.push("/checkout");
                }}
              >
                Buy Now
              </button>
              <button
                className="pdp-btn-secondary"
                onClick={() => {
                  addToCart(product);
                  setShowCartPopup(true);
                }}
              >
                Add to Cart
              </button>
              <button
                className="pdp-share-btn"

                onClick={async () => {

                  const shareData = {

                    title:
                      product.name,

                    text:
                      `Check out this ${product.name} from SIVAAH ✨`,

                    url:
                      `https://sivaah.in/product/${product.slug}`
                  };

                  try {

                    if (
                      navigator.share
                    ) {

                      await navigator.share(
                        shareData
                      );

                    } else {

                      await navigator.clipboard.writeText(
                        shareData.url
                      );

                      setShowCartPopup(true);
                    }

                  } catch (err) {

                    console.log(err);
                  }
                }}
              >

                <svg
                  viewBox="0 0 24 24"
                  className="share-icon"
                >

                  <path d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7" />

                  <path d="M16 6l-4-4-4 4" />

                  <path d="M12 2v13" />

                </svg>

                Share this piece

              </button>
              {/* Trust strip */}
              <div className="pdp-trust-row">
                <div className="pdp-trust-item">
                  <svg className="pdp-trust-icon" viewBox="0 0 24 24">
                    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                  </svg>
                  <span className="pdp-trust-label">BIS<br />Hallmarked</span>
                </div>
                <div className="pdp-trust-item">
                  <svg className="pdp-trust-icon" viewBox="0 0 24 24">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                  <span className="pdp-trust-label">Genuine<br />925 Silver</span>
                </div>
                <div className="pdp-trust-item">
                  <svg className="pdp-trust-icon" viewBox="0 0 24 24">
                    <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
                    <circle cx="18.5" cy="15.5" r="2.5" />
                    <path d="M20.27 17.27 22 19" />
                  </svg>
                  <span className="pdp-trust-label">Luxury<br />Packaging</span>
                </div>
                <div className="pdp-trust-item">
                  <svg className="pdp-trust-icon" viewBox="0 0 24 24">
                    <rect x="1" y="3" width="15" height="13" rx="1" />
                    <path d="M16 8h4l3 3v5h-7V8z" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                  <span className="pdp-trust-label">Free<br />Delivery</span>
                </div>
              </div>
              {/* Specifications */}
              {Array.isArray(product.benefits) && product.benefits.length > 0 && (
                <>
                  <div className="pdp-section-label">Specifications</div>
                  <div className="pdp-spec-grid">
                    {product.benefits.map((b, i) => (
                      <div className="pdp-spec" key={i}>
                        <svg className="pdp-spec-icon" viewBox="0 0 24 24">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span className="pdp-spec-text">{b}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {/* Description */}
              <div className="pdp-section-label">About this piece</div>
              <p className="pdp-desc">{product.description}</p>
              <div className="seo-copy">

                Crafted in genuine 925 sterling silver,
                this {product.name} blends timeless
                elegance with modern minimalism.
                Designed for everyday luxury, gifting
                and special occasions, every SIVAAH
                piece is BIS hallmarked and crafted
                for long-lasting shine and comfort.

              </div>
              {/* TRANSPARENT PRICING */}

              {/* TRANSPARENT PRICING */}

              <div className="pdp-pricing-wrap">

                <button
                  className="pdp-pricing-toggle"
                  onClick={() =>
                    setShowPricing(
                      !showPricing
                    )
                  }
                >

                  <span>
                    See how this is priced
                  </span>

                  <span
                    className={`pricing-arrow ${showPricing
                      ? "open"
                      : ""
                      }`}
                  >
                    ↓
                  </span>

                </button>

                <div
                  className={`pdp-pricing-content ${showPricing
                    ? "show"
                    : ""
                    }`}
                >

                  <div className="pdp-price-breakdown">

                    {/* HEADER */}

                    <div className="pdp-pricing-top">

                      <div className="pdp-pricing-name">
                        925 Sterling Silver Jewellery
                      </div>

                      <div className="pdp-pricing-meta">

                        {product.grams}g •
                        BIS 925 hallmarked •
                        Rhodium plated •
                        Pan India delivery

                      </div>

                    </div>

                    {/* SILVER */}

                    <div className="pdp-break-row">

                      <div>

                        <div className="pdp-break-title">
                          Pure 925 Silver
                        </div>

                        <div className="pdp-break-sub">
                          {product.grams}g × ₹{silverRate}/g
                        </div>

                      </div>

                      <div className="pdp-break-price">
                        ₹{silverValue}
                      </div>

                    </div>

                    {/* GST */}

                    <div className="pdp-break-row">

                      <div>

                        <div className="pdp-break-title">
                          Govt. GST & Taxes
                        </div>

                        <div className="pdp-break-sub">
                          3% on silver + 5% on making
                        </div>

                      </div>

                      <div className="pdp-break-price">
                        ₹{govtTax}
                      </div>

                    </div>

                    {/* CRAFT */}

                    <div className="pdp-break-row">

                      <div>

                        <div className="pdp-break-title">
                          Craftsmanship & Finishing
                        </div>

                        <div className="pdp-break-sub">
                          Designing, filing, polishing & detailing by skilled artisans
                        </div>

                      </div>

                      <div className="pdp-break-price">
                        ₹{craftsmanshipValue}
                      </div>

                    </div>

                    {/* PLATING */}

                    <div className="pdp-break-row">

                      <div>

                        <div className="pdp-break-title">
                          Rhodium Plating & Hallmark
                        </div>

                        <div className="pdp-break-sub">
                          Anti Tarnish Rhodium plating for lasting shine & BIS 925 certification
                        </div>

                      </div>

                      <div className="pdp-break-price">
                        ₹{platingValue}
                      </div>

                    </div>

                    {/* BRAND */}

                    <div className="pdp-break-row">

                      <div>

                        <div className="pdp-break-title">
                          Brand Experience & Fulfillment

                        </div>

                        <div className="pdp-break-sub">
                          quality check, maintainence & fulfilment
                        </div>

                      </div>

                      <div className="pdp-break-price">
                        ₹{brandValue}
                      </div>

                    </div>

                    {/* TOTAL */}

                    <div className="pdp-break-total">

                      <div>

                        <div className="pdp-total-title">
                          You Pay
                        </div>

                        <div className="pdp-total-sub">
                          Real silver. Honest pricing. No unnecessary markups.
                        </div>

                      </div>

                      <div>
                        ₹{product.price}
                      </div>

                    </div>
                    <div className="pdp-coupon-note">

                      Use code

                      <span>
                        SIVAAH10
                      </span>

                      for extra savings at checkout

                    </div>
                  </div>

                  <div className="pdp-pricing-note">

                    We openly share silver weight,
                    live silver pricing and craftsmanship
                    costs — because trust should never
                    be hidden.

                  </div>

                </div>

              </div>

              <div className="pdp-section-label">
                Customer Reviews
              </div>

              <div className="pdp-review-list">

                {reviews.length === 0 && (
                  <div className="pdp-no-review">
                    No reviews yet
                  </div>
                )}

                {reviews.map((r, i) => (
                  <div
                    className="pdp-review-card"
                    key={i}
                  >

                    <div className="pdp-review-top">

                      <div className="pdp-review-name">
                        {r.name}
                      </div>

                      <div className="pdp-review-stars">
                        {"★".repeat(r.rating)}
                      </div>

                    </div>

                    <div className="pdp-review-text">
                      {r.review}
                    </div>

                  </div>
                ))}
              </div>

              <button
                className="pdp-btn-secondary"
                onClick={() => setShowReviewModal(true)}
              >
                Add Review
              </button>
              {/* FAQ SECTION */}

              <div className="pdp-section-label">
                Silver Jewellery FAQs
              </div>

              <div className="pdp-faq-wrap">

                {faqData.map((faq, i) => (

                  <div
                    className="pdp-faq-item"
                    key={i}
                  >

                    <button
                      className="pdp-faq-question"

                      onClick={() =>
                        setOpenFaq(
                          openFaq === i
                            ? null
                            : i
                        )
                      }
                    >

                      <span>
                        {faq.q}
                      </span>

                      <span
                        className={`faq-arrow ${openFaq === i
                          ? "open"
                          : ""
                          }`}
                      >
                        +
                      </span>

                    </button>

                    <div
                      className={`pdp-faq-answer ${openFaq === i
                        ? "show"
                        : ""
                        }`}
                    >

                      <p>
                        {faq.a}
                      </p>

                    </div>

                  </div>

                ))}

              </div>
              {/* Hallmark guarantee */}
              <div className="pdp-hallmark">
                <svg className="pdp-hallmark-icon" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <div>
                  <div className="pdp-hallmark-title">Hallmarked Quality Guarantee</div>
                  <div className="pdp-hallmark-sub">Every SIVAAH piece is certified &amp; quality-assured</div>
                </div>
              </div>

            </div>
            {/* end right col */}

          </div>
        </div>
      </div>
      {showReviewModal && (
        <div className="pdp-review-modal-overlay">

          <div className="pdp-review-modal">

            <div className="pdp-review-modal-title">
              Share Your Experience
            </div>

            <input
              placeholder="Your Name"
              value={reviewForm.name}
              onChange={(e) =>
                setReviewForm({
                  ...reviewForm,
                  name: e.target.value,
                })
              }
            />

            <select
              value={reviewForm.rating}
              onChange={(e) =>
                setReviewForm({
                  ...reviewForm,
                  rating: Number(e.target.value),
                })
              }
            >
              <option value={5}>★★★★★</option>
              <option value={4}>★★★★</option>
              <option value={3}>★★★</option>
              <option value={2}>★★</option>
              <option value={1}>★</option>
            </select>

            <textarea
              rows={5}
              placeholder="Write your review..."
              value={reviewForm.review}
              onChange={(e) =>
                setReviewForm({
                  ...reviewForm,
                  review: e.target.value,
                })
              }
            />

            <button
              className="pdp-btn-primary"
              onClick={submitReview}
            >
              Submit Review
            </button>

          </div>
        </div>
      )}
    </>
  );
}


export async function getStaticPaths() {

  const res = await fetch(
    "https://sivaahbackend.onrender.com/api/products"
  );

  const products = await res.json();

  const paths = products.map((product) => ({
    params: {
      slug: product.slug,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {

  try {

    const [
      productRes,
      rateRes
    ] = await Promise.all([

      fetch(
        `https://sivaahbackend.onrender.com/api/products/slug/${params.slug}`
      ),

      fetch(
        "https://sivaahbackend.onrender.com/api/rate"
      )

    ]);

    if (!productRes.ok) {

      return {
        notFound: true
      };
    }

    const product =
      await productRes.json();

    const rateData =
      await rateRes.json();

    return {

      props: {

        product,

        silverRate:
          rateData.rate || 0
      },

      revalidate: 3600
    };

  } catch {

    return {
      notFound: true
    };
  }
}