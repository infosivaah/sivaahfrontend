import Head from "next/head";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About SIVAAH | Jewellery With Intention</title>
        <meta
          name="description"
          content="SIVAAH is a premium 925 silver jewellery brand crafted with intention, protection, and purpose."
        />
      </Head>

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-9">

            {/* HERO IMAGE */}
            <div className="text-center mb-4">
              <img
                src="/logo1.png"
                alt="SIVAAH Jewellery"
                className="img-fluid"
                style={{
                  maxHeight: "260px",
                  margin: "0 auto"
                }}
              />
            </div>

            {/* HEADING */}
            <h1 className="fw-semibold mb-4 text-center">
              About SIVAAH
            </h1>

            {/* CONTENT */}
            <div
              className="about-content text-center"
              style={{ lineHeight: "1.9" }}
            >
              In a world full of noise, pressure, and unseen negativity,
              what you wear should do more than just look beautiful.
              <br /><br />

              <strong>SIVAAH</strong> is a premium 925 silver jewellery
              brand for those who believe in energy, protection, and
              intention — without compromising on style.
              <br /><br />

              Every design blends ancient meaning with modern minimalism,
              creating jewellery that looks premium, feels powerful,
              and carries purpose.
              <br /><br />

              We are crafting modern talismans in silver —
              designed to guard your vibe.
            </div>

            {/* DIVIDER */}
            <hr className="my-5" />

            {/* CONTACT */}
            <h3 className="fw-semibold mb-3 text-center">
              Get in Touch
            </h3>

            <div className="text-center small text-muted">
              <p className="mb-2">
                📧{" "}
                <a
                  href="mailto:sivaahofficials@gmail.com"
                  className="text-decoration-none"
                >
                  sivaahofficials@gmail.com
                </a>
              </p>

              <p className="mb-2">
                💬{" "}
                <a
                  href="https://wa.me/918090565000"
                  target="_blank"
                  className="text-decoration-none"
                >
                  +91 80905 65000
                </a>
              </p>

              <p className="mb-0">
                📍 Shobha Silvers, Near Purani Sabji Mandi,
                <br />
                Nawabganj, Gonda, Uttar Pradesh – 271303
              </p>
            </div>

            {/* MAP */}
            <div className="mt-4 rounded overflow-hidden">
              <iframe
                src="https://www.google.com/maps?q=Shobha+Silvers+Nawabganj+Gonda&output=embed"
                width="100%"
                height="260"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
