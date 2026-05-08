import { useRouter } from "next/router";
import Link from "next/link";

export default function Success() {

  const router = useRouter();

  const { orderId } = router.query;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Montserrat:wght@300;400;500;600&display=swap');

        .sc-wrap {
          min-height: 100vh;
          background: #FAFAF8;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1.25rem;
          font-family: 'Montserrat', sans-serif;
        }

        .sc-card {
          width: 100%;
          max-width: 620px;
          background: #FFFFFF;
          border: 0.5px solid #D9D5C8;
          border-radius: 4px;
          padding: 3rem 2rem;
          text-align: center;
          box-shadow: 0 10px 40px rgba(0,0,0,0.03);
        }

        @media (min-width: 768px) {
          .sc-card {
            padding: 4rem 4rem;
          }
        }

        .sc-icon-wrap {
          width: 82px;
          height: 82px;
          margin: 0 auto 1.8rem;
          border-radius: 50%;
          background: #F2EDE6;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sc-icon {
          width: 36px;
          height: 36px;
          stroke: #7A6E58;
          fill: none;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .sc-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 42px;
          font-weight: 300;
          color: #1C1C1A;
          margin-bottom: 0.8rem;
          line-height: 1.1;
        }

        .sc-sub {
          font-size: 12px;
          letter-spacing: 0.08em;
          color: #8A8678;
          line-height: 1.8;
          max-width: 420px;
          margin: 0 auto;
        }

        .sc-divider {
          width: 70px;
          height: 1px;
          background: #D9D5C8;
          margin: 2rem auto;
        }

        .sc-label {
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #9B8F78;
          margin-bottom: 0.8rem;
        }

        .sc-order-id {
          font-family: 'Cormorant Garamond', serif;
          font-size: 34px;
          color: #1C1C1A;
          font-weight: 500;
          word-break: break-word;
        }

        .sc-delivery {
          margin-top: 2.2rem;
        }

        .sc-delivery-time {
          margin-top: 0.7rem;
          font-size: 22px;
          font-family: 'Cormorant Garamond', serif;
          color: #1C1C1A;
        }

        .sc-note {
          margin-top: 2rem;
          font-size: 11px;
          line-height: 1.8;
          color: #8A8678;
          letter-spacing: 0.04em;
        }

        .sc-btn-primary {
          display: inline-block;
          margin-top: 2.2rem;
          background: #1C1C1A;
          color: #F5F0E8;
          padding: 15px 30px;
          border-radius: 2px;
          text-decoration: none;
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          transition: background 0.2s;
        }

        .sc-btn-primary:hover {
          background: #3A3832;
          color: #F5F0E8;
        }

        .sc-btn-secondary {
          display: inline-block;
          margin-top: 1rem;
          border: 0.5px solid #1C1C1A;
          color: #1C1C1A;
          padding: 14px 28px;
          border-radius: 2px;
          text-decoration: none;
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          transition: background 0.2s;
        }

        .sc-btn-secondary:hover {
          background: #F2EDE6;
          color: #1C1C1A;
        }

        .sc-trust {
          margin-top: 2.5rem;
          padding-top: 1.8rem;
          border-top: 0.5px solid #E8E2D8;
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: center;
        }

        .sc-trust-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          color: #8A8678;
          letter-spacing: 0.06em;
        }

        .sc-trust-icon {
          width: 14px;
          height: 14px;
          stroke: #9B8F78;
          fill: none;
          stroke-width: 1.6;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
      `}</style>

      <div className="sc-wrap">

        <div className="sc-card">

          <div className="sc-icon-wrap">
            <svg
              className="sc-icon"
              viewBox="0 0 24 24"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>

          <h1 className="sc-title">
            Order Confirmed
          </h1>

          <p className="sc-sub">
            Thank you for choosing SIVAAH.
            Your handcrafted silver piece is now being prepared with care.
          </p>

          <div className="sc-divider" />

          <div className="sc-label">
            Order ID
          </div>

          <div className="sc-order-id">
            {orderId}
          </div>

          <div className="sc-delivery">

            <div className="sc-label">
              Estimated Delivery
            </div>

            <div className="sc-delivery-time">
              4–7 Business Days
            </div>

          </div>

          <p className="sc-note">
            Tracking updates and shipping confirmations
            will be shared via WhatsApp & SMS.
          </p>

          <a
            href="https://www.shiprocket.in/shipment-tracking/"
            target="_blank"
            rel="noopener noreferrer"
            className="sc-btn-primary"
          >
            Track Shipment
          </a>

          <br />

          <Link
            href="/shop"
            className="sc-btn-secondary"
          >
            Continue Shopping
          </Link>

          <div className="sc-trust">

            <div className="sc-trust-item">
              <svg className="sc-trust-icon" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>

              Secure Payment Verified
            </div>

            <div className="sc-trust-item">
              <svg className="sc-trust-icon" viewBox="0 0 24 24">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
              </svg>

              Genuine 925 Sterling Silver
            </div>

            <div className="sc-trust-item">
              <svg className="sc-trust-icon" viewBox="0 0 24 24">
                <rect x="1" y="3" width="15" height="13" rx="1"/>
                <path d="M16 8h4l3 3v5h-7V8z"/>
                <circle cx="5.5" cy="18.5" r="2.5"/>
                <circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>

              PAN India Delivery
            </div>

          </div>

        </div>
      </div>
    </>
  );
}