import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function Cart() {

  const {
    cart,
    updateQty,
    removeFromCart,
    totalAmount
  } = useCart();

  /* =========================
     EMPTY CART
  ========================= */

  if (cart.length === 0) {

    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Montserrat:wght@300;400;500;600&display=swap');

          .cart-wrap {
            min-height: 100vh;
            background: #FAFAF8;
            font-family: 'Montserrat', sans-serif;
            color: #1C1C1A;
            padding: 2rem 1.25rem 4rem;
          }

          .cart-empty {
            max-width: 760px;
            margin: 0 auto;
            text-align: center;
            padding-top: 8vh;
          }

          .cart-empty-title {
            font-family: 'Cormorant Garamond', serif;
            font-size: 52px;
            font-weight: 300;
            margin-bottom: 1rem;
          }

          .cart-empty-sub {
            font-size: 13px;
            line-height: 2;
            color: #8A8678;
            max-width: 520px;
            margin: 0 auto;
          }

          .cart-btn {
            display: inline-block;
            margin-top: 2rem;
            background: #1C1C1A;
            color: #F5F0E8;
            padding: 15px 32px;
            text-decoration: none;
            font-size: 10px;
            letter-spacing: 0.3em;
            text-transform: uppercase;
            border-radius: 2px;
          }

          .cart-empty-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
            margin-top: 4rem;
          }

          .cart-empty-card {
            background: white;
            border: 0.5px solid #D9D5C8;
            padding: 1.5rem;
          }

          .cart-empty-card-title {
            font-family: 'Cormorant Garamond', serif;
            font-size: 24px;
            margin-bottom: 0.4rem;
          }

          .cart-empty-card-sub {
            font-size: 11px;
            color: #8A8678;
            line-height: 1.7;
          }

          @media (max-width: 768px) {

            .cart-empty-title {
              font-size: 40px;
            }

            .cart-empty-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>

        <div className="cart-wrap">

          <div className="cart-empty">

            <div className="cart-empty-title">
              Your Cart Awaits
            </div>

            <div className="cart-empty-sub">
              Jewellery at SIVAAH is more than adornment —
              it carries intention, protection, and timeless beauty.
              Discover pieces crafted to stay with you for years.
            </div>

            <Link
              href="/shop"
              className="cart-btn"
            >
              Explore Jewellery
            </Link>

            <div className="cart-empty-grid">

              <div className="cart-empty-card">
                <div className="cart-empty-card-title">
                  925 Silver
                </div>

                <div className="cart-empty-card-sub">
                  Certified purity with premium craftsmanship.
                </div>
              </div>

              <div className="cart-empty-card">
                <div className="cart-empty-card-title">
                  Handcrafted
                </div>

                <div className="cart-empty-card-sub">
                  Designed thoughtfully with spiritual elegance.
                </div>
              </div>

              <div className="cart-empty-card">
                <div className="cart-empty-card-title">
                  Secure Orders
                </div>

                <div className="cart-empty-card-sub">
                  Trusted delivery with WhatsApp tracking updates.
                </div>
              </div>

            </div>
          </div>
        </div>
      </>
    );
  }

  /* =========================
     CART WITH ITEMS
  ========================= */

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Montserrat:wght@300;400;500;600&display=swap');

        .cart-wrap {
          min-height: 100vh;
          background: #FAFAF8;
          font-family: 'Montserrat', sans-serif;
          color: #1C1C1A;
          padding: 2rem 1.25rem 4rem;
        }

        .cart-shell {
          max-width: 1280px;
          margin: 0 auto;
        }

        .cart-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 64px;
          font-weight: 300;
          margin-bottom: 2rem;
          line-height: 1;
        }

        .cart-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 2rem;
          align-items: start;
        }

        .cart-items {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .cart-card {
          background: white;
          border: 0.5px solid #D9D5C8;
          border-radius: 4px;
          padding: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .cart-left {
          display: flex;
          gap: 1rem;
          align-items: center;
          min-width: 0;
        }

        .cart-img {
          width: 110px;
          height: 110px;
          object-fit: cover;
          border-radius: 2px;
          background: #F2EDE6;
          flex-shrink: 0;
        }

        .cart-info {
          min-width: 0;
        }

        .cart-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 30px;
          line-height: 1.2;
          margin-bottom: 0.5rem;
        }

        .cart-price {
          font-size: 13px;
          color: #8A8678;
          letter-spacing: 0.08em;
        }

        .cart-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .cart-qty {
          width: 74px;
          height: 46px;
          border: 0.5px solid #D9D5C8;
          background: #FAFAF8;
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          padding-left: 12px;
          outline: none;
          border-radius: 2px;
        }

        .cart-remove {
          width: 46px;
          height: 46px;
          border: 0.5px solid #D9D5C8;
          background: transparent;
          cursor: pointer;
          border-radius: 2px;
          color: #A96A5B;
          font-size: 18px;
          transition: all 0.2s;
        }

        .cart-remove:hover {
          background: #F8ECE8;
          border-color: #CBA79E;
        }

        .cart-summary {
          position: sticky;
          top: 1.5rem;
          background: white;
          border: 0.5px solid #D9D5C8;
          border-radius: 4px;
          padding: 2rem;
        }

        .cart-summary-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 42px;
          margin-bottom: 1.5rem;
        }

        .cart-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .cart-row-label {
          font-size: 13px;
          color: #4A4840;
        }

        .cart-row-value {
          font-size: 28px;
          font-family: 'Cormorant Garamond', serif;
        }

        .cart-note {
          font-size: 11px;
          line-height: 1.9;
          color: #8A8678;
          margin-top: 1rem;
        }

        .cart-btn {
          display: block;
          width: 100%;
          margin-top: 2rem;
          background: #1C1C1A;
          color: #F5F0E8;
          padding: 16px;
          text-align: center;
          text-decoration: none;
          border-radius: 2px;
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          transition: background 0.2s;
        }

        .cart-btn:hover {
          background: #34322E;
          color: #F5F0E8;
        }

        .cart-trust {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 0.5px solid #E5DED1;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .cart-trust-item {
          font-size: 10px;
          letter-spacing: 0.08em;
          color: #8A8678;
        }

        @media (max-width: 992px) {

          .cart-grid {
            grid-template-columns: 1fr;
          }

          .cart-summary {
            position: static;
          }

          .cart-title {
            font-size: 52px;
          }
        }

       
        @media (max-width: 768px) {

  .cart-wrap {
    padding: 1.2rem 0.9rem 3rem;
  }

  .cart-grid {
    display: flex;
    flex-direction: column-reverse;
    gap: 1rem;
  }

  .cart-title {
    font-size: 38px;
    margin-bottom: 1.2rem;
  }

.cart-card {
  padding: 1rem;
  gap: 0.8rem;
  flex-direction: row;
  align-items: flex-start;
}
  .cart-left {
    gap: 0.75rem;
    align-items: center;
    flex: 1;
    min-width: 0;
  }

  .cart-img {
    width: 68px;
    height: 68px;
    border-radius: 2px;
  }

  .cart-info {
    min-width: 0;
    flex: 1;
  }

.cart-name {
  font-size: 13px;
  line-height: 1.45;
  margin-bottom: 0.25rem;
  word-break: break-word;
  overflow: visible;
}

  .cart-price {
    font-size: 11px;
  }

  .cart-right {
    margin-top: 0;
    gap: 6px;
  }

  .cart-qty {
    width: 54px;
    height: 38px;
    font-size: 12px;
    padding-left: 8px;
  }

  .cart-remove {
    width: 38px;
    height: 38px;
    font-size: 15px;
  }

  .cart-summary {
    padding: 1.2rem;
  }

  .cart-summary-title {
    font-size: 28px;
    margin-bottom: 1rem;
  }

  .cart-row-label {
    font-size: 11px;
  }

  .cart-row-value {
    font-size: 24px;
  }

  .cart-note {
    font-size: 10px;
    line-height: 1.7;
  }

  .cart-btn {
    margin-top: 1.3rem;
    padding: 14px;
    font-size: 9px;
  }

  .cart-trust {
    margin-top: 1.3rem;
    padding-top: 1rem;
    gap: 0.55rem;
  }

  .cart-trust-item {
    font-size: 9px;
  }
}
      `}</style>

      <div className="cart-wrap">

        <div className="cart-shell">

          <h1 className="cart-title">
            Your Cart
          </h1>

          <div className="cart-grid">

            {/* ITEMS */}

            <div className="cart-items">

              {cart.map((item) => (

                <div
                  key={item.slug}
                  className="cart-card"
                >

                  <div className="cart-left">

                    <img
                      src={item.images?.[0]}
                      alt={item.name}
                      className="cart-img"
                    />

                    <div className="cart-info">

                      <div className="cart-name">
                        {item.name}
                      </div>

                      <div className="cart-price">
                        ₹{item.price}
                      </div>

                    </div>
                  </div>

                  <div className="cart-right">

                    <input
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={(e) =>
                        updateQty(
                          item.slug,
                          Number(e.target.value)
                        )
                      }
                      className="cart-qty"
                    />

                    <button
                      className="cart-remove"
                      onClick={() =>
                        removeFromCart(item.slug)
                      }
                    >
                      ✕
                    </button>

                  </div>
                </div>
              ))}
            </div>

            {/* SUMMARY */}

            <div className="cart-summary">

              <div className="cart-summary-title">
                Order Summary
              </div>

              <div className="cart-row">

                <div className="cart-row-label">
                  Total Amount
                </div>

                <div className="cart-row-value">
                  ₹{totalAmount}
                </div>

              </div>

              <div className="cart-note">
                Your order is securely processed with
                WhatsApp confirmation, insured shipping,
                and trusted SIVAAH support.
              </div>

              <Link
                href="/checkout"
                className="cart-btn"
              >
                Proceed to Checkout
              </Link>

              <div className="cart-trust">

                <div className="cart-trust-item">
                  ✦ Genuine 925 Sterling Silver
                </div>

                <div className="cart-trust-item">
                  ✦ PAN India Secure Delivery
                </div>

                <div className="cart-trust-item">
                  ✦ WhatsApp Order Tracking
                </div>

                <div className="cart-trust-item">
                  ✦ Premium Luxury Packaging
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}