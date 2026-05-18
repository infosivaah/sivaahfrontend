import Head from "next/head";
import Link from "next/link";
import ProductCard from "../../components/ProductCard";

export default function CategoryPage({
  products,
  featuredProducts,
  category,
  categories
}) {

  categories = categories || [];

  const categoryName =
    category.charAt(0).toUpperCase() +
    category.slice(1);

  const currentCategory =
    categories.find(
      item =>
        item.name.toLowerCase() ===
        category.toLowerCase()
    );

  const otherCategories =
    categories.filter(
      item =>
        item.name.toLowerCase() !==
        category.toLowerCase()
    );

  return (
    <>

      <Head>

        <title>
          {categoryName} | SIVAAH
        </title>

        <meta
          name="description"
          content={`Shop handcrafted 925 silver ${categoryName.toLowerCase()} by SIVAAH.`}
        />

        <link
          rel="canonical"
          href={`https://sivaah.in/collections/${category}`}
        />

      </Head>

      <style jsx global>{`

        .category-page {

          width: min(1450px, 94%);

          margin: auto;

          padding:
            18px 0 70px;
        }

        /* HERO */

        .collection-hero {

          width: 100%;

          display: flex;

          align-items: center;

          gap: 16px;

          padding:
            8px 0 26px;
        }

        .collection-thumb {

          width: 82px;

          height: 82px;

          border-radius: 22px;

          overflow: hidden;

          flex-shrink: 0;
        }

        .collection-thumb img {

          width: 100%;

          height: 100%;

          object-fit: cover;

          display: block;
        }

        .collection-text-wrap {

          display: flex;

          flex-direction: column;

          justify-content: center;
        }

        .collection-mini {

          color: #B88B4A;

          letter-spacing: 0.24em;

          text-transform: uppercase;

          font-size: 9px;

          margin-bottom: 6px;
        }

        .collection-title {

          font-family:
            "Cormorant Garamond",
            serif;

          font-size:
            clamp(34px,5vw,68px);

          line-height: 0.9;

          letter-spacing: -0.05em;

          color: #1D1B18;

          font-weight: 500;
        }

        /* SECTION */

        .products-section {

          margin-bottom: 70px;
        }

        .section-mini {

          color: #B88B4A;

          letter-spacing: 0.24em;

          text-transform: uppercase;

          font-size: 10px;

          margin-bottom: 10px;
        }

        .section-title {

          font-family:
            "Cormorant Garamond",
            serif;

          font-size: 34px;

          color: #1D1B18;

          margin-bottom: 24px;

          font-weight: 500;
        }

        /* PRODUCT GRID */

        .products-grid {

          display: grid;

          grid-template-columns:
            repeat(4,minmax(0,1fr));

          gap: 14px;
        }

        .product-wrap {

          position: relative;
        }

        /* OTHER COLLECTIONS */

        .other-grid {

          display: grid;

          grid-template-columns:
            repeat(3,1fr);

          gap: 14px;
        }

        .other-card {

          position: relative;

          height: 170px;

          border-radius: 22px;

          overflow: hidden;

          text-decoration: none;

          display: block;
        }

        .other-card img {

          width: 100%;

          height: 100%;

          object-fit: cover;

          display: block;

          transition: transform 0.5s ease;
        }

        .other-card:hover img {

          transform: scale(1.05);
        }

        .other-overlay {

          position: absolute;

          inset: 0;

          background:
            linear-gradient(
              to top,
              rgba(0,0,0,0.45),
              rgba(0,0,0,0.05)
            );
        }

        .other-name {

          position: absolute;

          left: 18px;

          bottom: 14px;

          color: white;

          z-index: 2;

          font-family:
            "Cormorant Garamond",
            serif;

          font-size: 30px;

          font-weight: 500;
        }

        /* MOBILE */

        @media(max-width:992px){

          .products-grid {

            grid-template-columns:
              repeat(2,minmax(0,1fr));

            gap: 10px;
          }

          .other-grid {

            grid-template-columns:
              repeat(2,1fr);

            gap: 10px;
          }
        }

        @media(max-width:768px){

          .category-page {

            width: 96%;
          }

          .collection-hero {

            gap: 12px;

            padding:
              2px 0 20px;
          }

          .collection-thumb {

            width: 58px;

            height: 58px;

            border-radius: 16px;
          }

          .collection-mini {

            font-size: 7px;

            margin-bottom: 4px;
          }

          .collection-title {

            font-size: 30px;
          }

          .section-title {

            font-size: 28px;

            margin-bottom: 18px;
          }

          .products-grid {

            gap: 8px;
          }

          .other-grid {

            gap: 8px;
          }

          .other-card {

            height: 110px;

            border-radius: 16px;
          }

          .other-name {

            left: 12px;

            bottom: 10px;

            font-size: 22px;
          }
        }

      `}</style>

      <div className="category-page">

        {/* HERO */}

        <section className="collection-hero">

          <div className="collection-thumb">

            <img
              src={
                currentCategory?.image ||
                products?.[0]?.images?.[0]
              }
              alt={categoryName}
            />

          </div>

          <div className="collection-text-wrap">

            <div className="collection-mini">
              SIVAAH COLLECTION
            </div>

            <div className="collection-title">
              {categoryName}
            </div>

          </div>

        </section>

        {/* CATEGORY PRODUCTS */}

        <section className="products-section">

          <div className="section-mini">
            {categoryName} Collection
          </div>

          <div className="section-title">
            Explore {categoryName}
          </div>

          <div className="products-grid">

            {products.map(product => (

              <div
                key={product._id}
                className="product-wrap"
              >

                <ProductCard
                  product={product}
                />

              </div>

            ))}

          </div>

        </section>

        {/* FEATURED */}

        <section className="products-section">

          <div className="section-mini">
            Most Loved Pieces
          </div>

          <div className="section-title">
            Featured Products
          </div>

          <div className="products-grid">

            {featuredProducts.map(product => (

              <div
                key={product._id}
                className="product-wrap"
              >

                <ProductCard
                  product={product}
                />

              </div>

            ))}

          </div>

        </section>

        {/* OTHER COLLECTIONS */}

        <section>

          <div className="section-mini">
            Explore More
          </div>

          <div className="section-title">
            Other Collections
          </div>

          <div className="other-grid">

            {otherCategories.map(
              (item, i) => (

                <Link
                  href={`/shop?category=${item.name}`}
                  key={i}
                  className="other-card"
                >

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="other-overlay" />

                  <div className="other-name">
                    {item.name}
                  </div>

                </Link>

              ))}

          </div>

        </section>

      </div>

    </>
  );
}

export async function getServerSideProps({
  params
}) {

  try {

    const [
      productsRes,
      featuredRes,
      categoriesRes
    ] = await Promise.all([

      fetch(
        `https://sivaahbackend.onrender.com/api/products/paginated?category=${params.category}&limit=12`
      ),

      fetch(
        "https://sivaahbackend.onrender.com/api/products/featured"
      ),

      fetch(
        "https://sivaahbackend.onrender.com/api/categories"
      )

    ]);

    const productsData =
      await productsRes.json();

    const featuredData =
      await featuredRes.json();

    const categoriesData =
      await categoriesRes.json();

    return {

      props: {

        category:
          params.category,

        products:
          productsData.products || [],

        featuredProducts:
          featuredData || [],

        categories:
          categoriesData || []
      }
    };

  } catch {

    return {

      props: {

        category:
          params.category,

        products: [],

        featuredProducts: [],

        categories: []
      }
    };
  }
}