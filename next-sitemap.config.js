/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://sivaah.in",
  generateRobotsTxt: true,

  changefreq: "daily",
  priority: 0.7,

  sitemapSize: 5000,

  additionalPaths: async (config) => {
    const res = await fetch(
      "https://sivaahbackend.onrender.com/api/products"
    );

    const products = await res.json();

    return products.map((product) => ({
      loc: `/product/${product.slug}`,
      changefreq: "daily",
      priority: 0.9,
      lastmod: product.updatedAt || new Date().toISOString(),
    }));
  },
};
