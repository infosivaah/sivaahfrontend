import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function Cart() {
  const {
    cart,
    updateQty,
    removeFromCart,
    totalAmount
  } = useCart();

  /* ---------------- EMPTY CART ---------------- */

  if (cart.length === 0) {
    return (
      <div
        className="container d-flex flex-column justify-content-center align-items-center text-center"
        style={{ minHeight: "60vh" }}
      >
        <h2 className="fw-semibold mb-3">
          Your cart feels a little empty ✨
        </h2>

        <p className="text-muted mb-4" style={{ maxWidth: 420 }}>
          Jewellery at SIVAAH is more than adornment — it’s
          protection, intention, and positive energy.
          Add something meaningful to your life.
        </p>

        <Link href="/shop" className="btn btn-dark btn-lg">
          Explore Jewellery
        </Link>

        {/* WHY CHOOSE US */}
        <div className="row mt-5 w-100 justify-content-center">
          <div className="col-md-3 col-6 mb-3">
            <div className="p-3 border rounded">
              <strong>925 Silver</strong>
              <p className="small text-muted mb-0">
                Certified purity
              </p>
            </div>
          </div>

          <div className="col-md-3 col-6 mb-3">
            <div className="p-3 border rounded">
              <strong>Handcrafted</strong>
              <p className="small text-muted mb-0">
                Crafted with intention
              </p>
            </div>
          </div>

          <div className="col-md-3 col-6 mb-3">
            <div className="p-3 border rounded">
              <strong>Secure Order</strong>
              <p className="small text-muted mb-0">
                WhatsApp confirmation
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- CART WITH ITEMS ---------------- */

  return (
    <>
      <h1 className="fw-semibold mb-4">
        Your Cart
      </h1>

      <div className="row">
        {/* ITEMS */}
        <div className="col-md-8">
          {cart.map((item) => (
            <div
              key={item.slug}
              className="d-flex align-items-center justify-content-between border rounded p-3 mb-3"
            >
              <div style={{ maxWidth: "60%" }}>
                <h6 className="mb-1">
                  {item.name}
                </h6>
                <p className="small text-muted mb-0">
                  ₹{item.price}
                </p>
              </div>

              <div className="d-flex align-items-center gap-2">
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
                  className="form-control form-control-sm"
                  style={{ width: 70 }}
                />

                <button
                  className="btn btn-sm btn-outline-danger"
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
        <div className="col-md-4">
          <div className="border rounded p-4">
            <h5 className="fw-semibold mb-3">
              Order Summary
            </h5>

            <div className="d-flex justify-content-between mb-2">
              <span>Total</span>
              <strong>₹{totalAmount}</strong>
            </div>

            <p className="small text-muted">
              Final confirmation happens on WhatsApp.
              No online payment required.
            </p>

            <Link
              href="/checkout"
              className="btn btn-dark w-100 mt-3"
            >
              Proceed to Buy
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
