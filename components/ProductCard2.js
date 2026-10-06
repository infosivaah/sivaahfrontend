import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCart } from "../context/CartContext";
import Image from "next/image";

export default function ProductCard({ product }) {
  const router = useRouter();
  const { addToCart } = useCart();

  const [isAdded, setIsAdded] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const images = Array.isArray(product?.images)
    ? product.images
    : [];

  /* =========================
     IMAGE
  ========================= */

  const firstImage = images?.[0]
    ? images[0].replace(
        "/upload/",
        "/upload/w_700,h_850,c_fill,q_auto,f_auto/"
      )
    : "/placeholder.jpg";

  const secondImage = images?.[1]
    ? images[1].replace(
        "/upload/",
        "/upload/w_700,h_850,c_fill,q_auto,f_auto/"
      )
    : null;

  /* =========================
     PRICE
  ========================= */

  const sellingPrice = Number(product?.price || 0);
  const mrp = Number(product?.mrp || 0);

  // Actual MRP discount
  const discount =
    mrp > sellingPrice
      ? Math.round(((mrp - sellingPrice) / mrp) * 100)
      : 0;

  // 20% coupon price
  const couponPrice = Math.round(sellingPrice * 0.8);

  /* =========================
     ADD TO CART
  ========================= */

  const handleAddToCart = (e) => {
    e.preventDefault();

    if (isAdded || toastVisible) return;

    addToCart(product);

    setIsAdded(true);
    setToastVisible(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 1500);

    setTimeout(() => {
      setToastVisible(false);
    }, 2200);
  };

  /* =========================
     BUY NOW
  ========================= */

  const handleBuyNow = (e) => {
    e.preventDefault();

    addToCart(product);
    router.push("/checkout");
  };

  return (
    <>
      {/* =========================
          TOAST
      ========================= */}

      {toastVisible && (
        <div className="lux-toast">

          <div className="toast-icon">
            ✓
          </div>

          <div className="toast-content">

            <div className="toast-title">
              Added To Cart
            </div>

            <div className="toast-text">
              Product added successfully
            </div>

          </div>

        </div>
      )}

      {/* =========================
          PRODUCT CARD
      ========================= */}

      <div className="lux-card">

        {/* =========================
            IMAGE
        ========================= */}

        <Link
          prefetch={true}
          href={`/product/${product.slug}`}
          className="text-decoration-none"
        >
          <div className="image-wrap">

            {/* DISCOUNT BADGE */}

            {discount > 0 && (
              <span className="discount-badge">
                {discount}% OFF
              </span>
            )}

            {/* PRIMARY IMAGE */}

            <Image
              src={firstImage}
              alt={
                product?.name ||
                "Sivaah Silver Jewellery"
              }
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="product-image primary-image"
            />

            {/* SECOND IMAGE */}

            {secondImage && (
              <Image
                src={secondImage}
                alt={
                  product?.name ||
                  "Sivaah Silver Jewellery"
                }
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="product-image secondary-image"
              />
            )}

            {/* IMAGE OVERLAY */}

            <div className="image-overlay"></div>

          </div>
        </Link>

        {/* =========================
            CONTENT
        ========================= */}

        <div className="card-content">

          {/* CATEGORY */}

          {product?.category && (
            <div className="meta-row">
              <span className="meta-pill">
                {product.category}
              </span>
            </div>
          )}

          {/* PRODUCT TITLE */}

          <Link
            href={`/product/${product.slug}`}
            className="text-decoration-none"
          >
            <h3 className="product-title">
              {product?.name}
            </h3>
          </Link>

          {/* MATERIAL */}

          <div className="product-material">

            <span>
              92.5% Pure Silver
            </span>

            <b>•</b>

            <span>
              Premium Finish
            </span>

          </div>

          {/* =========================
              PRICE
          ========================= */}

         

          {/* =========================
              BUTTONS
          ========================= */}

          <div className="btn-row">

            <button
              className={`cart-btn ${
                isAdded ? "added" : ""
              }`}
              onClick={handleAddToCart}
              disabled={isAdded}
            >
              {isAdded
                ? "✓ Added"
                : "Add to Cart"}
            </button>

            <button
              className="buy-btn"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>

          </div>

        </div>

      </div>

      {/* =========================
          STYLES
      ========================= */}

      <style jsx>{`

        /* =================================
           CARD
        ================================= */

        .lux-card {
          position: relative;

          background: white;

          border-radius: 20px;

          overflow: hidden;

          border: 1px solid #eee3d5;

          transition: 0.35s ease;

          box-shadow:
            0 8px 24px rgba(0, 0, 0, 0.05);

          height: 100%;

          display: flex;

          flex-direction: column;

          width: 100%;

          min-width: 0;
        }

        .lux-card:hover {
          transform: translateY(-4px);

          box-shadow:
            0 18px 38px
            rgba(0, 0, 0, 0.09);
        }


        /* =================================
           IMAGE
        ================================= */

        .image-wrap {
          position: relative;

          overflow: hidden;

          aspect-ratio: 1 / 1.08;

          background: #f8f4ee;
        }

        :global(.product-image) {
          object-fit: cover;

          transition: 0.6s ease;
        }

        :global(.primary-image) {
          opacity: 1;

          z-index: 1;
        }

        :global(.secondary-image) {
          opacity: 0;

          z-index: 2;
        }


        /* DESKTOP IMAGE HOVER */

        @media (hover: hover) {

          .lux-card:hover
          :global(.primary-image) {
            opacity: 0;
          }

          .lux-card:hover
          :global(.secondary-image) {
            opacity: 1;
          }

        }

        .lux-card:hover
        :global(.product-image) {
          transform: scale(1.04);
        }


        /* =================================
           IMAGE OVERLAY
        ================================= */

        .image-overlay {
          position: absolute;

          inset: 0;

          background:
            linear-gradient(
              to top,
              rgba(0, 0, 0, 0.06),
              transparent
            );

          z-index: 3;

          pointer-events: none;
        }


        /* =================================
           DISCOUNT BADGE
        ================================= */

        .discount-badge {
          position: absolute;

          top: 10px;

          left: 10px;

          z-index: 5;

          background:
            linear-gradient(
              135deg,
              #c59a5c,
              #b88746
            );

          color: white;

          padding: 5px 10px;

          border-radius: 999px;

          font-size: 8px;

          font-weight: 700;

          letter-spacing: 0.06em;

          box-shadow:
            0 6px 16px
            rgba(184, 135, 70, 0.22);
        }


        /* =================================
           CONTENT
        ================================= */

        .card-content {
          padding: 13px;

          display: flex;

          flex-direction: column;

          flex: 1;
        }


        /* =================================
           CATEGORY
        ================================= */

        .meta-row {
          display: flex;

          gap: 6px;

          flex-wrap: wrap;

          margin-bottom: 9px;
        }

        .meta-pill {
          background: #f6f0e7;

          color: #6f6558;

          padding: 4px 8px;

          border-radius: 999px;

          font-size: 7px;

          font-weight: 600;

          letter-spacing: 0.05em;

          text-transform: uppercase;
        }


        /* =================================
           TITLE
        ================================= */

        .product-title {
          font-family:
            "Cormorant Garamond",
            serif;

          font-size: 22px;

          font-weight: 420 !important;

          line-height: 1.12;

          color: #1d1b18;

          margin-bottom: 7px;

          transition: 0.3s;

          display: -webkit-box;

          -webkit-line-clamp: 2;

          -webkit-box-orient: vertical;

          overflow: hidden;

          min-height: 48px;
        }

        .lux-card:hover
        .product-title {
          color: #b88b4a;
        }


        /* =================================
           MATERIAL
        ================================= */

        .product-material {
          display: flex;

          align-items: center;

          flex-wrap: wrap;

          gap: 4px;

          font-size: 9px;

          color: #9a866d;

          font-weight: 600;

          letter-spacing: 0.035em;

          line-height: 1.2;

          margin-bottom: 11px;
        }

        .product-material b {
          color: #c59a5c;

          font-weight: 700;

          margin: 0 1px;
        }


        /* =================================
           PRICE
        ================================= */

        .price-section {
          margin-bottom: 14px;
        }

        .price-main-row {
          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 8px;
        }

        .price-wrap {
          display: flex;

          align-items: baseline;

          gap: 7px;

          flex-wrap: wrap;
        }

        .price {
          font-size: 19px;

          font-weight: 510 !important;

          color: #1d1b18;

          line-height: 1;
        }

        .mrp {
          color: #aaa095;

          text-decoration: line-through;

          font-size: 11px;

          line-height: 1;
        }

        /* DISCOUNT NEXT TO PRICE */

        .price-discount {
          color: #b88b4a;

          font-size: 8px;

          font-weight: 750;

          letter-spacing: 0.06em;

          text-transform: uppercase;

          white-space: nowrap;

          background: rgba(
            184,
            139,
            74,
            0.10
          );

          padding: 4px 7px;

          border-radius: 999px;
        }

        /* COUPON */

        .coupon-price {
          margin-top: 7px;

          font-size: 10px;

          color: #806c53;

          line-height: 1.3;
        }

        .coupon-price strong {
          color: #b88b4a;

          font-weight: 750;
        }


        /* =================================
           BUTTONS
        ================================= */

        .btn-row {
          display: grid;

          grid-template-columns: 1fr 1fr;

          gap: 8px;

          margin-top: auto;

          width: 100%;
        }

        .cart-btn,
        .buy-btn {
          height: 40px;

          border-radius: 12px;

          border: none;

          cursor: pointer;

          transition: 0.3s;

          font-weight: 700;

          font-size: 9px;

          letter-spacing: 0.04em;

          text-transform: uppercase;

          width: 100%;
        }

        .cart-btn {
          background: #f5efe6;

          color: #1d1b18;
        }

        .cart-btn:hover {
          background: #ece1d3;
        }

        .cart-btn.added {
          background:
            linear-gradient(
              135deg,
              #b88b4a,
              #d8b786
            );

          color: white;
        }

        .buy-btn {
          background:
            linear-gradient(
              135deg,
              #d8b786,
              #b88b4a
            );

          color: white;

          box-shadow:
            0 8px 18px
            rgba(184, 139, 74, 0.18);
        }

        .buy-btn:hover {
          transform: translateY(-1px);
        }


        /* =================================
           TOAST
        ================================= */

        .lux-toast {
          position: fixed;

          top: 16px;

          right: 16px;

          z-index: 9999;

          background: white;

          border-radius: 16px;

          padding: 12px 16px;

          display: flex;

          align-items: center;

          gap: 10px;

          border: 1px solid #eadfce;

          box-shadow:
            0 16px 34px
            rgba(0, 0, 0, 0.10);

          animation:
            slideIn 0.35s ease;
        }

        @keyframes slideIn {

          from {
            opacity: 0;

            transform:
              translateY(-20px);
          }

          to {
            opacity: 1;

            transform:
              translateY(0);
          }

        }

        .toast-icon {
          width: 34px;

          height: 34px;

          border-radius: 50%;

          background:
            linear-gradient(
              135deg,
              #d8b786,
              #b88b4a
            );

          display: flex;

          align-items: center;

          justify-content: center;

          color: white;

          font-weight: 700;

          flex-shrink: 0;
        }

        .toast-title {
          font-weight: 700;

          color: #1d1b18;

          margin-bottom: 1px;

          font-size: 13px;
        }

        .toast-text {
          font-size: 11px;

          color: #7c7368;
        }


        /* =================================
           MOBILE
        ================================= */

        @media (max-width: 768px) {

          .lux-card {
            border-radius: 16px;
          }

          .image-wrap {
            aspect-ratio: 1 / 1.04;
          }

          .card-content {
            padding: 10px;
          }


          /* CATEGORY */

          .meta-row {
            gap: 4px;

            margin-bottom: 7px;
          }

          .meta-pill {
            font-size: 6px;

            padding: 3px 6px;
          }


          /* TITLE */

          .product-title {
            font-size: 16px;

            font-weight: 420 !important;

            line-height: 1.08;

            margin-bottom: 6px;

            min-height: 34px;
          }


          /* MATERIAL */

          .product-material {
            font-size: 7.5px;

            gap: 3px;

            margin-bottom: 9px;

            letter-spacing: 0.025em;
          }

          .product-material b {
            margin: 0;
          }


          /* PRICE */

          .price-section {
            margin-bottom: 10px;
          }

          .price-main-row {
            align-items: center;

            gap: 5px;
          }

          .price-wrap {
            gap: 5px;
          }

          .price {
            font-size: 16px;
          }

          .mrp {
            font-size: 9px;
          }

          .price-discount {
            font-size: 6.5px;

            padding: 3px 5px;

            letter-spacing: 0.04em;
          }

          .coupon-price {
            font-size: 8.5px;

            margin-top: 6px;

            line-height: 1.25;
          }


          /* BUTTONS */

          .btn-row {
            grid-template-columns: 1fr 1fr;

            gap: 6px;
          }

          .cart-btn,
          .buy-btn {
            height: 34px;

            border-radius: 9px;

            font-size: 8px;

            letter-spacing: 0.02em;

            padding: 0 4px;
          }


          /* DISCOUNT */

          .discount-badge {
            top: 8px;

            left: 8px;

            padding: 4px 8px;

            font-size: 7px;
          }


          /* TOAST */

          .lux-toast {
            left: 10px;

            right: 10px;

            top: 10px;

            padding: 10px 12px;
          }

          .toast-icon {
            width: 30px;

            height: 30px;
          }

          .toast-title {
            font-size: 11px;
          }

          .toast-text {
            font-size: 9px;
          }

        }


        /* =================================
           VERY SMALL PHONES
        ================================= */

        @media (max-width: 380px) {

          .card-content {
            padding: 9px;
          }

          .product-title {
            font-size: 15px;
          }

          .product-material {
            font-size: 7px;
          }

          .price {
            font-size: 15px;
          }

          .mrp {
            font-size: 8px;
          }

          .price-discount {
            font-size: 6px;

            padding: 3px 4px;
          }

          .coupon-price {
            font-size: 8px;
          }

          .cart-btn,
          .buy-btn {
            font-size: 7.5px;

            height: 33px;
          }

        }

      `}</style>
    </>
  );
}