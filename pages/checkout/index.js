import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { generateWhatsAppLink } from "../../lib/whatsapp";

export default function Checkout() {
  const { cart, totalAmount } = useCart();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleWhatsApp = () => {
    const link = generateWhatsAppLink(cart, form, totalAmount);
    window.location.href = link;
  };

  return (
    <>
      <h1 className="fw-semibold mb-4">Checkout</h1>

      {/* CUSTOMER DETAILS */}
      <h5 className="mb-3">Customer Details</h5>

      <input
        name="name"
        className="form-control mb-3"
        placeholder="Full Name"
        onChange={handleChange}
        required
      />

      <input
        name="phone"
        className="form-control mb-3"
        placeholder="Phone Number"
        onChange={handleChange}
        required
      />

      <input
        name="address"
        className="form-control mb-3"
        placeholder="Complete Address"
        onChange={handleChange}
        required
      />

      <div className="row">
        <div className="col-md-6">
          <input
            name="city"
            className="form-control mb-3"
            placeholder="City"
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <input
            name="pincode"
            className="form-control mb-3"
            placeholder="Pincode"
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <hr className="my-4" />

      {/* ORDER SUMMARY */}
      <h5 className="mb-3">Order Summary</h5>

      {cart.map((item) => (
        <div
          key={item.slug}
          className="d-flex justify-content-between mb-2"
        >
          <span>
            {item.name} × {item.qty}
          </span>
          <span>
            ₹{item.price * item.qty}
          </span>
        </div>
      ))}

      <hr />

      <div className="d-flex justify-content-between fw-semibold fs-5">
        <span>Total</span>
        <span>₹{totalAmount}</span>
      </div>

      <button
        className="btn btn-success btn-lg w-100 mt-4"
        onClick={handleWhatsApp}
      >
        Confirm Order on WhatsApp
      </button>
    </>
  );
}
