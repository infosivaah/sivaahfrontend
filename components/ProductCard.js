import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {

  const router = useRouter();

  const { addToCart } = useCart();

  const [activeImage, setActiveImage] =
    useState(0);

  const [isAdded, setIsAdded] =
    useState(false);

  const [toastVisible, setToastVisible] =
    useState(false);

  const images = product.images || [];

  /* AUTO IMAGE ROTATION */

  useEffect(() => {

    if (images.length <= 1) return;

    const interval = setInterval(() => {

      setActiveImage((prev) =>
        prev === images.length - 1
          ? 0
          : prev + 1
      );

    }, 2600);

    return () => clearInterval(interval);

  }, [images.length]);

  const image =
    images?.[activeImage]?.replace(
      "/upload/",
      "/upload/w_700,h_850,c_fill,q_auto,f_auto/"
    );

  /* DISCOUNT */

  const discount =
    product.mrp
      ? Math.round(
          ((product.mrp - product.price) /
            product.mrp) *
            100
        )
      : null;

  /* ADD TO CART */

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

  /* BUY NOW */

  const handleBuyNow = (e) => {

    e.preventDefault();

    addToCart(product);

    router.push("/checkout");
  };

  return (
    <>

      {/* TOAST */}

      {toastVisible && (

        <div className="lux-toast">

          <div className="toast-icon">
            ✓
          </div>

          <div>

            <div className="toast-title">
              Added To Cart
            </div>

            <div className="toast-text">
              Product added successfully
            </div>

          </div>

        </div>

      )}

      {/* CARD */}

      <div className="lux-card">

        {/* IMAGE */}

        <Link
          href={`/product/${product.slug}`}
          className="text-decoration-none"
        >

          <div className="image-wrap">

            {/* DISCOUNT */}

            {discount && (

              <span className="discount-badge">
                {discount}% OFF
              </span>

            )}

            {/* IMAGE */}

            <img
              src={image}
              alt={product.name}
              loading="lazy"
              className="product-image"
            />

            {/* OVERLAY */}

            <div className="image-overlay"></div>

          </div>

        </Link>

        {/* CONTENT */}

        <div className="card-content">

          {/* CATEGORY */}

          <div className="meta-row">

            <span className="meta-pill">
              {product.category}
            </span>

            {product.emotion && (

              <span className="meta-pill gold">
                {product.emotion}
              </span>

            )}

          </div>

          {/* TITLE */}

          <Link
            href={`/product/${product.slug}`}
            className="text-decoration-none"
          >

            <h3 className="product-title">
              {product.name}
            </h3>

          </Link>

          {/* PRICE */}

          <div className="price-row">

            <div className="price-wrap">

              <span className="price">
                ₹{product.price}
              </span>

              {product.mrp && (

                <span className="mrp">
                  ₹{product.mrp}
                </span>

              )}

            </div>

          

          </div>

          {/* BUTTONS */}

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
            {/* STYLES */}

      <style jsx>{`

.lux-card {

  position: relative;

  background: white;

  border-radius: 20px;

  overflow: hidden;

  border: 1px solid #eee3d5;

  transition: 0.35s ease;

  box-shadow:
    0 8px 24px rgba(0,0,0,0.05);

  height: 100%;

  display: flex;

  flex-direction: column;

  width: 100%;

  min-width: 0;
}

.lux-card:hover {

  transform: translateY(-4px);

  box-shadow:
    0 18px 38px rgba(0,0,0,0.09);
}

/* IMAGE */

.image-wrap {

  position: relative;

  overflow: hidden;

  aspect-ratio: 1 / 1.08;

  background: #f8f4ee;
}

.product-image {

  width: 100%;

  height: 100%;

  object-fit: cover;

  transition: 0.6s ease;

  display: block;
}

.lux-card:hover .product-image {

  transform: scale(1.04);
}

.image-overlay {

  position: absolute;

  inset: 0;

  background:
    linear-gradient(
      to top,
      rgba(0,0,0,0.06),
      transparent
    );
}

/* DISCOUNT */

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
    0 6px 16px rgba(184,135,70,0.22);
}

/* CONTENT */

.card-content {

  padding: 13px;

  display: flex;

  flex-direction: column;

  flex: 1;
}

/* META */

.meta-row {

  display: flex;

  gap: 6px;

  flex-wrap: wrap;

  margin-bottom: 10px;
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

.meta-pill.gold {

  background:
    rgba(184,139,74,0.12);

  color: #b88b4a;
}

/* TITLE */

.product-title {

  font-family:
    "Cormorant Garamond",
    serif;

  font-size: 22px;

  line-height: 1.12;

  color: #1d1b18;

  margin-bottom: 10px;

  transition: 0.3s;

  display: -webkit-box;

  -webkit-line-clamp: 2;

  -webkit-box-orient: vertical;

  overflow: hidden;

  min-height: 48px;
}

.lux-card:hover .product-title {

  color: #b88b4a;
}

/* PRICE */

.price-row {

  display: flex;

  align-items: center;

  justify-content: space-between;

  margin-bottom: 14px;

  gap: 8px;
}

.price-wrap {

  display: flex;

  align-items: center;

  gap: 6px;

  flex-wrap: wrap;
}

.price {

  font-size: 18px;

  font-weight: 700;

  color: #1d1b18;
}

.mrp {

  color: #a29a8d;

  text-decoration: line-through;

  font-size: 11px;
}

.selling-fast {

  font-size: 8px;

  color: #b88b4a;

  font-weight: 700;

  letter-spacing: 0.05em;

  text-transform: uppercase;

  white-space: nowrap;
}

/* BUTTONS */

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
    0 8px 18px rgba(184,139,74,0.18);
}

.buy-btn:hover {

  transform: translateY(-1px);
}

/* TOAST */

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
    0 16px 34px rgba(0,0,0,0.10);

  animation: slideIn 0.35s ease;
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

/* MOBILE */

@media(max-width:768px){

  .lux-card {

    border-radius: 16px;
  }

  .image-wrap {

    aspect-ratio: 1 / 1.02;
  }

  .card-content {

    padding: 10px;
  }

  .meta-row {

    gap: 4px;

    margin-bottom: 8px;
  }

  .meta-pill {

    font-size: 6px;

    padding: 3px 6px;
  }

  .product-title {

    font-size: 16px;

    line-height: 1.08;

    margin-bottom: 8px;

    min-height: 34px;
  }

  .price-row {

    margin-bottom: 10px;
  }

  .price {

    font-size: 14px;
  }

  .mrp {

    font-size: 9px;
  }

  .selling-fast {

    font-size: 7px;
  }

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

  .discount-badge {

    top: 8px;

    left: 8px;

    padding: 4px 8px;

    font-size: 7px;
  }

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

`}</style>

    </>
  );
}