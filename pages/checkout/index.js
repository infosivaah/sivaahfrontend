import { useState } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import { useCart } from "../../context/CartContext";

export default function Checkout() {
  const router = useRouter();
  const { cart, totalAmount, clearCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("ONLINE");
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    address: "", city: "", pincode: ""
  });
  const [errors, setErrors] = useState({});
  const [coupon, setCoupon] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");

  /* ── Empty cart ── */
  if (cart.length === 0) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Montserrat', sans-serif" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 300, marginBottom: 8 }}>Your cart is empty</div>
          <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "#8A8678", textTransform: "uppercase" }}>Add pieces to continue</div>
        </div>
      </div>
    );
  }

  /* ── Calculations ── */
  const onlineDiscount = paymentMethod === "ONLINE" ? Math.round(totalAmount * 0.05) : 0;
  const shippingCharge = totalAmount > 1499 ? 0 : 99;
  const finalAmount = totalAmount - onlineDiscount - couponDiscount + shippingCharge;

  /* ── Handlers ── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === "phone" || name === "pincode") && !/^\d*$/.test(value)) return;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Required";
    if (!form.email.trim()) newErrors.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email";
    if (!form.phone) newErrors.phone = "Required";
    if (form.phone.length !== 10) newErrors.phone = "Must be 10 digits";
    if (!form.address.trim()) newErrors.address = "Required";
    if (!form.city.trim()) newErrors.city = "Required";
    if (!form.pincode) newErrors.pincode = "Required";
    if (form.pincode.length !== 6) newErrors.pincode = "Must be 6 digits";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    setCouponDiscount(0);
    setAppliedCoupon("");
    if (code === "SIVAAH10") {
      setCouponDiscount(Math.round(totalAmount * 0.10));
      setAppliedCoupon(code);
      return;
    }
    if (code === "AYODHYA") {
      setCouponDiscount(Math.round(totalAmount * 0.15));
      setAppliedCoupon(code);
      return;
    }
    alert("Invalid coupon code");
  };

  const saveOrder = async (paymentData = {}) => {
    const res = await fetch("https://sivaahbackend.onrender.com/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer: form, products: cart, subtotal: totalAmount,
        shippingCharge, discount: onlineDiscount + couponDiscount,
        coupon: appliedCoupon, totalAmount: finalAmount,
        paymentMethod, paymentStatus: paymentMethod === "COD" ? "PENDING" : "PAID",
        ...paymentData
      })
    });
    return res.json();
  };

  const handleCOD = async () => {
    if (!validateForm()) return;
    try {
      setLoading(true);
      const savedOrder = await saveOrder();
      clearCart();
      router.push(`/success?orderId=${savedOrder.orderId}`);
    } catch (err) {
      console.log(err);
      alert("Order failed. Please try again.");
    } finally { setLoading(false); }
  };

  const handleOnlinePayment = async () => {
    if (!validateForm()) return;
    try {
      setLoading(true);
      const orderRes = await fetch("https://sivaahbackend.onrender.com/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalAmount })
      });
      const orderData = await orderRes.json();
      const options = {
        key: "rzp_live_SnDolof3RDMzxz",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "SIVAAH",
        description: "Premium Silver Jewellery",
        image: "/logo.png",
        order_id: orderData.order_id,
        handler: async function (response) {
          try {
            const verifyRes = await fetch("https://sivaahbackend.onrender.com/api/payment/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response)
            });
            const verifyData = await verifyRes.json();
            if (!verifyData.success) { setLoading(false); alert("Payment verification failed"); return; }
            const savedOrder = await saveOrder({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id
            });
            clearCart();
            setLoading(false);
            router.push(`/success?orderId=${savedOrder.orderId}`);
          } catch (err) { console.log(err); setLoading(false); alert("Something went wrong"); }
        },
        prefill: { name: form.name, email: form.email, contact: form.phone },
        notes: { customer_name: form.name },
        theme: { color: "#1C1C1A" },
        modal: { ondismiss: function () { setLoading(false); } }
      };
      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", function () { setLoading(false); alert("Payment failed"); });
      razorpay.open();
    } catch (err) {
      console.log(err);
      setLoading(false);
      alert("Payment initialization failed");
    }
  };

  /* ── UI ── */
  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Montserrat:wght@300;400;500;600&display=swap');

        .ck-wrap {
          font-family: 'Montserrat', sans-serif;
          background: #FAFAF8;
          color: #1C1C1A;
          min-height: 100vh;
          padding: 2.5rem 1.25rem 4rem;
        }

        .ck-shell {
          max-width: 980px;
          margin: 0 auto;
        }

        /* ── Page header ── */
        .ck-page-header {
          margin-bottom: 2.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 0.5px solid #D9D5C8;
        }
        .ck-page-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px;
          font-weight: 300;
          color: #1C1C1A;
          margin-bottom: 4px;
        }
        .ck-page-sub {
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #9B8F78;
        }

        /* ── Two-column grid on desktop ── */
        .ck-grid {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        @media (min-width: 768px) {
          .ck-grid {
            display: grid;
            grid-template-columns: 1fr 380px;
            gap: 2.5rem;
            align-items: start;
          }
        }

        /* ── Cards / sections ── */
        .ck-card {
          background: #FFFFFF;
          border: 0.5px solid #D9D5C8;
          border-radius: 3px;
          padding: 1.5rem;
          margin-bottom: 1rem;
        }
        .ck-card:last-child { margin-bottom: 0; }

        .ck-card-title {
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #9B8F78;
          margin-bottom: 1.2rem;
        }

        /* ── Form fields ── */
        .ck-field {
          position: relative;
          margin-bottom: 1rem;
        }
        .ck-field:last-child { margin-bottom: 0; }

        .ck-label {
          display: block;
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #9B8F78;
          margin-bottom: 5px;
        }

        .ck-input {
          width: 100%;
          background: #FAFAF8;
          border: 0.5px solid #D9D5C8;
          border-radius: 2px;
          padding: 11px 13px;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          color: #1C1C1A;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }
        .ck-input::placeholder { color: #C0BAB0; }
        .ck-input:focus { border-color: #1C1C1A; background: #FFFFFF; }
        .ck-input.error { border-color: #C0795A; }

        .ck-error {
          font-size: 9px;
          letter-spacing: 0.1em;
          color: #C0795A;
          margin-top: 4px;
          display: block;
        }

        .ck-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        /* ── Payment method ── */
        .ck-pay-option {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 13px 14px;
          border: 0.5px solid #D9D5C8;
          border-radius: 2px;
          cursor: pointer;
          margin-bottom: 8px;
          transition: border-color 0.2s, background 0.2s;
          background: #FAFAF8;
        }
        .ck-pay-option:last-child { margin-bottom: 0; }
        .ck-pay-option.selected {
          border-color: #1C1C1A;
          background: #FFFFFF;
        }
        .ck-pay-radio {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 1.5px solid #D9D5C8;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: border-color 0.2s;
        }
        .ck-pay-option.selected .ck-pay-radio {
          border-color: #1C1C1A;
        }
        .ck-pay-radio-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #1C1C1A;
        }
        .ck-pay-label {
          font-size: 12px;
          color: #1C1C1A;
          flex: 1;
        }
        .ck-pay-badge {
          font-size: 9px;
          letter-spacing: 0.12em;
          color: #7A8A6E;
          background: #EDF2E8;
          padding: 3px 8px;
          border-radius: 2px;
        }

        /* ── Coupon ── */
        .ck-coupon-row {
          display: flex;
          gap: 8px;
        }
        .ck-coupon-input {
          flex: 1;
          background: #FAFAF8;
          border: 0.5px solid #D9D5C8;
          border-radius: 2px;
          padding: 11px 13px;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          color: #1C1C1A;
          outline: none;
          transition: border-color 0.2s;
        }
        .ck-coupon-input::placeholder { color: #C0BAB0; }
        .ck-coupon-input:focus { border-color: #1C1C1A; background: #FFFFFF; }
        .ck-coupon-btn {
          background: transparent;
          border: 0.5px solid #1C1C1A;
          border-radius: 2px;
          padding: 0 18px;
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #1C1C1A;
          cursor: pointer;
          transition: background 0.2s;
          white-space: nowrap;
        }
        .ck-coupon-btn:hover { background: #F2EDE6; }
        .ck-coupon-applied {
          margin-top: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          color: #7A8A6E;
          letter-spacing: 0.1em;
        }
        .ck-coupon-applied-tag {
          background: #EDF2E8;
          padding: 3px 9px;
          border-radius: 2px;
          font-size: 9px;
          letter-spacing: 0.2em;
          font-weight: 600;
        }

        /* ── Right column (sticky summary) ── */
        .ck-summary-col {
          position: sticky;
          top: 1.5rem;
        }

        /* ── Order items ── */
        .ck-order-item {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: 9px 0;
          border-bottom: 0.5px solid #F0ECE6;
        }
        .ck-order-item:last-child { border-bottom: none; }
        .ck-order-item-name {
          font-size: 11px;
          color: #4A4840;
          line-height: 1.4;
          flex: 1;
          margin-right: 12px;
        }
        .ck-order-item-qty {
          font-size: 9px;
          letter-spacing: 0.1em;
          color: #9B8F78;
        }
        .ck-order-item-price {
          font-size: 12px;
          color: #1C1C1A;
          white-space: nowrap;
        }

        /* ── Totals ── */
        .ck-totals { margin-top: 1rem; }
        .ck-total-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 7px 0;
          font-size: 11px;
          color: #4A4840;
        }
        .ck-total-row.discount { color: #7A8A6E; }
        .ck-total-divider {
          height: 0.5px;
          background: #D9D5C8;
          margin: 8px 0;
        }
        .ck-total-final {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: 10px 0 0;
        }
        .ck-total-final-label {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #9B8F78;
        }
        .ck-total-final-amount {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 400;
          color: #1C1C1A;
        }

        /* ── CTA button ── */
        .ck-btn-pay {
          display: block;
          width: 100%;
          background: #1C1C1A;
          color: #F5F0E8;
          border: none;
          padding: 16px;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 1px;
          margin-top: 1.25rem;
          transition: background 0.2s;
        }
        .ck-btn-pay:hover:not(:disabled) { background: #3A3832; }
        .ck-btn-pay:disabled { opacity: 0.55; cursor: not-allowed; }

        .ck-btn-cod {
          display: block;
          width: 100%;
          background: transparent;
          color: #1C1C1A;
          border: 0.5px solid #1C1C1A;
          padding: 15px;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 1px;
          margin-top: 1.25rem;
          transition: background 0.2s;
        }
        .ck-btn-cod:hover:not(:disabled) { background: #F2EDE6; }
        .ck-btn-cod:disabled { opacity: 0.55; cursor: not-allowed; }

        /* ── Trust strip ── */
        .ck-trust {
          margin-top: 1.25rem;
          padding-top: 1.25rem;
          border-top: 0.5px solid #D9D5C8;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .ck-trust-item {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 10px;
          color: #8A8678;
          letter-spacing: 0.06em;
        }
        .ck-trust-icon {
          width: 14px;
          height: 14px;
          stroke: #9B8F78;
          fill: none;
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          flex-shrink: 0;
        }

        /* ── Section label above left col ── */
        .ck-step {
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #9B8F78;
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ck-step::after {
          content: '';
          flex: 1;
          height: 0.5px;
          background: #D9D5C8;
        }
      `}</style>

      <div className="ck-wrap">
        <div className="ck-shell">

          {/* Page header */}
          <div className="ck-page-header">
            <h1 className="ck-page-title">Secure Checkout</h1>
            <div className="ck-page-sub">Complete your order safely with SIVAAH</div>
          </div>

          <div className="ck-grid">

            {/* ── LEFT: Form ── */}
            <div>

              {/* Delivery details */}
              <div className="ck-step">Delivery Details</div>
              <div className="ck-card">
                <div className="ck-card-title">Contact Information</div>

                <div className="ck-field">
                  <label className="ck-label">Full Name</label>
                  <input name="name" className={`ck-input${errors.name ? " error" : ""}`} placeholder="Riya Sharma" onChange={handleChange} value={form.name} />
                  {errors.name && <span className="ck-error">{errors.name}</span>}
                </div>

                <div className="ck-field">
                  <label className="ck-label">Email Address</label>
                  <input name="email" type="email" className={`ck-input${errors.email ? " error" : ""}`} placeholder="riya@email.com" onChange={handleChange} value={form.email} />
                  {errors.email && <span className="ck-error">{errors.email}</span>}
                </div>

                <div className="ck-field">
                  <label className="ck-label">Phone Number</label>
                  <input name="phone" className={`ck-input${errors.phone ? " error" : ""}`} placeholder="10-digit mobile number" maxLength={10} onChange={handleChange} value={form.phone} />
                  {errors.phone && <span className="ck-error">{errors.phone}</span>}
                </div>
              </div>

              <div className="ck-card">
                <div className="ck-card-title">Shipping Address</div>

                <div className="ck-field">
                  <label className="ck-label">Complete Address</label>
                  <input name="address" className={`ck-input${errors.address ? " error" : ""}`} placeholder="House/Flat No., Street, Area" onChange={handleChange} value={form.address} />
                  {errors.address && <span className="ck-error">{errors.address}</span>}
                </div>

                <div className="ck-row">
                  <div className="ck-field">
                    <label className="ck-label">City</label>
                    <input name="city" className={`ck-input${errors.city ? " error" : ""}`} placeholder="City" onChange={handleChange} value={form.city} />
                    {errors.city && <span className="ck-error">{errors.city}</span>}
                  </div>
                  <div className="ck-field">
                    <label className="ck-label">Pincode</label>
                    <input name="pincode" className={`ck-input${errors.pincode ? " error" : ""}`} placeholder="6-digit code" maxLength={6} onChange={handleChange} value={form.pincode} />
                    {errors.pincode && <span className="ck-error">{errors.pincode}</span>}
                  </div>
                </div>
              </div>

              {/* Payment method */}
              <div className="ck-step" style={{ marginTop: "1.5rem" }}>Payment</div>
              <div className="ck-card">
                <div className="ck-card-title">Payment Method</div>

                <div
                  className={`ck-pay-option${paymentMethod === "ONLINE" ? " selected" : ""}`}
                  onClick={() => setPaymentMethod("ONLINE")}
                >
                  <div className="ck-pay-radio">
                    {paymentMethod === "ONLINE" && <div className="ck-pay-radio-dot" />}
                  </div>
                  <span className="ck-pay-label">Online Payment</span>
                  <span className="ck-pay-badge">5% Off</span>
                </div>

                <div
                  className={`ck-pay-option${paymentMethod === "COD" ? " selected" : ""}`}
                  onClick={() => setPaymentMethod("COD")}
                >
                  <div className="ck-pay-radio">
                    {paymentMethod === "COD" && <div className="ck-pay-radio-dot" />}
                  </div>
                  <span className="ck-pay-label">Cash on Delivery</span>
                </div>
              </div>

              {/* Coupon */}
              <div className="ck-card">
                <div className="ck-card-title">Promo Code</div>
                <div className="ck-coupon-row">
                  <input
                    type="text"
                    className="ck-coupon-input"
                    placeholder="Enter code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                  />
                  <button className="ck-coupon-btn" onClick={applyCoupon} type="button">Apply</button>
                </div>
                {appliedCoupon && (
                  <div className="ck-coupon-applied">
                    <svg style={{ width: 13, height: 13, stroke: "#7A8A6E", fill: "none", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }} viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                    Code applied:
                    <span className="ck-coupon-applied-tag">{appliedCoupon}</span>
                  </div>
                )}
              </div>
            </div>

            {/* ── RIGHT: Summary (sticky) ── */}
            <div className="ck-summary-col">

              {/* Order items */}
              <div className="ck-card">
                <div className="ck-card-title">Order Summary</div>

                {cart.map((item) => (
                  <div key={item.slug} className="ck-order-item">
                    <div>
                      <div className="ck-order-item-name">{item.name}</div>
                      <div className="ck-order-item-qty">Qty: {item.qty}</div>
                    </div>
                    <div className="ck-order-item-price">₹{item.price * item.qty}</div>
                  </div>
                ))}

                <div className="ck-totals">
                  <div className="ck-total-row">
                    <span>Subtotal</span>
                    <span>₹{totalAmount}</span>
                  </div>

                  {onlineDiscount > 0 && (
                    <div className="ck-total-row discount">
                      <span>Online discount (5%)</span>
                      <span>−₹{onlineDiscount}</span>
                    </div>
                  )}

                  {couponDiscount > 0 && (
                    <div className="ck-total-row discount">
                      <span>Coupon ({appliedCoupon})</span>
                      <span>−₹{couponDiscount}</span>
                    </div>
                  )}

                  <div className="ck-total-row">
                    <span>Shipping</span>
                    <span style={{ color: shippingCharge === 0 ? "#7A8A6E" : "#1C1C1A" }}>
                      {shippingCharge === 0 ? "Free" : `₹${shippingCharge}`}
                    </span>
                  </div>

                  <div className="ck-total-divider" />

                  <div className="ck-total-final">
                    <span className="ck-total-final-label">Total</span>
                    <span className="ck-total-final-amount">₹{finalAmount}</span>
                  </div>
                </div>

                {/* CTA */}
                {paymentMethod === "ONLINE" ? (
                  <button className="ck-btn-pay" onClick={handleOnlinePayment} disabled={loading || cart.length === 0}>
                    {loading ? "Please wait…" : `Pay ₹${finalAmount}`}
                  </button>
                ) : (
                  <button className="ck-btn-cod" onClick={handleCOD} disabled={loading || cart.length === 0}>
                    {loading ? "Please wait…" : "Place Order"}
                  </button>
                )}

                {/* Trust */}
                <div className="ck-trust">
                  <div className="ck-trust-item">
                    <svg className="ck-trust-icon" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    100% Secure Payments
                  </div>
                  <div className="ck-trust-item">
                    <svg className="ck-trust-icon" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                    PAN India Shipping
                  </div>
                  <div className="ck-trust-item">
                    <svg className="ck-trust-icon" viewBox="0 0 24 24"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
                    Genuine 925 Sterling Silver
                  </div>
                  <div className="ck-trust-item">
                    <svg className="ck-trust-icon" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    WhatsApp Tracking Updates
                  </div>
                </div>
              </div>

            </div>
            {/* end right col */}

          </div>
        </div>
      </div>
    </>
  );
}