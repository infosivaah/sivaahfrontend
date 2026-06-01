import jsPDF from "jspdf";
import QRCode from "qrcode";

async function imageUrlToBase64(url) {

  const response =
    await fetch(url);

  const blob =
    await response.blob();

  return new Promise(
    (resolve) => {

      const reader =
        new FileReader();

      reader.onloadend =
        () =>
          resolve(
            reader.result
          );

      reader.readAsDataURL(
        blob
      );
    }
  );
}

export default async function downloadCertificatePDF(
  certificate
) {

  const pdf =
    new jsPDF({

      orientation:
        "portrait",

      unit:
        "in",

      format:
        [3.4, 2],
    });

  /* BASE64 IMAGES */

  const logoBase64 =
    await imageUrlToBase64(

      "https://www.sivaah.in/logo.png"
    );

  const signBase64 =
    await imageUrlToBase64(

      "https://res.cloudinary.com/df67hp5yk/image/upload/q_auto/f_auto/v1780298845/ChatGPT_Image_Jun_1__2026__12_55_18_PM-removebg-preview_iki6r6.png"
    );

  /* VERIFY QR */

  const verifyQR =
    await QRCode.toDataURL(

      `https://sivaah.in/verify/${certificate.slug}`
    );

  /* INSTAGRAM QR */

  const instaQR =
    await QRCode.toDataURL(

      "https://www.instagram.com/sivaah.in?igsh=MTJzYzljNGJwNHZsaw=="
    );

  /* BACKGROUND */

  pdf.setFillColor(
    248,
    245,
    241
  );

  pdf.rect(
    0,
    0,
    2,
    3.4,
    "F"
  );
/* GOLD BORDER */

pdf.setDrawColor(
  212,
  178,
  122
);

pdf.setLineWidth(
  0.012
);

pdf.rect(
  0.08,
  0.08,
  1.84,
  3.24
);
  const productBase64 =
  await imageUrlToBase64(
    certificate.productImage
  );

/* PRODUCT IMAGE BOX */
/* SQUARE PRODUCT IMAGE */

pdf.setFillColor(
  255,
  255,
  255
);

pdf.roundedRect(
  0.42,
  0.18,
  1.16,
  1.16,
  0.08,
  0.08,
  "F"
);

pdf.addImage(

  productBase64,

  "JPEG",

  0.50,

  0.26,

  1.00,

  1.00
);
  /* LOGO */

 
  /* PRODUCT NAME */

  pdf.setTextColor(
    20,
    20,
    20
  );

  pdf.setFont(
    "times",
    "bold"
  );

 /* PRODUCT NAME */

let fontSize = 9;

if (
  certificate.productName.length > 45
) {

  fontSize = 7.1;
}

if (
  certificate.productName.length > 70
) {

  fontSize = 6.1;
}

pdf.setFontSize(
  fontSize
);

const productName =
  pdf.splitTextToSize(

    certificate.productName,

    1.40
  );

/* LIMIT TO 3 LINES */

const limitedName =
  productName.slice(
    0,
    3
  );

pdf.text(
  limitedName,
  1,
  1.52,
  {
    align:
      "center",
    }
);

  /* VERIFIED */

pdf.setTextColor(
  180,
  140,
  80
);

pdf.setFont(
  "helvetica",
  "bold"
);

pdf.setFontSize(5);

pdf.text(
  "AUTHENTIC 925 STERLING SILVER",
  1,
  1.80,
  {
    align:
      "center",
    }
);
  /* DETAILS */
pdf.setTextColor(
  70,
  70,
  70
);

pdf.setFont(
  "helvetica",
  "normal"
);

pdf.setFontSize(6);

pdf.setFontSize(5);

pdf.text(
  `${certificate.purity} • ${certificate.weight}g`,
  1,
  2.02,
  {
    align:
      "center",
    }
);

pdf.text(
  `Batch ${certificate.batchid}`,
  1,
  2.16,
  {
    align:
      "center",
    }
);
  /* QR */
pdf.setDrawColor(
  220,
  220,
  220
);

pdf.setFillColor(
  255,
  255,
  255
);

pdf.roundedRect(
  0.58,
  2.21,
  0.84,
  1.16,
  0.05,
  0.05,
  "F"
);

  pdf.addImage(
    verifyQR,
    "PNG",
   0.64,
2.28,
0.72,
0.72
  );

  pdf.setTextColor(
    100,
    100,
    100
  );

  pdf.setFontSize(5);

pdf.setTextColor(
  120,
  120,
  120
);

pdf.setFontSize(4);



  /* SIGNATURE */
/* SIGNATURE */
/* SIGNATURE */

pdf.addImage(

  signBase64,

  "PNG",

  0.68,

  2.98,

  0.64,

  0.30
);

pdf.setTextColor(
  140,
  140,
  140
);

pdf.setFontSize(3.8);

pdf.text(
  "Quality Tested by Sivaah",
  1,
  3.34,
  {
    align:
      "center",
    }
);
  /* BACK PAGE */

  pdf.addPage(
    [2, 3.4],
    "portrait"
  );

  pdf.setFillColor(
    248,
    245,
    241
  );

  pdf.rect(
    0,
    0,
    2,
    3.4,
    "F"
  );
/* GOLD BORDER */

pdf.setDrawColor(
  212,
  178,
  122
);

pdf.setLineWidth(
  0.012
);

pdf.rect(
  0.08,
  0.08,
  1.84,
  3.24
);
  /* THANK YOU */

  pdf.setTextColor(
    20,
    20,
    20
  );

  pdf.setFont(
    "times",
    "bold"
  );

  pdf.setFontSize(18);

  pdf.text(
    "Thank You",
    1,
    0.38,
    {
      align:
        "center",
    }
  );

  /* MESSAGE */

  pdf.setFont(
    "helvetica",
    "normal"
  );

  pdf.setTextColor(
    90,
    90,
    90
  );

  pdf.setFontSize(5);

  const thankYouText =
    pdf.splitTextToSize(

      "Thank you for supporting Sivaah. Your purchase supports a growing Indian silver jewellery brand built on transparency, craftsmanship and honest pricing.",

      1.55
    );

  pdf.text(
    thankYouText,
    0.22,
    0.68,
    
  );

  /* CTA BOX */

  pdf.setFillColor(
    255,
    255,
    255
  );
/* DARK CTA BOX */

pdf.setFillColor(
  255,
  252,
  247
);

pdf.roundedRect(
  0.18,
  1.20,
  1.64,
  1.05,
  0.10,
  0.10,
  "F"
);
pdf.setDrawColor(
  212,
  178,
  122
);

pdf.setLineWidth(
  0.008
);
pdf.setTextColor(
  35,
  35,
  35
);

pdf.setFont(
  "helvetica",
  "bold"
);

pdf.setFontSize(7);
pdf.setTextColor(
  212,
  178,
  122
);
pdf.text(
  "POST & GET REWARDED",
  1,
  1.48,
  {
    align:
      "center",
    }
);

pdf.setFont(
  "helvetica",
  "normal"
);

pdf.setFontSize(5);
pdf.setTextColor(
  35,
  35,
  35
);
pdf.text(
  "Show your Sivaah jewellery",
  1,
  1.72,
  {
    align:
      "center",
    }
);

pdf.text(
  "on Instagram Story",
  1,
  1.84,
  {
    align:
      "center",
    }
);

pdf.text(
  "Tag @sivaah.in",
  1,
  2.00,
  {
    align:
      "center",
    }
);

pdf.setTextColor(
  212,
  178,
  122
);

pdf.setFont(
  "helvetica",
  "bold"
);

pdf.text(
  "Get Cashback Upto 20%",
  1,
  2.14,
  {
    align:
      "center",
    }
);
  /* INSTA QR */

  pdf.addImage(
    instaQR,
    "PNG",
  0.68,
2.42,
0.64,
0.64
  );

  pdf.setTextColor(
    100,
    100,
    100
  );

  pdf.setFontSize(5);

pdf.setTextColor(
  120,
  120,
  120
);

pdf.setFontSize(4);

pdf.text(
  "SCAN TO VISIT",
  1,
  3.13,
  {
    align:
      "center",
    }
);
/* SIDE TEXTS */

pdf.setTextColor(
  170,
  170,
  170
);

pdf.setFontSize(4);

pdf.text(

  "Website:- www.sivaah.in",

  0.18,

  3.00,

  {
    angle: 90
  }
);

pdf.text(

  "Insta:- @sivaah.in",

  1.86,

  2.35,

  {
    angle: 270
  }
);
  /* FOOTER */

  /* SAVE */

  pdf.save(

    `${certificate.slug}.pdf`
  );
}