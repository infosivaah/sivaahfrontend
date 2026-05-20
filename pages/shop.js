import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductGridSkeleton from "../components/skeletons/ProductGridSkeleton";

export default function ShopPage({
  categories
}) {

  const router = useRouter();

  const {
    category,
    maxPrice,
    search,
    sort
  } = router.query;

  const [loading, setLoading] =
    useState(true);

  const [mobileFilters, setMobileFilters] =
    useState(false);
  const [items, setItems] =
    useState([]);

  const [page, setPage] =
    useState(1);

  const [loadingMore, setLoadingMore] =
    useState(false);

  const [hasMoreProducts, setHasMoreProducts] =
    useState(false);
  /* INITIAL FETCH */

  /* FETCH PRODUCTS */

  useEffect(() => {

    const fetchProducts =
      async () => {

        try {

          setLoading(true);

          const params =
            new URLSearchParams({

              page: 1,

              limit: 12,

              category:
                category || "",

              maxPrice:
                maxPrice || "",

              search:
                search || "",

              sort:
                sort || ""
            });

          const res = await fetch(

            `https://sivaahbackend.onrender.com/api/products/paginated?${params}`

          );

          const data =
            await res.json();

          setItems(
            data.products || []
          );

          setHasMoreProducts(
            data.hasMore
          );

          setPage(1);

        } catch (err) {

          console.log(err);

        } finally {

          setLoading(false);
        }
      };

    fetchProducts();

  }, [
    category,
    maxPrice,
    search,
    sort
  ]);
  /* LOADING */



  //   const start = () => setLoading(true);

  //   const end = () => setLoading(false);

  //   router.events.on(
  //     "routeChangeStart",
  //     start
  //   );

  //   router.events.on(
  //     "routeChangeComplete",
  //     end
  //   );

  //   router.events.on(
  //     "routeChangeError",
  //     end
  //   );

  //   return () => {

  //     router.events.off(
  //       "routeChangeStart",
  //       start
  //     );

  //     router.events.off(
  //       "routeChangeComplete",
  //       end
  //     );

  //     router.events.off(
  //       "routeChangeError",
  //       end
  //     );
  //   };

  // }, [router]);

  /* FILTER */



  /* LOAD MORE */

  const loadMoreProducts =
    async () => {

      try {

        setLoadingMore(true);

        const nextPage =
          page + 1;

        const params =
          new URLSearchParams({

            page: nextPage,

            limit: 8,

            category:
              category || "",

            maxPrice:
              maxPrice || "",

            search:
              search || "",

            sort:
              sort || ""
          });

        const res = await fetch(

          `https://sivaahbackend.onrender.com/api/products/paginated?${params}`

        );

        const data =
          await res.json();

        setItems(prev => [

          ...prev,

          ...data.products
        ]);

        setPage(nextPage);

        setHasMoreProducts(
          data.hasMore
        );

      } catch (err) {

        console.log(err);

      } finally {

        setLoadingMore(false);
      }
    };
  /* QUERY */

  const updateQuery = (
    key,
    value
  ) => {

    const params =
      new URLSearchParams(
        router.query
      );

    if (!value)
      params.delete(key);

    else
      params.set(key, value);

    router.push(
      `/shop?${params.toString()}`,
      undefined,
      { shallow: true }
    );
  };

  return (
    <>

      <Head>

        <title>
          Shop Luxury Silver Jewellery | SIVAAH
        </title>

        <meta
          name="description"
          content="Explore premium 925 silver jewellery crafted with meaning, elegance and timeless femininity."
        />

      </Head>

      {/* GLOBAL STYLES */}

      <style jsx global>{`

        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap');

        body {

          background: #faf7f2;

          font-family:
            "Montserrat",
            sans-serif;

          color: #1d1b18;
        }

        .shop-wrap {

          width: min(1450px, 94%);

          margin: auto;
        }

        /* HERO */

        .shop-hero {

          position: relative;

          border-radius: 34px;

          overflow: hidden;

          min-height: 420px;

          margin-top: 22px;

          margin-bottom: 40px;

          display: flex;

          align-items: center;

          padding: 60px;

          background:
            linear-gradient(
              to right,
              rgba(250,247,242,0.92),
              rgba(250,247,242,0.45)
            ),

            url("https://res.cloudinary.com/dh61336lh/image/upload/v1771238437/WhatsApp_Image_2025-12-29_at_6.33.25_PM_2_hjxx2s.jpg");

          background-size: cover;

          background-position: center;

          box-shadow:
            0 18px 60px rgba(0,0,0,0.08);
        }

        .hero-content {

          max-width: 700px;
        }

        .eyebrow {

          color: #b88b4a;

          text-transform: uppercase;

          letter-spacing: 0.32em;

          font-size: 11px;

          margin-bottom: 18px;
        }

        .hero-title {

          font-family:
            "Cormorant Garamond",
            serif;

          font-size:
            clamp(54px, 8vw, 100px);

          line-height: 0.95;

          letter-spacing: -0.04em;

          margin-bottom: 24px;
        }

        .hero-text {

          color: #6e675d;

          font-size: 15px;

          line-height: 1.9;

          max-width: 620px;
        }

        /* FILTER BAR */

        .filter-bar {

          position: sticky;

          top: 70px;

          z-index: 40;

          background:
            rgba(255,255,255,0.78);

          backdrop-filter: blur(18px);

          border:
            1px solid #ece1d4;

          border-radius: 22px;

          padding: 18px;

          margin-bottom: 26px;

          box-shadow:
            0 10px 30px rgba(0,0,0,0.04);
        }

        .lux-input,
        .lux-select {

          width: 100%;

          height: 52px;

          border-radius: 16px;

          border:
            1px solid #eadfce;

          background: white;

          padding: 0 18px;

          outline: none;

          font-size: 14px;

          color: #1d1b18;

          transition: 0.3s;
        }

        .lux-input:focus,
        .lux-select:focus {

          border-color: #c8a46b;

          box-shadow:
            0 0 0 4px
            rgba(200,164,107,0.12);
        }

        /* CHIP */

        .chip-row {

          display: flex;

          gap: 12px;

          flex-wrap: wrap;

          margin-bottom: 34px;
        }

        .lux-chip {

          height: 42px;

          padding: 0 20px;

          border-radius: 999px;

          border:
            1px solid #eadfce;

          background: white;

          color: #6d6458;

          font-size: 12px;

          font-weight: 600;

          letter-spacing: 0.04em;

          transition: 0.3s;

          cursor: pointer;
        }

        .lux-chip:hover {

          background: #f6efe5;
        }

        .lux-chip.active {

          background:
            linear-gradient(
              135deg,
              #d8b786,
              #b88b4a
            );

          color: white;

          border: none;

          box-shadow:
            0 10px 24px rgba(184,139,74,0.22);
        }

        /* TOP BAR */

        .top-row {

          display: flex;

          align-items: center;

          justify-content: space-between;

          margin-bottom: 26px;
        }

        .results {

          color: #766e63;

          font-size: 14px;
        }

        .sort-select {

          width: 220px;
        }

        /* GRID */

        .products-grid {

          display: grid;

          grid-template-columns:
            repeat(4, minmax(0,1fr));

          gap: 18px;
        }
                  /* EMPTY STATE */

        .empty-wrap {

          min-height: 50vh;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          text-align: center;
        }

        .empty-title {

          font-family:
            "Cormorant Garamond",
            serif;

          font-size: 52px;

          margin-bottom: 16px;
        }

        .empty-text {

          color: #766e63;

          line-height: 1.9;

          max-width: 520px;

          margin-bottom: 28px;
        }

        .lux-btn {

          height: 52px;

          padding: 0 28px;

          border-radius: 16px;

          border: none;

          background:
            linear-gradient(
              135deg,
              #d8b786,
              #b88b4a
            );

          color: white;

          font-size: 12px;

          font-weight: 700;

          letter-spacing: 0.08em;

          text-transform: uppercase;

          box-shadow:
            0 12px 28px rgba(184,139,74,0.22);

          transition: 0.3s;
        }

        .lux-btn:hover {

          transform: translateY(-2px);
        }

        /* MOBILE FILTER */

        .mobile-filter-btn {

          display: none;
        }

        /* MOBILE */

        @media(max-width:992px){

          .products-grid {

            grid-template-columns:
              repeat(2,minmax(0,1fr));

            gap: 12px;
          }

          .shop-hero {

            min-height: 340px;

            padding: 40px;
          }

          .hero-title {

            font-size: 56px;
          }
        }

        @media(max-width:768px){

          .shop-wrap {

            width: 96%;
          }

          .shop-hero {

            min-height: 280px;

            padding: 26px;

            border-radius: 24px;

            margin-bottom: 24px;
          }

          .hero-title {

            font-size: 42px;

            margin-bottom: 16px;
          }

          .hero-text {

            font-size: 13px;

            line-height: 1.7;
          }

          .filter-bar {

            position: fixed;

            bottom: 0;

            left: 0;

            right: 0;

            top: auto;

            z-index: 999;

            border-radius: 24px 24px 0 0;

            padding: 18px;

            transform:
              translateY(
                ${mobileFilters
          ? "0%"
          : "105%"}
              );

            transition: 0.35s ease;

            max-height: 85vh;

            overflow-y: auto;
          }

          .mobile-filter-btn {

            position: fixed;

            bottom: 18px;

            right: 18px;

            z-index: 1000;

            width: 60px;

            height: 60px;

            border-radius: 50%;

            border: none;

            display: flex;

            align-items: center;

            justify-content: center;

            background:
              linear-gradient(
                135deg,
                #d8b786,
                #b88b4a
              );

            color: white;

            font-size: 22px;

            box-shadow:
              0 16px 36px rgba(184,139,74,0.30);
          }

          .top-row {

            flex-direction: column;

            align-items: flex-start;

            gap: 12px;
          }

          .sort-select {

            width: 100%;
          }

          .chip-row {

            gap: 8px;

            margin-bottom: 22px;

            overflow-x: auto;

            flex-wrap: nowrap;

            padding-bottom: 4px;
          }

          .chip-row::-webkit-scrollbar{
            display:none;
          }

          .lux-chip {

            flex-shrink: 0;

            height: 36px;

            padding: 0 14px;

            font-size: 10px;
          }

          .lux-input,
          .lux-select {

            height: 46px;

            border-radius: 14px;

            font-size: 13px;
          }

          .products-grid {

            grid-template-columns:
              repeat(2,minmax(0,1fr));

            gap: 10px;
          }

          .empty-title {

            font-size: 36px;
          }

          .empty-text {

            font-size: 13px;
          }
        }
          /* LOAD MORE */

.load-more-wrap {

  display: flex;

  justify-content: center;

  margin-top: 50px;

  margin-bottom: 70px;
}
/* SKELETON */

.skeleton-wrap {

  margin-top: 18px;
}

.skeleton-card {

  aspect-ratio: 0.75;

  border-radius: 26px;

  background:
    linear-gradient(
      90deg,
      #f5efe7 20%,
      #ece3d7 50%,
      #f5efe7 80%
    );

  background-size:
    220% 100%;

  animation:
    shimmer 1.4s infinite;

  overflow: hidden;

  position: relative;
}

.skeleton-card::after {

  content: "";

  position: absolute;

  left: 14px;

  right: 14px;

  bottom: 18px;

  height: 70px;

  border-radius: 18px;

  background:
    rgba(255,255,255,0.35);
}

@keyframes shimmer {

  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}
      `}</style>

      <div className="shop-wrap">

        {/* HERO */}

        <section className="shop-hero">

          <div className="hero-content">

            <div className="eyebrow">
              Curated Luxury Jewellery
            </div>

            <h1 className="hero-title">
              Discover Jewellery
              <br />
              That Feels Personal
            </h1>

            <div className="hero-text">
              Timeless 925 silver jewellery
              crafted with elegance,
              intention and feminine energy.
              Designed to be worn every day,
              remembered forever.
            </div>

          </div>

        </section>

        {/* MOBILE FILTER BTN */}

        <button
          className="mobile-filter-btn"
          onClick={() =>
            setMobileFilters(
              !mobileFilters
            )
          }
        >
          ☰
        </button>

        {/* FILTER BAR */}

        <div className="filter-bar">

          <div className="row g-3">

            {/* SEARCH */}

            <div className="col-md-4">

              <input
                className="lux-input"
                placeholder="Search jewellery..."
                defaultValue={search || ""}

                onKeyDown={(e) => {

                  if (e.key === "Enter") {

                    updateQuery(
                      "search",
                      e.target.value
                    );
                  }
                }}
              />

            </div>

            {/* CATEGORY */}

            <div className="col-md-3">

              <select
                className="lux-select"

                value={category || ""}

                onChange={(e) =>
                  updateQuery(
                    "category",
                    e.target.value
                  )
                }
              >

                <option value="">
                  All Collections
                </option>

                {categories.map(
                  (cat, i) => (

                    <option
                      key={i}
                      value={cat}
                    >
                      {cat}
                    </option>

                  ))}

              </select>

            </div>

            {/* PRICE */}

            <div className="col-md-2">

              <select
                className="lux-select"

                value={maxPrice || ""}

                onChange={(e) =>
                  updateQuery(
                    "maxPrice",
                    e.target.value
                  )
                }
              >

                <option value="">
                  Any Price
                </option>

                <option value="999">
                  Under ₹999
                </option>

                <option value="1999">
                  Under ₹1999
                </option>

                <option value="2999">
                  Under ₹2999
                </option>

                <option value="4999">
                  Under ₹4999
                </option>

              </select>

            </div>

            {/* SORT */}

            <div className="col-md-3">

              <select
                className="lux-select"

                value={sort || ""}

                onChange={(e) =>
                  updateQuery(
                    "sort",
                    e.target.value
                  )
                }
              >

                <option value="">
                  Sort By
                </option>

                <option value="latest">
                  Latest
                </option>

                <option value="price-asc">
                  Price Low → High
                </option>

                <option value="price-desc">
                  Price High → Low
                </option>

              </select>

            </div>

          </div>

        </div>

        {/* CATEGORY CHIPS */}

        <div className="chip-row">

          <button
            className="lux-chip active"

            onClick={() =>
              router.push("/shop")
            }
          >
            All
          </button>


          {categories.map((cat, i) => (

            <button
              key={i}

              className={`lux-chip ${category === cat
                ? "active"
                : ""
                }`}

              onClick={() =>
                updateQuery(
                  "category",
                  category === cat
                    ? ""
                    : cat
                )
              }
            >
              {cat}
            </button>

          ))}

        </div>

        {/* TOP ROW */}

        <div className="top-row">

          <div className="results">
            Showing
            {" "}
            <strong>
              {items.length}
            </strong>
            {" "}
            products
          </div>

        </div>

        {/* PRODUCTS */}

        {loading ? (

          <ProductGridSkeleton />

        ) : items.length === 0 ? (

          <div className="empty-wrap">

            <div className="empty-title">
              Something Beautiful
              <br />
              Is Coming Soon
            </div>

            <div className="empty-text">

              Our artisans are crafting
              new jewellery pieces with
              meaning, elegance and timeless
              femininity.

            </div>

            <button
              className="lux-btn"

              onClick={() =>
                router.push("/shop")
              }
            >
              Explore All Jewellery
            </button>

          </div>

        ) : (

          <div className="products-grid">

            {items.map(
              (product) => (

                <div
                  key={product._id}
                >

                  <ProductCard
                    product={product}
                  />

                </div>

              ))}

          </div>

        )}
        {loadingMore && (

          <div className="products-grid skeleton-wrap">

            {Array.from({
              length: 4
            }).map((_, i) => (

              <div
                key={i}
                className="skeleton-card"
              />

            ))}

          </div>

        )}
        {hasMoreProducts && (

          <div className="load-more-wrap">

            <button
              className="lux-btn"

              onClick={loadMoreProducts}

              disabled={loadingMore}
            >

              {loadingMore
                ? "Loading..."
                : "Load More"}

            </button>

          </div>

        )}
      </div>

    </>
  );
}

/* SERVER SIDE */

export async function getServerSideProps() {

  try {

    const categoriesRes =
      await fetch(
        "https://sivaahbackend.onrender.com/api/categories"
      );

    const categoriesRaw =
      await categoriesRes.json();

    return {

      props: {

        categories:
          categoriesRaw.map(
            c => c.name
          )
      }
    };

  } catch {

    return {

      props: {

        categories: []
      }
    };
  }
}
// export async function getServerSideProps() {

//   try {

//     const [
//       productsRes,
//       categoriesRes
//     ] = await Promise.all([

//       fetch(
//         "https://sivaahbackend.onrender.com/api/products/paginated?page=1&limit=12"
//       ),

//       fetch(
//         "https://sivaahbackend.onrender.com/api/categories"
//       )

//     ]);

//     const productsData =
//       await productsRes.json();

//     const categoriesRaw =
//       await categoriesRes.json();

//     return {

//       props: {

//         initialProducts:
//           productsData.products || [],

//         hasMore:
//           productsData.hasMore || false,

//         categories:
//           categoriesRaw.map(
//             c => c.name
//           )
//       }
//     };

//   } catch (err) {

//     return {

//       props: {

//         initialProducts: [],

//         hasMore: false,

//         categories: []
//       }
//     };
//   }
// }
// export async function getServerSideProps() {

//   try {

//     const [
//       productsRes,
//       categoriesRes
//     ] = await Promise.all([

//       fetch(
//         "https://sivaahbackend.onrender.com/api/products"
//       ),

//       fetch(
//         "https://sivaahbackend.onrender.com/api/categories"
//       )

//     ]);

//     const products =
//       await productsRes.json();

//     const categoriesRaw =
//       await categoriesRes.json();

//     return {

//       props: {

//         products:
//           products || [],

//         categories:
//           categoriesRaw.map(
//             c => c.name
//           )
//       }
//     };

//   } catch (err) {

//     return {

//       props: {

//         products: [],

//         categories: []
//       }
//     };
//   }
// }