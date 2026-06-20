import {
    useEffect,
    useState,
} from "react";

import {
    useRouter,
} from "next/router";
import downloadCertificatePDF
    from "../../components/downloadCertificatePDF";

export default function VerifyPage() {

    const router =
        useRouter();

    const { slug } =
        router.query;

    const [certificate, setCertificate] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    async function fetchCertificate() {

        try {

            const res =
                await fetch(

                    `https://sivaahbackend.onrender.com/api/certificates/${slug}`
                );

            const data =
                await res.json();

            setCertificate(
                data.data
            );

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    }

    useEffect(() => {

        if (!slug)
            return;

        fetchCertificate();

    }, [slug]);

    if (loading) {

        return (

            <>
                <div className="loading">

                    Loading...

                </div>

                <style jsx>{`

          .loading {

            min-height:
              100vh;

            display:
              flex;

            align-items:
              center;

            justify-content:
              center;

            background:
              #f8f5f1;

            font-size:
              22px;
          }

        `}</style>
            </>
        );
    }

    if (!certificate) {

        return (

            <>
                <div className="loading">

                    Certificate not found

                </div>

                <style jsx>{`

          .loading {

            min-height:
              100vh;

            display:
              flex;

            align-items:
              center;

            justify-content:
              center;

            background:
              #f8f5f1;

            font-size:
              22px;
          }

        `}</style>
            </>
        );
    }

    return (

        <>

            <style jsx global>{`

        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap');

        body {

          margin: 0;

          background:
            #f8f5f1;

          font-family:
            "Montserrat",
            sans-serif;

          color:
            #1a1a1a;
        }

        * {

          box-sizing:
            border-box;
        }

        img {

          max-width:
            100%;
        }

      `}</style>

            <div className="page">

                {/* HERO */}

                <section className="hero">

                    <div className="heroContent">

                        <h1>

                            SIVAAH

                        </h1>

                        <p className="tagline">

                            Real Weight • Honest Price • Certified Silver

                        </p>

                        <div className="verifiedBadge">

                            <span className="greenDot"></span>

                            Verified Authentic Sivaah Jewellery

                        </div>

                    </div>

                </section>

                {/* MAIN CARD */}

                <section className="mainCard">

                    {/* IMAGE */}

                    <div className="imageSection">

                        <img
                            src={
                                certificate.productImage
                            }
                            alt={
                                certificate.productName
                            }
                        />

                    </div>

                    {/* CONTENT */}

                    <div className="contentSection">

                        <p className="miniTitle">

                            Quality Tested by Sivaah

                        </p>

                        <h2>

                            {
                                certificate.productName
                            }

                        </h2>

                        <p className="description">

                            This jewellery piece has been handcrafted using authentic 925 Sterling Silver and verified under Sivaah quality standards for purity, finishing and craftsmanship.

                        </p>

                        {/* DETAILS */}

                        <div className="detailsBox">

                            <div className="detailRow">

                                <span>

                                    Purity

                                </span>

                                <strong>

                                    {
                                        certificate.purity
                                    }

                                </strong>

                            </div>

                            <div className="detailRow">

                                <span>

                                    Weight

                                </span>

                                <strong>

                                    {
                                        certificate.weight
                                    }g

                                </strong>

                            </div>

                            <div className="detailRow">

                                <span>

                                    Batch ID

                                </span>

                                <strong>

                                    {
                                        certificate.batchid
                                    }

                                </strong>

                            </div>

                            <div className="detailRow">

                                <span>

                                    Verification Status

                                </span>

                                <strong className="verifiedText">

                                    VERIFIED

                                </strong>

                            </div>

                        </div>

                        {/* SIGNATURE */}

                        <div className="signatureSection">

                            <img
                                src="https://res.cloudinary.com/df67hp5yk/image/upload/q_auto/f_auto/v1780298845/ChatGPT_Image_Jun_1__2026__12_55_18_PM-removebg-preview_iki6r6.png"
                                alt="Founder Signature"
                                className="signature"
                            />

                            <p>

                                Founder, Sivaah

                            </p>

                        </div>

                    </div>

                </section>

                {/* CARE SECTION */}

                <section className="careSection">

                    <h3>

                        Jewellery Care Guide

                    </h3>

                    <p className="careSubtitle">

                        Proper care helps your silver jewellery maintain its brilliance and elegance for years.

                    </p>

                    <div className="careGrid">

                        <div className="careCard">

                            <h4>

                                Cleaning

                            </h4>

                            <p>

                                Gently wipe your jewellery using a soft microfiber cloth after every use to remove oils and moisture.

                            </p>

                        </div>

                        <div className="careCard">

                            <h4>

                                Storage

                            </h4>

                            <p>

                                Store jewellery inside the Sivaah pouch in a cool, dry place away from humidity and direct sunlight.

                            </p>

                        </div>

                        <div className="careCard">

                            <h4>

                                Long Lasting Shine

                            </h4>

                            <p>

                                Avoid direct contact with perfume, water, lotions and harsh chemicals to preserve brilliance.

                            </p>

                        </div>

                        <div className="careCard">

                            <h4>

                                Wear Regularly

                            </h4>

                            <p>

                                Regular wear naturally helps maintain the shine of sterling silver jewellery over time.

                            </p>

                        </div>

                    </div>

                </section>

                {/* LAB CERT */}

                <section className="labSection">

                    <h3>

                        Future Lab Certification Support

                    </h3>

                    <p>

                        Independent third-party lab certification support for this jewellery design will be available in future verification updates.

                    </p>

                    <div className="comingSoon">

                        Lab Certification Coming Soon

                    </div>

                </section>

                {/* DOWNLOAD */}

                <div className="buttonWrapper">

                    <button
                        className="downloadBtn"

                        onClick={() =>
                            downloadCertificatePDF(
                                certificate
                            )
                        }
                    >

                        Download Certificate PDF

                    </button>
               


                </div>

            </div>

            <style jsx>{`

        .page {

          padding:
            40px 20px 80px;
        }

        .hero {

          max-width:
            1200px;

          margin:
            auto;

          border-radius:
            40px;

          overflow:
            hidden;

          background:
            linear-gradient(
              135deg,
              #111111,
              #1e1e1e
            );

          box-shadow:
            0 25px 60px rgba(0,0,0,0.15);
        }

        .heroContent {

          padding:
            80px 30px;

          text-align:
            center;
        }

        .hero h1 {

          font-family:
            "Cormorant Garamond",
            serif;

          font-size:
            72px;

          letter-spacing:
            10px;

          color:
            white;

          margin:
            0;
        }

        .tagline {

          margin-top:
            18px;

          color:
            #d4b27a;

          font-size:
            18px;
        }

        .verifiedBadge {

          display:
            inline-flex;

          align-items:
            center;

          gap:
            12px;

          margin-top:
            35px;

          border:
            1px solid #d4b27a;

          padding:
            14px 24px;

          border-radius:
            999px;

          color:
            white;

          background:
            rgba(255,255,255,0.05);
        }

        .greenDot {

          width:
            12px;

          height:
            12px;

          border-radius:
            50%;

          background:
            #00c853;
        }

        .mainCard {

          max-width:
            1200px;

          margin:
            40px auto 0;

          background:
            white;

          border-radius:
            40px;

          overflow:
            hidden;

          display:
            grid;

          grid-template-columns:
            1fr 1fr;

          gap:
            40px;

          padding:
            50px;

          box-shadow:
            0 20px 40px rgba(0,0,0,0.08);
        }

        .imageSection {

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;
        }

        .imageSection img {

          width:
            100%;

          max-width:
            450px;

          border-radius:
            30px;

          box-shadow:
            0 15px 35px rgba(0,0,0,0.12);
        }

        .miniTitle {

          color:
            #c5a46d;

          text-transform:
            uppercase;

          letter-spacing:
            4px;

          font-size:
            12px;

          margin-bottom:
            20px;
        }

        .contentSection h2 {

          font-family:
            "Cormorant Garamond",
            serif;

          font-size:
            52px;

          line-height:
            1.1;

          margin:
            0;
        }

        .description {

          margin-top:
            30px;

          line-height:
            2;

          color:
            #666;
        }

        .detailsBox {

          margin-top:
            40px;
        }

        .detailRow {

          display:
            flex;

          justify-content:
            space-between;

          padding:
            18px 0;

          border-bottom:
            1px solid #eee;
        }

        .detailRow span {

          color:
            #777;
        }

        .verifiedText {

          color:
            #00a63e;
        }

        .signatureSection {

          margin-top:
            50px;
        }

        .signature {

          height:
            90px;
        }

        .signatureSection p {

          margin-top:
            10px;

          color:
            #777;
        }

        .careSection {

          max-width:
            1200px;

          margin:
            40px auto 0;

          background:
            white;

          border-radius:
            40px;

          padding:
            60px 40px;

          box-shadow:
            0 20px 40px rgba(0,0,0,0.08);
        }

        .careSection h3 {

          text-align:
            center;

          font-family:
            "Cormorant Garamond",
            serif;

          font-size:
            54px;

          margin:
            0;
        }

        .careSubtitle {

          text-align:
            center;

          max-width:
            700px;

          margin:
            20px auto 0;

          color:
            #666;

          line-height:
            2;
        }

        .careGrid {

          display:
            grid;

          grid-template-columns:
            repeat(
              auto-fit,
              minmax(250px,1fr)
            );

          gap:
            24px;

          margin-top:
            50px;
        }

        .careCard {

          background:
            #f8f5f1;

          border-radius:
            30px;

          padding:
            35px;
        }

        .careCard h4 {

          font-size:
            24px;

          margin:
            0 0 18px;
        }

        .careCard p {

          line-height:
            2;

          color:
            #666;
        }

        .labSection {

          max-width:
            1200px;

          margin:
            40px auto 0;

          background:
            #111111;

          color:
            white;

          border-radius:
            40px;

          padding:
            60px 40px;
        }

        .labSection h3 {

          font-family:
            "Cormorant Garamond",
            serif;

          font-size:
            54px;

          margin:
            0;
        }

        .labSection p {

          margin-top:
            25px;

          line-height:
            2;

          color:
            #ccc;

          max-width:
            800px;
        }

        .comingSoon {

          margin-top:
            35px;

          display:
            inline-block;

          border:
            1px solid #d4b27a;

          color:
            #d4b27a;

          padding:
            14px 24px;

          border-radius:
            999px;
        }

        .buttonWrapper {

          text-align:
            center;

          margin-top:
            50px;
        }

        .downloadBtn {

          background:
            #111111;

          color:
            white;

          border:
            none;

          padding:
            20px 40px;

          border-radius:
            999px;

          font-size:
            18px;

          cursor:
            pointer;

          transition:
            all 0.3s ease;
        }

        .downloadBtn:hover {

          transform:
            translateY(-3px);

          background:
            #222;
        }

        @media(max-width: 900px) {

          .mainCard {

            grid-template-columns:
              1fr;

            padding:
              30px;
          }

          .hero h1 {

            font-size:
              54px;
          }

          .contentSection h2 {

            font-size:
              40px;
          }

          .careSection h3,
          .labSection h3 {

            font-size:
              42px;
          }
        }

      `}</style>

        </>
    );
}