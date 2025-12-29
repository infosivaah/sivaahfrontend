import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const [activeImage, setActiveImage] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const images = product.images || [];

  /* 🔁 AUTO IMAGE ROTATION */
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setActiveImage((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [images.length]);

  const image =
    images[activeImage]?.replace(
      "/upload/",
      "/upload/w_500,h_500,c_fill,q_auto,f_auto/"
    );

  /* 🔥 DISCOUNT % */
  const discount =
    product.mrp
      ? Math.round(
          ((product.mrp - product.price) / product.mrp) * 100
        )
      : null;

  /* 🛒 ADD TO CART HANDLER */
  const handleAddToCart = () => {
    if (isAdded) return;

    addToCart(product);
    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 1000);
  };

  return (
    <div className="product-card">
      {/* IMAGE + LINK */}
      <Link
        href={`/product/${product.slug}`}
        className="text-decoration-none"
      >
        <div className="image-wrap">
          {discount && (
            <span className="discount-badge">
              {discount}% OFF
            </span>
          )}

          <img
            src={image}
            alt={product.name}
            loading="lazy"
          />
        </div>

        {/* CONTENT */}
        <div className="card-body px-2">
          <div className="mt-2 w-100 d-flex justify-content-between">
          <span className="product-slug">
            {product.category}
          </span>
          <span className="product-slug">
            {product.emotion}
          </span>
</div>
          <h6 className="product-title">
            {product.name}
          </h6>

          <div className="price-row">
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
      </Link>

      {/* ADD TO CART BUTTON */}
      <button
        className={`btn mx-2 mb-2 ${
          isAdded ? "btn-success" : "btn-light"
        }`}
        onClick={handleAddToCart}
        disabled={isAdded}
      >
        {isAdded ? "✓ Added" : "Add to Cart"}
      </button>
    </div>
  );
}
