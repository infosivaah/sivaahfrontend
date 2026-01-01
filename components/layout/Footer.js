import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer-wrapper mt-5">
      <div className="container py-5">
        <div className="row g-4">

          {/* BRAND */}
          <div className="col-md-4">
            <img
              src="/logo.png"
              alt="SIVAAH"
              style={{ height: 42 }}
            />

            <p className="footer-desc mt-3">
              Jewellery crafted with intention, protection,
              and meaning — designed to elevate your
              energy and everyday style.
            </p>
          </div>

          {/* LINKS */}
          <div className="col-md-2">
            <h6 className="footer-title">Explore</h6>
            <ul className="list-unstyled footer-links mt-3">
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/shop">Shop</Link>
              </li>
            </ul>
          </div>

          {/* TRUST */}
          <div className="col-md-3">
            <h6 className="footer-title">Trust & Compliance</h6>
            <ul className="list-unstyled footer-links mt-3">
              <li>
                <a
                  href="https://drive.google.com/file/d/1mSgugNo3NaSU8HXgN_hrIRuKGsKJkAL2/view?usp=sharing"
                  target="_blank"
                >
                  GST Certificate
                </a>
              </li>
              <li>
                <a
                  href="https://drive.google.com/file/d/1mSgugNo3NaSU8HXgN_hrIRuKGsKJkAL2/view?usp=sharing"
                  target="_blank"
                >
                  Hallmark Certificate
                </a>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="col-md-3">
            <h6 className="footer-title">Get in Touch</h6>

            <ul className="list-unstyled footer-links mt-3">
              <li>
                📧{" "}
                <a href="mailto:sivaahofficials@gmail.com">
                  infosivaah@gmail.com
                </a>
              </li>

              <li className="mt-2">
                💬{" "}
                <a
                  href="https://wa.me/918090565000"
                  target="_blank"
                >
                  +91 80905 65000
                </a>
              </li>

              <li className="mt-2 footer-address">
                Shobha Silvers  
                <br />
                Near Purani Sabji Mandi  
                <br />
                Nawabganj, Gonda  
                <br />
                Uttar Pradesh – 271303
              </li>
            </ul>
          </div>
        </div>

        {/* MAP */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="footer-map">
              <iframe
                src="https://www.google.com/maps?q=Shobha+Silvers+Nawabganj+Gonda&output=embed"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="footer-bottom mt-4 pt-3">
          <p>
            © {new Date().getFullYear()} SIVAAH — Destroy Negativity With Style
          </p>
        </div>
      </div>
    </footer>
  );
}
