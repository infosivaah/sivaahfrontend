import Head from "next/head";
import Link from "next/link";

export default function SilverKnowledge() {
  const faqs = [
    {
      q: "What is 925 silver?",
      a: "925 silver, commonly called sterling silver, contains 92.5% pure silver. The remaining 7.5% is typically another metal added to improve strength and durability. The number 925 refers to 925 parts of silver per 1,000 parts of the alloy."
    },
    {
      q: "Is 925 silver real silver?",
      a: "Yes. 925 silver is genuine silver. It is an alloy containing 92.5% silver rather than 100% pure silver. It is widely used for jewellery because pure silver is relatively soft."
    },
    {
      q: "What does 925 mean on jewellery?",
      a: "The number 925 indicates that the metal contains 925 parts per thousand of silver, equivalent to 92.5% silver by composition."
    },
    {
      q: "Is 925 silver the same as sterling silver?",
      a: "925 silver and sterling silver are commonly used to describe the same 92.5% silver standard."
    },
    {
      q: "What is the difference between 925 silver and 999 silver?",
      a: "925 silver contains 92.5% silver, while 999 silver is approximately 99.9% silver. 999 silver is purer but softer, while 925 silver is commonly preferred for jewellery because the alloy provides greater durability."
    },
    {
      q: "Does 925 silver tarnish?",
      a: "Yes. Silver can react with substances in the surrounding environment and develop a darker or duller surface over time. This is called tarnishing. Tarnishing does not automatically mean that the jewellery is fake."
    },
    {
      q: "Can 925 silver turn black?",
      a: "Yes. Silver jewellery can become darker or blackened as tarnish develops on its surface. How quickly this happens depends on factors such as exposure to air, moisture, chemicals, cosmetics and individual usage."
    },
    {
      q: "Does 925 silver rust?",
      a: "Silver does not rust in the same way iron does. Silver jewellery can tarnish or develop surface discoloration, but this is chemically different from iron rust."
    },
    {
      q: "Can I wear 925 silver jewellery every day?",
      a: "925 silver is commonly used for everyday jewellery. However, daily wear exposes jewellery to sweat, moisture, cosmetics, friction and chemicals, so proper care can help maintain its appearance."
    },
    {
      q: "Can I shower while wearing 925 silver jewellery?",
      a: "It is better to remove silver jewellery before showering. Water, soaps, shampoos and other products can increase exposure to substances that may affect the jewellery's finish over time."
    },
    {
      q: "Can I swim while wearing silver jewellery?",
      a: "Removing silver jewellery before swimming is recommended. Pool chemicals and other substances in swimming water can affect silver and its finish."
    },
    {
      q: "Can I sleep wearing silver jewellery?",
      a: "You can physically wear silver jewellery while sleeping, but removing it is generally better for the jewellery. Friction, pressure and accidental pulling can affect delicate pieces."
    },
    {
      q: "Can I apply perfume while wearing silver jewellery?",
      a: "It is better to apply perfume, creams and similar products before putting on your jewellery and allow them to settle. Direct and repeated exposure to cosmetics can affect the surface and finish of jewellery."
    },
    {
      q: "How should I clean 925 silver jewellery?",
      a: "For routine care, gently clean the jewellery using an appropriate soft jewellery cloth and store it dry when not in use. Avoid aggressive rubbing, harsh chemicals and abrasive materials, especially on plated or stone-set jewellery."
    },
    {
      q: "What is rhodium-plated silver?",
      a: "Rhodium plating is a thin layer of rhodium applied over the surface of jewellery. It can provide a bright, reflective appearance and an additional surface finish. The underlying jewellery remains silver."
    },
    {
      q: "Does rhodium plating last forever?",
      a: "No. Rhodium is a surface coating and can wear with use. The rate at which it wears depends on factors such as friction, frequency of wear, exposure to chemicals and individual usage."
    },
    {
      q: "How is silver jewellery priced?",
      a: "The price of silver jewellery can include the value of the silver, craftsmanship or making charges, finishing or plating, taxes, packaging, fulfilment and other business costs. The exact components vary between products and brands."
    },
    {
      q: "Does the silver rate affect jewellery prices?",
      a: "Yes. Because silver is a raw material, changes in the underlying silver rate can affect the metal component of jewellery pricing. The overall retail price also depends on weight, craftsmanship and other applicable costs."
    },
    {
      q: "Does heavier silver jewellery always cost more?",
      a: "Generally, a heavier piece contains more silver, so its metal value can be higher. However, the final selling price also depends on craftsmanship, design complexity, finishing, stones, taxes and other costs."
    },
    {
      q: "How can I check whether silver jewellery is genuine?",
      a: "A single 925 stamp should not be treated as conclusive proof by itself. Look for reliable product documentation, applicable hallmark information and a trustworthy seller. In India, consumers can also use BIS resources where applicable."
    },
    {
      q: "Is 925 silver good for sensitive skin?",
      a: "Skin reactions depend on the individual and on the exact alloy, plating and other materials used in a piece. It is better not to treat all 925 silver jewellery as universally hypoallergenic."
    },
    {
      q: "Is silver jewellery a good gift?",
      a: "Silver jewellery can be a meaningful gift because it combines a tangible precious-metal material with personal design and symbolism. Rings, earrings, pendants, bracelets and anklets can suit different occasions and relationships."
    }
  ];

  return (
    <>
      <Head>
        <title>
          925 Silver Jewellery Guide — Purity, Care, Tarnish & Pricing | Sivaah
        </title>

        <meta
          name="description"
          content="Complete guide to 925 silver jewellery. Learn about sterling silver, 925 purity, tarnishing, cleaning, rhodium plating, silver pricing, daily wear, authenticity and buying silver jewellery."
        />

        <meta
          name="keywords"
          content="925 silver, 925 silver jewellery, sterling silver, what is 925 silver, 925 silver purity, silver jewellery care, silver tarnish, silver jewellery price, rhodium plated silver"
        />

        <link
          rel="canonical"
          href="https://www.sivaah.in/silver-knowledge"
        />

        {/* =========================================================
            ARTICLE / WEB PAGE
        ========================================================= */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "The Complete 925 Silver Jewellery Guide",
              description:
                "A comprehensive guide to 925 silver jewellery covering purity, sterling silver, tarnishing, care, rhodium plating, pricing and buying questions.",
              url: "https://www.sivaah.in/silver-knowledge",
              publisher: {
                "@type": "Organization",
                name: "Sivaah",
                url: "https://www.sivaah.in",
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": "https://www.sivaah.in/silver-knowledge",
              },
            }),
          }}
        />

        {/* =========================================================
            BREADCRUMB
        ========================================================= */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://www.sivaah.in/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Silver Knowledge",
                  item: "https://www.sivaah.in/silver-knowledge",
                },
              ],
            }),
          }}
        />

        {/* =========================================================
            FAQ
        ========================================================= */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.a,
                },
              })),
            }),
          }}
        />
      </Head>

      <main className="silver-knowledge-page">

        {/* =========================================================
            HERO
        ========================================================= */}

        <section className="knowledge-hero">
          <div className="knowledge-hero-inner">

            <div className="eyebrow">
              SIVAAH SILVER KNOWLEDGE
            </div>

            <h1>
              The Complete
              <br />
              <em>925 Silver</em>
              <br />
              Jewellery Guide
            </h1>

            <p className="hero-description">
              Everything you need to know before buying, wearing,
              cleaning or caring for 925 sterling silver jewellery.
            </p>

            <div className="hero-links">
              <a href="#basics">
                Start Reading <span>↓</span>
              </a>

              <Link href="/shop">
                Shop 925 Silver <span>→</span>
              </Link>
            </div>

          </div>
        </section>


        {/* =========================================================
            QUICK FACTS
        ========================================================= */}

        <section className="quick-facts">
          <div className="content-width">

            <div className="section-eyebrow">
              BEFORE YOU BUY
            </div>

            <div className="facts-grid">

              <div className="fact">
                <strong>925</strong>
                <span>Parts of silver per 1,000</span>
              </div>

              <div className="fact">
                <strong>92.5%</strong>
                <span>Silver content in 925 silver</span>
              </div>

              <div className="fact">
                <strong>STERLING</strong>
                <span>Common name for 925 silver</span>
              </div>

              <div className="fact">
                <strong>TARNISH</strong>
                <span>A normal surface change in silver</span>
              </div>

            </div>

          </div>
        </section>


        {/* =========================================================
            TABLE OF CONTENTS
        ========================================================= */}

        <section className="toc-section">
          <div className="content-width">

            <div className="toc-card">

              <div>
                <span className="toc-label">
                  IN THIS GUIDE
                </span>

                <h2>
                  Silver Jewellery,
                  <br />
                  explained simply.
                </h2>
              </div>

              <nav className="toc-links">

                <a href="#basics">01 — 925 Silver Basics</a>
                <a href="#purity">02 — Purity & Hallmarking</a>
                <a href="#tarnish">03 — Tarnishing</a>
                <a href="#care">04 — Jewellery Care</a>
                <a href="#rhodium">05 — Rhodium Plating</a>
                <a href="#pricing">06 — Silver Pricing</a>
                <a href="#buying">07 — Buying 925 Silver</a>
                <a href="#daily-wear">08 — Daily Wear</a>
                <a href="#myths">09 — Common Myths</a>
                <a href="#faq">10 — Customer Questions</a>

              </nav>

            </div>

          </div>
        </section>


        {/* =========================================================
            01 BASICS
        ========================================================= */}

        <section id="basics" className="knowledge-section">
          <div className="content-width">

            <div className="section-number">
              01
            </div>

            <div className="section-heading">
              <div className="section-eyebrow">
                THE BASICS
              </div>

              <h2>
                What exactly is
                <br />
                <em>925 silver?</em>
              </h2>
            </div>

            <div className="two-column">

              <div className="large-answer">
                <p>
                  925 silver is a silver alloy containing
                  <strong> 92.5% silver</strong>.
                </p>

                <p>
                  The remaining portion consists of other metals
                  used to give the material greater strength and
                  practicality for jewellery making.
                </p>

                <p>
                  This is why 925 silver is also commonly called
                  <strong> sterling silver</strong>.
                </p>
              </div>

              <div className="info-box">

                <span className="box-label">
                  SIMPLE EXPLANATION
                </span>

                <div className="purity-number">
                  925
                </div>

                <p>
                  925 parts silver
                  <br />
                  out of 1,000 parts
                </p>

                <div className="divider" />

                <strong>
                  = 92.5% silver
                </strong>

              </div>

            </div>

            <div className="answer-grid">

              <article>
                <h3>Is 925 silver real?</h3>
                <p>
                  Yes. 925 silver is genuine silver. It contains
                  92.5% silver rather than being 100% pure silver.
                </p>
              </article>

              <article>
                <h3>Why not use 100% silver?</h3>
                <p>
                  Pure silver is relatively soft. Jewellery makers
                  commonly use alloys to improve strength and
                  durability.
                </p>
              </article>

              <article>
                <h3>What does 925 mean?</h3>
                <p>
                  925 means 925 parts of silver per 1,000 parts
                  of the material.
                </p>
              </article>

            </div>

          </div>
        </section>


        {/* =========================================================
            02 PURITY
        ========================================================= */}

        <section id="purity" className="knowledge-section soft-section">
          <div className="content-width">

            <div className="section-number">
              02
            </div>

            <div className="section-heading">
              <div className="section-eyebrow">
                PURITY
              </div>

              <h2>
                925 vs 999 silver:
                <br />
                <em>what's the difference?</em>
              </h2>
            </div>

            <div className="comparison-table">

              <div className="comparison-row header">
                <span>STANDARD</span>
                <span>SILVER CONTENT</span>
                <span>COMMON USE</span>
              </div>

              <div className="comparison-row">
                <strong>925 Silver</strong>
                <span>92.5%</span>
                <span>Jewellery</span>
              </div>

              <div className="comparison-row">
                <strong>999 Silver</strong>
                <span>Approximately 99.9%</span>
                <span>High-purity silver applications</span>
              </div>

            </div>

            <div className="text-block">

              <h3>
                What about hallmarking?
              </h3>

              <p>
                Hallmarking is a system used to provide an
                independent indication of precious-metal purity.
                In India, BIS provides hallmarking standards and
                consumer information for precious-metal articles.
              </p>

              <p>
                Hallmark information should be considered together
                with proper product documentation and the identity
                of the seller. A simple number stamped on jewellery
                should not be treated as the only proof of
                authenticity.
              </p>

              <div className="note-box">
                <strong>Important:</strong>
                <span>
                  Hallmarking requirements and applicable standards
                  can change. Always check the current BIS guidance
                  when making a compliance or authenticity decision.
                </span>
              </div>

            </div>

          </div>
        </section>


        {/* =========================================================
            03 TARNISH
        ========================================================= */}

        <section id="tarnish" className="knowledge-section">
          <div className="content-width">

            <div className="section-number">
              03
            </div>

            <div className="section-heading">
              <div className="section-eyebrow">
                TARNISH
              </div>

              <h2>
                Will 925 silver
                <br />
                <em>turn black?</em>
              </h2>
            </div>

            <div className="highlight-answer">

              <span className="highlight-icon">
                ✓
              </span>

              <div>
                <strong>
                  Yes — silver can tarnish.
                </strong>

                <p>
                  Tarnishing is a surface change that can make
                  silver appear darker, duller or blackened.
                  It does not automatically mean the jewellery
                  is fake.
                </p>
              </div>

            </div>

            <div className="three-cards">

              <article>
                <span>01</span>
                <h3>Moisture</h3>
                <p>
                  Humidity, sweat and repeated exposure to moisture
                  can contribute to surface changes.
                </p>
              </article>

              <article>
                <span>02</span>
                <h3>Chemicals</h3>
                <p>
                  Cosmetics, perfumes, cleaning products and other
                  chemicals can affect silver and its finish.
                </p>
              </article>

              <article>
                <span>03</span>
                <h3>Storage</h3>
                <p>
                  How jewellery is stored between uses can also
                  influence how quickly its appearance changes.
                </p>
              </article>

            </div>

            <div className="myth-answer">

              <span>MYTH</span>

              <h3>
                “If silver turns black, it isn't real.”
              </h3>

              <p>
                Not necessarily. Genuine silver can tarnish.
                Tarnishing is not by itself an authenticity test.
              </p>

            </div>

          </div>
        </section>


        {/* =========================================================
            04 CARE
        ========================================================= */}

        <section id="care" className="knowledge-section soft-section">
          <div className="content-width">

            <div className="section-number">
              04
            </div>

            <div className="section-heading">
              <div className="section-eyebrow">
                CARE GUIDE
              </div>

              <h2>
                How to take care of
                <br />
                <em>silver jewellery.</em>
              </h2>
            </div>

            <div className="care-grid">

              <div className="care-item">
                <span>01</span>
                <h3>Keep it dry</h3>
                <p>
                  Store jewellery in a dry environment when
                  you're not wearing it.
                </p>
              </div>

              <div className="care-item">
                <span>02</span>
                <h3>Avoid chemicals</h3>
                <p>
                  Minimise direct exposure to perfume, creams,
                  cleaning products and other chemicals.
                </p>
              </div>

              <div className="care-item">
                <span>03</span>
                <h3>Clean gently</h3>
                <p>
                  Use an appropriate soft jewellery cloth and
                  avoid aggressive rubbing or abrasive materials.
                </p>
              </div>

              <div className="care-item">
                <span>04</span>
                <h3>Store separately</h3>
                <p>
                  Keeping pieces separately can reduce scratching,
                  tangling and unnecessary friction.
                </p>
              </div>

            </div>

            <div className="wear-table">

              <div className="wear-row header">
                <span>ACTIVITY</span>
                <span>RECOMMENDATION</span>
              </div>

              <div className="wear-row">
                <strong>Showering</strong>
                <span>Remove jewellery</span>
              </div>

              <div className="wear-row">
                <strong>Swimming</strong>
                <span>Remove jewellery</span>
              </div>

              <div className="wear-row">
                <strong>Gym / Heavy activity</strong>
                <span>Prefer removing delicate pieces</span>
              </div>

              <div className="wear-row">
                <strong>Perfume</strong>
                <span>Apply before jewellery</span>
              </div>

              <div className="wear-row">
                <strong>Sleeping</strong>
                <span>Prefer removing jewellery</span>
              </div>

            </div>

          </div>
        </section>


        {/* =========================================================
            05 RHODIUM
        ========================================================= */}

        <section id="rhodium" className="knowledge-section">
          <div className="content-width">

            <div className="section-number">
              05
            </div>

            <div className="section-heading">
              <div className="section-eyebrow">
                FINISHING
              </div>

              <h2>
                What is
                <br />
                <em>rhodium plating?</em>
              </h2>
            </div>

            <div className="two-column rhodium-layout">

              <div className="large-answer">

                <p>
                  Rhodium plating means applying a thin layer of
                  rhodium over the surface of jewellery.
                </p>

                <p>
                  Rhodium is known for its bright, reflective
                  appearance and is used as a finishing layer on
                  many jewellery pieces.
                </p>

                <p>
                  The important thing to understand is that
                  <strong> plating is a surface layer</strong>.
                  It is not the same thing as the base metal.
                </p>

              </div>

              <div className="rhodium-card">

                <div className="layer layer-top">
                  RHODIUM
                </div>

                <div className="layer layer-middle">
                  925 SILVER
                </div>

                <div className="layer layer-bottom">
                  JEWELLERY BASE
                </div>

              </div>

            </div>

            <div className="note-box">
              <strong>Remember:</strong>
              <span>
                Rhodium plating can wear over time because it is
                a surface coating. Friction, chemicals and frequency
                of wear can influence how quickly the finish changes.
              </span>
            </div>

          </div>
        </section>


        {/* =========================================================
            06 PRICING
        ========================================================= */}

        <section id="pricing" className="knowledge-section pricing-section">
          <div className="content-width">

            <div className="section-number">
              06
            </div>

            <div className="section-heading">
              <div className="section-eyebrow">
                PRICE
              </div>

              <h2>
                How is silver jewellery
                <br />
                <em>actually priced?</em>
              </h2>
            </div>

            <p className="section-intro">
              The price of a jewellery piece is not simply the
              silver rate multiplied by weight.
            </p>

            <div className="price-breakdown">

              <div className="price-step">
                <span>01</span>
                <strong>Silver Value</strong>
                <p>
                  Silver weight × applicable silver rate
                </p>
              </div>

              <div className="price-symbol">+</div>

              <div className="price-step">
                <span>02</span>
                <strong>Craftsmanship</strong>
                <p>
                  Making and craftsmanship associated with the design
                </p>
              </div>

              <div className="price-symbol">+</div>

              <div className="price-step">
                <span>03</span>
                <strong>Finishing</strong>
                <p>
                  Plating, stones, finishing and other applicable components
                </p>
              </div>

              <div className="price-symbol">+</div>

              <div className="price-step">
                <span>04</span>
                <strong>Taxes & Other Costs</strong>
                <p>
                  Applicable taxes, packaging, fulfilment and other costs
                </p>
              </div>

            </div>

            {/* =====================================================
                SIVAAH TRANSPARENCY
            ===================================================== */}

            <div className="sivaah-transparency">

              <div className="section-eyebrow">
                THE SIVAAH APPROACH
              </div>

              <h3>
                Don't just tell customers
                <br />
                the price. <em>Show them why.</em>
              </h3>

              <p>
                Sivaah is built around transparent jewellery pricing.
                Instead of treating the final selling price as a black
                box, our pricing philosophy is to show customers the
                components that contribute to the price of a piece.
              </p>

              <div className="transparency-points">

                <div>
                  <strong>01</strong>
                  <span>Silver weight</span>
                </div>

                <div>
                  <strong>02</strong>
                  <span>Silver rate</span>
                </div>

                <div>
                  <strong>03</strong>
                  <span>Craftsmanship</span>
                </div>

                <div>
                  <strong>04</strong>
                  <span>Applicable costs & taxes</span>
                </div>

              </div>

            </div>

          </div>
        </section>


        {/* =========================================================
            07 BUYING
        ========================================================= */}

        <section id="buying" className="knowledge-section soft-section">
          <div className="content-width">

            <div className="section-number">
              07
            </div>

            <div className="section-heading">
              <div className="section-eyebrow">
                BUYING GUIDE
              </div>

              <h2>
                What should you check
                <br />
                <em>before buying?</em>
              </h2>
            </div>

            <div className="buying-list">

              <div className="buying-item">
                <span>01</span>
                <div>
                  <h3>Purity</h3>
                  <p>
                    Understand whether the jewellery is represented
                    as 925 silver and what documentation or hallmark
                    information applies.
                  </p>
                </div>
              </div>

              <div className="buying-item">
                <span>02</span>
                <div>
                  <h3>Actual weight</h3>
                  <p>
                    Weight matters because silver is one of the
                    components that contributes to the material value.
                  </p>
                </div>
              </div>

              <div className="buying-item">
                <span>03</span>
                <div>
                  <h3>Pricing</h3>
                  <p>
                    Understand whether the listed price includes
                    craftsmanship, finishing, taxes and other applicable
                    components.
                  </p>
                </div>
              </div>

              <div className="buying-item">
                <span>04</span>
                <div>
                  <h3>Seller information</h3>
                  <p>
                    Buy from a seller that clearly identifies the
                    business and provides appropriate product and
                    purchase information.
                  </p>
                </div>
              </div>

              <div className="buying-item">
                <span>05</span>
                <div>
                  <h3>Product specifications</h3>
                  <p>
                    Check dimensions, weight, stones, plating and
                    other product-specific details before purchasing.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* =========================================================
            08 DAILY WEAR
        ========================================================= */}

        <section id="daily-wear" className="knowledge-section">
          <div className="content-width">

            <div className="section-number">
              08
            </div>

            <div className="section-heading">
              <div className="section-eyebrow">
                DAILY WEAR
              </div>

              <h2>
                Can you wear 925 silver
                <br />
                <em>every day?</em>
              </h2>
            </div>

            <div className="daily-wear-answer">

              <h3>
                Yes — but your jewellery needs care.
              </h3>

              <p>
                925 silver is widely used for jewellery designed
                for regular wear. However, everyday use exposes a
                piece to sweat, moisture, friction, cosmetics and
                environmental factors.
              </p>

              <p>
                The better question isn't simply
                <strong> “Can I wear it every day?”</strong>
                It's:
                <strong> “How should I wear and care for it?”</strong>
              </p>

            </div>

            <div className="jewellery-links">

              <Link href="/collections/rings">
                <span>Rings</span>
                <b>→</b>
              </Link>

              <Link href="/collections/earrings">
                <span>Earrings</span>
                <b>→</b>
              </Link>

              <Link href="/collections/pendants">
                <span>Pendants</span>
                <b>→</b>
              </Link>

              <Link href="/collections/bracelets">
                <span>Bracelets</span>
                <b>→</b>
              </Link>

              <Link href="/collections/anklets">
                <span>Anklets</span>
                <b>→</b>
              </Link>

            </div>

          </div>
        </section>


        {/* =========================================================
            09 MYTHS
        ========================================================= */}

        <section id="myths" className="knowledge-section soft-section">
          <div className="content-width">

            <div className="section-number">
              09
            </div>

            <div className="section-heading">
              <div className="section-eyebrow">
                SILVER MYTHS
              </div>

              <h2>
                Things people often
                <br />
                <em>get wrong about silver.</em>
              </h2>
            </div>

            <div className="myths-grid">

              <article>
                <span>MYTH 01</span>
                <h3>
                  “925 means the jewellery is fake.”
                </h3>
                <p>
                  Wrong. 925 is a recognised silver purity designation
                  indicating 925 parts silver per 1,000 parts.
                </p>
              </article>

              <article>
                <span>MYTH 02</span>
                <h3>
                  “Real silver never turns black.”
                </h3>
                <p>
                  Wrong. Genuine silver can tarnish and become darker
                  over time.
                </p>
              </article>

              <article>
                <span>MYTH 03</span>
                <h3>
                  “A 925 stamp proves everything.”
                </h3>
                <p>
                  A stamp alone should not be treated as conclusive
                  proof of authenticity. Seller credibility and
                  appropriate documentation matter too.
                </p>
              </article>

              <article>
                <span>MYTH 04</span>
                <h3>
                  “More expensive means more silver.”
                </h3>
                <p>
                  Not necessarily. Price can include design,
                  craftsmanship, stones, finishing, taxes and other
                  costs in addition to silver.
                </p>
              </article>

            </div>

          </div>
        </section>


        {/* =========================================================
            10 FAQ
        ========================================================= */}

        <section id="faq" className="knowledge-section faq-section">
          <div className="content-width">

            <div className="section-number">
              10
            </div>

            <div className="section-heading">
              <div className="section-eyebrow">
                CUSTOMER QUESTIONS
              </div>

              <h2>
                Your 925 silver
                <br />
                <em>questions, answered.</em>
              </h2>

              <p>
                Straight answers to some of the most common questions
                people ask before buying silver jewellery.
              </p>
            </div>

            <div className="faq-list">

              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="faq-item"
                >
                  <summary>
                    <span>
                      {faq.q}
                    </span>

                    <b>
                      +
                    </b>
                  </summary>

                  <div className="faq-answer">
                    {faq.a}
                  </div>
                </details>
              ))}

            </div>

          </div>
        </section>


        {/* =========================================================
            FINAL SHOP CTA
        ========================================================= */}

        <section className="knowledge-final">

          <div className="final-inner">

            <div className="section-eyebrow">
              NOW YOU KNOW
            </div>

            <h2>
              Find a piece
              <br />
              <em>worth knowing.</em>
            </h2>

            <p>
              Explore Sivaah's collection of 925 silver jewellery
              and discover the details behind every piece.
            </p>

            <div className="final-actions">

              <Link href="/shop">
                Explore 925 Silver Jewellery
                <span>→</span>
              </Link>

              <Link href="/">
                Back to Sivaah
              </Link>

            </div>

          </div>

        </section>

      </main>


      {/* =========================================================
          PAGE STYLES
      ========================================================= */}

      <style jsx global>{`

        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap');


        /* =========================================================
           BASE
        ========================================================= */

        .silver-knowledge-page {

          --cream: #faf7f2;
          --paper: #fffdf9;
          --ink: #1d1b18;
          --muted: #766e65;
          --line: #ddd5cb;
          --soft: #f3eee7;
          --dark: #292621;

          background: var(--cream);
          color: var(--ink);

          font-family:
            "Montserrat",
            sans-serif;

          line-height: 1.7;

          overflow: hidden;
        }


        .content-width {

          width: min(
            1200px,
            calc(100% - 48px)
          );

          margin: 0 auto;
        }


        /* =========================================================
           HERO
        ========================================================= */

        .knowledge-hero {

          min-height: 650px;

          display: flex;
          align-items: center;

          position: relative;

          background:
            radial-gradient(
              circle at 80% 20%,
              rgba(255,255,255,.85),
              transparent 32%
            ),
            linear-gradient(
              135deg,
              #eee8df,
              #faf7f2 55%,
              #e9e1d6
            );
        }


        .knowledge-hero::after {

          content: "";

          position: absolute;

          width: 520px;
          height: 520px;

          border: 1px solid rgba(29,27,24,.08);

          border-radius: 50%;

          right: -150px;
          bottom: -180px;
        }


        .knowledge-hero-inner {

          width: min(
            1200px,
            calc(100% - 48px)
          );

          margin: auto;

          padding: 90px 0;
        }


        .eyebrow,
        .section-eyebrow,
        .section-number {

          font-size: 10px;

          letter-spacing: .22em;

          text-transform: uppercase;

          font-weight: 600;
        }


        .eyebrow {

          margin-bottom: 25px;

          color: #665e55;
        }


        .knowledge-hero h1 {

          margin: 0;

          max-width: 800px;

          font-family:
            "Cormorant Garamond",
            serif;

          font-weight: 400;

          font-size: clamp(
            58px,
            8vw,
            108px
          );

          line-height: .87;

          letter-spacing: -.035em;
        }


        .knowledge-hero h1 em {

          font-weight: 300;
        }


        .hero-description {

          max-width: 550px;

          margin: 35px 0 0;

          color: var(--muted);

          font-size: 14px;

          line-height: 1.9;
        }


        .hero-links {

          display: flex;

          gap: 12px;

          margin-top: 35px;
        }


        .hero-links a {

          min-height: 50px;

          padding: 0 24px;

          display: inline-flex;

          align-items: center;

          justify-content: center;

          gap: 18px;

          border: 1px solid var(--ink);

          color: var(--ink);

          text-decoration: none;

          font-size: 10px;

          text-transform: uppercase;

          letter-spacing: .14em;

          transition: .25s ease;
        }


        .hero-links a:first-child {

          background: var(--ink);

          color: white;
        }


        .hero-links a:hover {

          transform: translateY(-2px);
        }


        /* =========================================================
           QUICK FACTS
        ========================================================= */

        .quick-facts {

          padding: 55px 0;

          border-bottom: 1px solid var(--line);
        }


        .facts-grid {

          display: grid;

          grid-template-columns:
            repeat(4, 1fr);

          margin-top: 30px;
        }


        .fact {

          padding: 10px 30px;

          border-left: 1px solid var(--line);
        }


        .fact:first-child {

          padding-left: 0;

          border-left: 0;
        }


        .fact strong {

          display: block;

          font-family:
            "Cormorant Garamond",
            serif;

          font-size: 32px;

          font-weight: 500;
        }


        .fact span {

          color: var(--muted);

          font-size: 10px;

          text-transform: uppercase;

          letter-spacing: .08em;
        }


        /* =========================================================
           TOC
        ========================================================= */

        .toc-section {

          padding: 90px 0;
        }


        .toc-card {

          display: grid;

          grid-template-columns:
            .8fr 1.2fr;

          gap: 80px;

          padding: 55px;

          background: var(--dark);

          color: white;
        }


        .toc-label {

          font-size: 9px;

          letter-spacing: .2em;

          color: #aaa39b;
        }


        .toc-card h2 {

          margin: 18px 0 0;

          font-family:
            "Cormorant Garamond",
            serif;

          font-size: 52px;

          line-height: .95;

          font-weight: 400;
        }


        .toc-links {

          display: grid;

          grid-template-columns:
            repeat(2, 1fr);

          align-content: center;
        }


        .toc-links a {

          padding: 17px 0;

          border-bottom: 1px solid rgba(255,255,255,.13);

          color: #e8e2da;

          text-decoration: none;

          font-size: 10px;

          letter-spacing: .08em;

          transition: .2s ease;
        }


        .toc-links a:hover {

          color: white;

          padding-left: 7px;
        }


        /* =========================================================
           SECTIONS
        ========================================================= */

        .knowledge-section {

          padding: 110px 0;
        }


        .soft-section {

          background: var(--soft);
        }


        .section-number {

          color: #aaa197;

          margin-bottom: 18px;
        }


        .section-heading {

          max-width: 780px;

          margin-bottom: 60px;
        }


        .section-heading h2 {

          margin: 10px 0 0;

          font-family:
            "Cormorant Garamond",
            serif;

          font-size: clamp(
            48px,
            6vw,
            78px
          );

          line-height: .95;

          font-weight: 400;

          letter-spacing: -.025em;
        }


        .section-heading h2 em {

          font-weight: 300;
        }


        .section-heading > p {

          margin-top: 25px;

          max-width: 620px;

          color: var(--muted);

          font-size: 13px;
        }


        /* =========================================================
           TWO COLUMN
        ========================================================= */

        .two-column {

          display: grid;

          grid-template-columns:
            1.25fr .75fr;

          gap: 80px;

          align-items: center;
        }


        .large-answer {

          max-width: 700px;
        }


        .large-answer p {

          margin: 0 0 24px;

          color: #4f4942;

          font-size: 16px;

          line-height: 1.9;
        }


        .large-answer strong {

          color: var(--ink);
        }


        .info-box {

          padding: 45px;

          background: var(--paper);

          border: 1px solid var(--line);

          text-align: center;
        }


        .box-label {

          font-size: 9px;

          letter-spacing: .18em;

          color: var(--muted);
        }


        .purity-number {

          margin: 15px 0 0;

          font-family:
            "Cormorant Garamond",
            serif;

          font-size: 100px;

          line-height: 1;
        }


        .info-box p {

          margin: 10px 0;

          color: var(--muted);

          font-size: 11px;

          line-height: 1.7;
        }


        .divider {

          width: 50px;

          height: 1px;

          margin: 20px auto;

          background: var(--line);
        }


        .info-box > strong {

          font-size: 12px;

          letter-spacing: .1em;
        }


        /* =========================================================
           ANSWER GRID
        ========================================================= */

        .answer-grid {

          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 18px;

          margin-top: 80px;
        }


        .answer-grid article {

          padding: 30px;

          border: 1px solid var(--line);

          background: rgba(255,255,255,.3);
        }


        .answer-grid h3 {

          margin: 0 0 12px;

          font-family:
            "Cormorant Garamond",
            serif;

          font-size: 28px;

          font-weight: 500;
        }


        .answer-grid p {

          margin: 0;

          color: var(--muted);

          font-size: 12px;

          line-height: 1.8;
        }


        /* =========================================================
           COMPARISON
        ========================================================= */

        .comparison-table {

          border-top: 1px solid var(--ink);

          border-bottom: 1px solid var(--line);
        }


        .comparison-row {

          display: grid;

          grid-template-columns:
            1fr 1fr 1.5fr;

          padding: 22px 0;

          border-bottom: 1px solid var(--line);

          font-size: 12px;
        }


        .comparison-row:last-child {

          border-bottom: 0;
        }


        .comparison-row.header {

          color: var(--muted);

          font-size: 9px;

          letter-spacing: .15em;
        }


        .text-block {

          max-width: 800px;

          margin-top: 70px;
        }


        .text-block h3 {

          font-family:
            "Cormorant Garamond",
            serif;

          font-size: 38px;

          font-weight: 500;
        }


        .text-block p {

          color: var(--muted);

          font-size: 13px;

          line-height: 1.9;
        }


        .note-box {

          display: flex;

          gap: 18px;

          margin-top: 30px;

          padding: 22px 25px;

          border-left: 2px solid var(--ink);

          background: rgba(255,255,255,.35);

          font-size: 11px;
        }


        .note-box span {

          color: var(--muted);
        }


        /* =========================================================
           TARNISH
        ========================================================= */

        .highlight-answer {

          display: flex;

          gap: 25px;

          align-items: flex-start;

          padding: 35px;

          background: #eee8df;

          border: 1px solid var(--line);
        }


        .highlight-icon {

          width: 38px;
          height: 38px;

          flex: 0 0 38px;

          display: flex;

          align-items: center;
          justify-content: center;

          border: 1px solid var(--ink);

          border-radius: 50%;

          font-size: 13px;
        }


        .highlight-answer strong {

          font-family:
            "Cormorant Garamond",
            serif;

          font-size: 31px;

          font-weight: 500;
        }


        .highlight-answer p {

          margin: 8px 0 0;

          color: var(--muted);

          font-size: 12px;
        }


        .three-cards {

          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 18px;

          margin-top: 25px;
        }


        .three-cards article {

          padding: 35px;

          background: var(--paper);

          border: 1px solid var(--line);
        }


        .three-cards article > span {

          color: #aaa197;

          font-size: 9px;

          letter-spacing: .15em;
        }


        .three-cards h3 {

          margin: 25px 0 8px;

          font-family:
            "Cormorant Garamond",
            serif;

          font-size: 29px;

          font-weight: 500;
        }


        .three-cards p {

          margin: 0;

          color: var(--muted);

          font-size: 11px;
        }


        .myth-answer {

          margin-top: 25px;

          padding: 45px;

          background: var(--dark);

          color: white;
        }


        .myth-answer > span {

          font-size: 9px;

          letter-spacing: .18em;

          color: #aaa39b;
        }


        .myth-answer h3 {

          margin: 15px 0;

          font-family:
            "Cormorant Garamond",
            serif;

          font-size: 38px;

          font-weight: 400;
        }


        .myth-answer p {

          margin: 0;

          max-width: 600px;

          color: #bbb5ae;

          font-size: 12px;
        }


        /* =========================================================
           CARE
        ========================================================= */

        .care-grid {

          display: grid;

          grid-template-columns:
            repeat(4, 1fr);

          gap: 15px;
        }


        .care-item {

          padding: 30px;

          background: var(--paper);

          border: 1px solid var(--line);
        }


        .care-item > span {

          color: #aaa197;

          font-size: 9px;
        }


        .care-item h3 {

          margin: 28px 0 8px;

          font-family:
            "Cormorant Garamond",
            serif;

          font-size: 28px;

          font-weight: 500;
        }


        .care-item p {

          margin: 0;

          color: var(--muted);

          font-size: 11px;
        }


        .wear-table {

          margin-top: 60px;

          border-top: 1px solid var(--ink);
        }


        .wear-row {

          display: grid;

          grid-template-columns:
            1fr 1fr;

          padding: 18px 0;

          border-bottom: 1px solid var(--line);

          font-size: 11px;
        }


        .wear-row.header {

          color: var(--muted);

          font-size: 9px;

          letter-spacing: .15em;
        }


        /* =========================================================
           RHODIUM
        ========================================================= */

        .rhodium-card {

          padding: 25px;

          border: 1px solid var(--line);

          background: var(--paper);
        }


        .layer {

          padding: 25px;

          text-align: center;

          border: 1px solid var(--line);

          font-size: 10px;

          letter-spacing: .12em;
        }


        .layer-top {

          background: #dedbd7;
        }


        .layer-middle {

          background: #f2eee8;

          font-weight: 600;
        }


        .layer-bottom {

          background: #d4cec4;

        }


        /* =========================================================
           PRICING
        ========================================================= */

        .pricing-section {

          background: #e9e2d8;
        }


        .section-intro {

          max-width: 620px;

          color: var(--muted);

          font-size: 13px;

          margin-bottom: 50px;
        }


        .price-breakdown {

          display: grid;

          grid-template-columns:
            1fr auto 1fr auto 1fr auto 1fr;

          align-items: center;

          gap: 12px;
        }


        .price-step {

          min-height: 200px;

          padding: 28px;

          background: rgba(255,255,255,.5);

          border: 1px solid rgba(29,27,24,.12);
        }


        .price-step span {

          font-size: 9px;

          color: var(--muted);
        }


        .price-step strong {

          display: block;

          margin: 25px 0 8px;

          font-family:
            "Cormorant Garamond",
            serif;

          font-size: 28px;

          font-weight: 500;
        }


        .price-step p {

          margin: 0;

          color: var(--muted);

          font-size: 10px;

          line-height: 1.7;
        }


        .price-symbol {

          color: #827a71;

          font-size: 20px;
        }


        .sivaah-transparency {

          margin-top: 90px;

          padding: 60px;

          background: var(--dark);

          color: white;
        }


        .sivaah-transparency .section-eyebrow {

          color: #aaa39b;
        }


        .sivaah-transparency h3 {

          margin: 15px 0 20px;

          font-family:
            "Cormorant Garamond",
            serif;

          font-size: 55px;

          line-height: .95;

          font-weight: 400;
        }


        .sivaah-transparency h3 em {

          font-weight: 300;
        }


        .sivaah-transparency > p {

          max-width: 650px;

          color: #bdb6ae;

          font-size: 12px;

          line-height: 1.9;
        }


        .transparency-points {

          display: grid;

          grid-template-columns:
            repeat(4, 1fr);

          margin-top: 50px;

          border-top: 1px solid rgba(255,255,255,.12);
        }


        .transparency-points div {

          padding: 25px 20px 0;

          border-right: 1px solid rgba(255,255,255,.12);
        }


        .transparency-points div:first-child {

          padding-left: 0;
        }


        .transparency-points strong {

          display: block;

          color: #8f8880;

          font-size: 9px;
        }


        .transparency-points span {

          display: block;

          margin-top: 8px;

          font-size: 10px;

          letter-spacing: .08em;
        }


        /* =========================================================
           BUYING
        ========================================================= */

        .buying-list {

          border-top: 1px solid var(--ink);
        }


        .buying-item {

          display: grid;

          grid-template-columns: 80px 1fr;

          padding: 30px 0;

          border-bottom: 1px solid var(--line);
        }


        .buying-item > span {

          color: #aaa197;

          font-size: 10px;
        }


        .buying-item h3 {

          margin: 0 0 7px;

          font-family:
            "Cormorant Garamond",
            serif;

          font-size: 31px;

          font-weight: 500;
        }


        .buying-item p {

          max-width: 650px;

          margin: 0;

          color: var(--muted);

          font-size: 11px;
        }


        /* =========================================================
           DAILY WEAR
        ========================================================= */

        .daily-wear-answer {

          max-width: 850px;

          padding: 45px;

          border: 1px solid var(--line);

          background: var(--paper);
        }


        .daily-wear-answer h3 {

          margin: 0 0 18px;

          font-family:
            "Cormorant Garamond",
            serif;

          font-size: 42px;

          font-weight: 500;
        }


        .daily-wear-answer p {

          color: var(--muted);

          font-size: 13px;

          line-height: 1.9;
        }


        .jewellery-links {

          display: grid;

          grid-template-columns:
            repeat(5, 1fr);

          margin-top: 30px;

          border-top: 1px solid var(--line);

          border-bottom: 1px solid var(--line);
        }


        .jewellery-links a {

          display: flex;

          justify-content: space-between;

          padding: 20px;

          border-right: 1px solid var(--line);

          color: var(--ink);

          text-decoration: none;

          font-size: 10px;

          text-transform: uppercase;

          letter-spacing: .1em;
        }


        .jewellery-links a:last-child {

          border-right: 0;
        }


        .jewellery-links a:hover b {

          transform: translateX(4px);
        }


        .jewellery-links b {

          transition: .2s ease;
        }


        /* =========================================================
           MYTHS
        ========================================================= */

        .myths-grid {

          display: grid;

          grid-template-columns:
            repeat(2, 1fr);

          gap: 18px;
        }


        .myths-grid article {

          padding: 40px;

          background: var(--paper);

          border: 1px solid var(--line);
        }


        .myths-grid article > span {

          color: #aaa197;

          font-size: 9px;

          letter-spacing: .15em;
        }


        .myths-grid h3 {

          max-width: 450px;

          margin: 25px 0 15px;

          font-family:
            "Cormorant Garamond",
            serif;

          font-size: 33px;

          line-height: 1;

          font-weight: 500;
        }


        .myths-grid p {

          max-width: 500px;

          margin: 0;

          color: var(--muted);

          font-size: 11px;
        }


        /* =========================================================
           FAQ
        ========================================================= */

        .faq-section {

          padding-bottom: 130px;
        }


        .faq-list {

          border-top: 1px solid var(--ink);
        }


        .faq-item {

          border-bottom: 1px solid var(--line);
        }


        .faq-item summary {

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 20px;

          padding: 25px 0;

          cursor: pointer;

          list-style: none;

          font-family:
            "Cormorant Garamond",
            serif;

          font-size: 25px;

          font-weight: 500;
        }


        .faq-item summary::-webkit-details-marker {

          display: none;
        }


        .faq-item summary b {

          width: 30px;
          height: 30px;

          flex: 0 0 30px;

          display: flex;

          align-items: center;
          justify-content: center;

          border: 1px solid var(--line);

          border-radius: 50%;

          font-family:
            "Montserrat",
            sans-serif;

          font-size: 14px;

          font-weight: 400;

          transition: .2s ease;
        }


        .faq-item[open] summary b {

          transform: rotate(45deg);
        }


        .faq-answer {

          max-width: 800px;

          padding:
            0 60px 30px 0;

          color: var(--muted);

          font-size: 12px;

          line-height: 1.9;
        }


        /* =========================================================
           FINAL
        ========================================================= */

        .knowledge-final {

          padding: 130px 24px;

          background: var(--dark);

          color: white;

          text-align: center;
        }


        .final-inner {

          max-width: 750px;

          margin: auto;
        }


        .final-inner .section-eyebrow {

          color: #aaa39b;
        }


        .final-inner h2 {

          margin: 18px 0;

          font-family:
            "Cormorant Garamond",
            serif;

          font-size: clamp(
            55px,
            8vw,
            90px
          );

          line-height: .88;

          font-weight: 400;
        }


        .final-inner h2 em {

          font-weight: 300;
        }


        .final-inner p {

          max-width: 550px;

          margin: 25px auto 0;

          color: #bcb5ad;

          font-size: 12px;

          line-height: 1.9;
        }


        .final-actions {

          display: flex;

          justify-content: center;

          gap: 12px;

          margin-top: 35px;
        }


        .final-actions a {

          min-height: 52px;

          padding: 0 25px;

          display: inline-flex;

          align-items: center;

          justify-content: center;

          gap: 18px;

          border: 1px solid #eee8df;

          color: white;

          text-decoration: none;

          font-size: 9px;

          text-transform: uppercase;

          letter-spacing: .15em;

          transition: .25s ease;
        }


        .final-actions a:first-child {

          background: white;

          color: var(--dark);
        }


        .final-actions a:hover {

          transform: translateY(-2px);
        }


        /* =========================================================
           TABLET
        ========================================================= */

        @media (max-width: 900px) {

          .facts-grid {

            grid-template-columns:
              repeat(2, 1fr);

            gap: 25px;
          }


          .fact {

            border-left: 0;

            padding: 10px 0;

          }


          .toc-card {

            grid-template-columns: 1fr;

            gap: 40px;
          }


          .two-column {

            grid-template-columns: 1fr;

            gap: 45px;
          }


          .answer-grid,
          .three-cards {

            grid-template-columns:
              repeat(2, 1fr);
          }


          .care-grid {

            grid-template-columns:
              repeat(2, 1fr);
          }


          .price-breakdown {

            grid-template-columns:
              repeat(2, 1fr);
          }


          .price-symbol {

            display: none;
          }


          .transparency-points {

            grid-template-columns:
              repeat(2, 1fr);
          }


          .jewellery-links {

            grid-template-columns:
              repeat(2, 1fr);
          }


          .jewellery-links a:nth-child(2) {

            border-right: 0;
          }


          .jewellery-links a:nth-child(-n+3) {

            border-bottom: 1px solid var(--line);
          }

        }


        /* =========================================================
           MOBILE
        ========================================================= */

        @media (max-width: 600px) {

          .content-width,
          .knowledge-hero-inner {

            width:
              calc(100% - 30px);
          }


          .knowledge-hero {

            min-height: 570px;
          }


          .knowledge-hero-inner {

            padding: 70px 0;
          }


          .knowledge-hero h1 {

            font-size: 55px;
          }


          .hero-description {

            font-size: 12px;

            margin-top: 25px;
          }


          .hero-links {

            display: grid;

            grid-template-columns: 1fr;

            gap: 8px;
          }


          .hero-links a {

            width: 100%;
          }


          .quick-facts {

            padding: 40px 0;
          }


          .facts-grid {

            gap: 10px;
          }


          .fact strong {

            font-size: 26px;
          }


          .fact span {

            font-size: 8px;
          }


          .toc-section {

            padding: 45px 0;
          }


          .toc-card {

            padding: 30px 24px;

            gap: 30px;
          }


          .toc-card h2 {

            font-size: 43px;
          }


          .toc-links {

            grid-template-columns: 1fr;
          }


          .knowledge-section {

            padding: 70px 0;
          }


          .section-heading {

            margin-bottom: 38px;
          }


          .section-heading h2 {

            font-size: 48px;
          }


          .large-answer p {

            font-size: 13px;
          }


          .info-box {

            padding: 30px;
          }


          .purity-number {

            font-size: 80px;
          }


          .answer-grid,
          .three-cards,
          .care-grid,
          .myths-grid {

            grid-template-columns: 1fr;
          }


          .answer-grid {

            margin-top: 35px;
          }


          .comparison-row {

            grid-template-columns:
              1fr 1fr;

            gap: 10px;
          }


          .comparison-row span:last-child {

            grid-column: 1 / -1;
          }


          .highlight-answer {

            padding: 25px;

            gap: 15px;
          }


          .highlight-answer strong {

            font-size: 25px;
          }


          .three-cards article,
          .care-item,
          .myths-grid article {

            padding: 27px;
          }


          .myth-answer {

            padding: 30px;
          }


          .myth-answer h3 {

            font-size: 31px;
          }


          .price-breakdown {

            grid-template-columns: 1fr;
          }


          .price-step {

            min-height: auto;
          }


          .sivaah-transparency {

            padding: 35px 25px;

            margin-top: 60px;
          }


          .sivaah-transparency h3 {

            font-size: 42px;
          }


          .transparency-points {

            grid-template-columns: 1fr 1fr;

            margin-top: 35px;
          }


          .transparency-points div {

            padding: 18px 10px 0;
          }


          .buying-item {

            grid-template-columns: 45px 1fr;
          }


          .daily-wear-answer {

            padding: 28px;
          }


          .daily-wear-answer h3 {

            font-size: 34px;
          }


          .jewellery-links {

            grid-template-columns: 1fr 1fr;
          }


          .jewellery-links a {

            padding: 17px 12px;

            font-size: 8px;
          }


          .faq-item summary {

            font-size: 21px;

            padding: 21px 0;
          }


          .faq-answer {

            padding-right: 30px;

            font-size: 11px;
          }


          .final-actions {

            display: grid;

            grid-template-columns: 1fr;
          }


          .final-actions a {

            width: 100%;
          }

        }

      `}</style>
    </>
  );
}