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

  const [errors, setErrors] = useState({});

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;

    // 🔒 Numbers only for phone & pincode
    if (name === "phone" || name === "pincode") {
      if (!/^\d*$/.test(value)) return;
    }

    setForm({ ...form, [name]: value });
  };

  /* ---------------- VALIDATION ---------------- */

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";

    if (!form.phone) {
      newErrors.phone = "Phone number is required";
    } else if (form.phone.length !== 10) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (!form.pincode) {
      newErrors.pincode = "Pincode is required";
    } else if (form.pincode.length !== 6) {
      newErrors.pincode = "Pincode must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- SUBMIT ---------------- */

  const handleWhatsApp = () => {
    if (!validateForm()) return;

    const link = generateWhatsAppLink(cart, form, totalAmount);
    window.open(link, "_blank");
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="container my-5" style={{ maxWidth: 600 }}>
      <h1 className="fw-semibold mb-4">Checkout</h1>

      {/* CUSTOMER DETAILS */}
      <h5 className="mb-3">Customer Details</h5>

      <input
        name="name"
        className="form-control mb-2"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
      />
      {errors.name && <small className="text-danger">{errors.name}</small>}

      <input
        name="phone"
        className="form-control mb-2 mt-3"
        placeholder="Phone Number"
        maxLength={10}
        value={form.phone}
        onChange={handleChange}
      />
      {errors.phone && <small className="text-danger">{errors.phone}</small>}

      <input
        name="address"
        className="form-control mb-2 mt-3"
        placeholder="Complete Address"
        value={form.address}
        onChange={handleChange}
      />
      {errors.address && <small className="text-danger">{errors.address}</small>}

      <div className="row mt-3">
        <div className="col-md-6">
          <input
            name="city"
            className="form-control mb-2"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
          />
          {errors.city && <small className="text-danger">{errors.city}</small>}
        </div>

        <div className="col-md-6">
          <input
            name="pincode"
            className="form-control mb-2"
            placeholder="Pincode"
            maxLength={6}
            value={form.pincode}
            onChange={handleChange}
          />
          {errors.pincode && (
            <small className="text-danger">{errors.pincode}</small>
          )}
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
          <span>₹{item.price * item.qty}</span>
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
        disabled={cart.length === 0}
      >
        Confirm Order on WhatsApp
      </button>

      <p className="text-muted text-center mt-3 small">
        You will be redirected to WhatsApp to confirm your order.
      </p>
    </div>
  );
}
