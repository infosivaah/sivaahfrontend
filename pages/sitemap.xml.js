const BASE_URL =
  "https://www.sivaah.in";

function generateSiteMap({
  products,
  categories
}) {

  return `<?xml version="1.0" encoding="UTF-8"?>

<urlset
xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>

<!-- STATIC -->

<url>
<loc>${BASE_URL}</loc>
</url>

<url>
<loc>${BASE_URL}/shop</loc>
</url>

<!-- CATEGORY PAGES -->

${categories.map(category => `

<url>
<loc>${BASE_URL}/collections/${encodeURIComponent(
    category.name.toLowerCase()
  )}</loc>
</url>

`).join("")}

<!-- PRODUCTS -->

${products.map(product => `

<url>
<loc>${BASE_URL}/product/${product.slug}</loc>
</url>

`).join("")}

</urlset>
`;
}

export async function getServerSideProps({
  res
}) {

  try {

    const [
      productsRes,
      categoriesRes
    ] = await Promise.all([

      fetch(
        "https://sivaahbackend.onrender.com/api/products"
      ),

      fetch(
        "https://sivaahbackend.onrender.com/api/categories"
      )

    ]);

    const products =
      await productsRes.json();

    const categories =
      await categoriesRes.json();

    const sitemap =
      generateSiteMap({

        products:
          products || [],

        categories:
          categories || []
      });

    res.setHeader(
      "Content-Type",
      "text/xml"
    );

    res.write(sitemap);

    res.end();

    return {
      props: {}
    };

  } catch (err) {

    return {
      notFound: true
    };
  }
}

export default function Sitemap() {
  return null;
}