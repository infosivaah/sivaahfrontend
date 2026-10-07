import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import ProductCard2 from "../components/ProductCard2";
import ProductGridSkeleton from "../components/skeletons/ProductGridSkeleton";

const BACKEND_URL =
  "https://sivaahbackend.onrender.com";

const SITE_URL =
  "https://www.sivaah.in";

const SHOP_URL =
  `${SITE_URL}/alldesigns`;


/* ============================================================================
   HELPERS
============================================================================ */

function getQueryValue(value) {
  if (Array.isArray(value)) {
    return value[0] || "";
  }

  return value || "";
}


function getCategorySlug(category) {
  if (!category) return "";

  return String(category)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}


/* ============================================================================
   SHOP PAGE
============================================================================ */

export default function Shop({
  initialProducts = [],
  initialHasMore = false,
  categories = [],
}) {

  const router = useRouter();

  const safeCategories =
    Array.isArray(categories)
      ? categories
      : [];


  /* --------------------------------------------------------------------------
     QUERY
  -------------------------------------------------------------------------- */

  const category =
    getQueryValue(router.query.category);

  const maxPrice =
    getQueryValue(router.query.maxPrice);

  const search =
    getQueryValue(router.query.search);

  const sort =
    getQueryValue(router.query.sort);


  /* --------------------------------------------------------------------------
     STATE
  -------------------------------------------------------------------------- */

  const [items, setItems] =
    useState(initialProducts);

  const [page, setPage] =
    useState(1);

  const [hasMoreProducts, setHasMoreProducts] =
    useState(initialHasMore);

  const [loading, setLoading] =
    useState(false);

  const [loadingMore, setLoadingMore] =
    useState(false);

  const [mobileFilters, setMobileFilters] =
    useState(false);

  const [searchInput, setSearchInput] =
    useState(search);


  /*
   * The first render already contains SSR products.
   * Therefore we should NOT immediately fetch them again.
   */
  const firstRender =
    useRef(true);


  /* ==========================================================================
     CATEGORY / PAGE INFORMATION
  ========================================================================== */

  const activeCategoryName = category
    ? `${category} Jewellery`
    : "925 Silver Jewellery";


  const pageTitle =
    category
      ? `${category} Jewellery in 925 Silver | SIVAAH`
      : "925 Silver Jewellery Online | SIVAAH";


  const pageDescription =
    category
      ? `Shop Sivaah ${String(category).toLowerCase()} jewellery in 925 silver with real product weights, transparent pricing and detailed product information.`
      : "Explore Sivaah 925 silver jewellery with real product weights, transparent pricing and detailed product information. Shop rings, earrings, pendants, bracelets and anklets online.";


  const hasActiveFilters =
    Boolean(
      category ||
      maxPrice ||
      search ||
      sort
    );


  /*
   * Search/filter/sort URLs should not compete with
   * the primary Shop page or dedicated collection pages.
   */
  const robotsContent =
    hasActiveFilters
      ? "noindex,follow"
      : "index,follow";


  /* ==========================================================================
     COLLECTION PAGE SCHEMA
  ========================================================================== */

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",

    "@id": `${SHOP_URL}#collection`,

    url: SHOP_URL,

    name: pageTitle,

    description: pageDescription,

    isPartOf: {
      "@type": "WebSite",
      name: "SIVAAH",
      url: SITE_URL,
    },

    about: {
      "@type": "Thing",
      name: "925 Silver Jewellery",
    },
  };


  /* ==========================================================================
     FETCH PRODUCTS WHEN QUERY CHANGES
  ========================================================================== */

  useEffect(() => {

    if (!router.isReady) {
      return;
    }


    /*
     * SSR already provided the first page.
     */
    if (firstRender.current) {

      firstRender.current = false;

      setSearchInput(search);

      return;
    }


    let cancelled = false;


    async function fetchProducts() {

      setLoading(true);

      setPage(1);

      try {

        const params =
          new URLSearchParams();

        params.set(
          "page",
          "1"
        );

        params.set(
          "limit",
          "12"
        );


        if (category) {
          params.set(
            "category",
            category
          );
        }


        if (maxPrice) {
          params.set(
            "maxPrice",
            maxPrice
          );
        }


        if (search) {
          params.set(
            "search",
            search
          );
        }


        if (sort) {
          params.set(
            "sort",
            sort
          );
        }


        /*
         * IMPORTANT:
         * This is the actual Sivaah backend.
         */
        const response =
          await fetch(
            `${BACKEND_URL}/api/products/paginated?${params.toString()}`
          );


        const data =
          await response.json();


        if (!response.ok) {

          console.error(
            "Sivaah products API error:",
            data
          );

          throw new Error(
            data?.message ||
            data?.error ||
            "Failed to fetch products"
          );
        }


        if (cancelled) {
          return;
        }


        const products =
          Array.isArray(data.products)
            ? data.products
            : [];


        setItems(products);


        setHasMoreProducts(
          Boolean(data.hasMore)
        );

      } catch (error) {

        console.error(
          "Shop products error:",
          error
        );


        if (!cancelled) {

          setItems([]);

          setHasMoreProducts(false);
        }

      } finally {

        if (!cancelled) {

          setLoading(false);
        }
      }
    }


    fetchProducts();


    return () => {

      cancelled = true;

    };

  }, [
    router.isReady,
    category,
    maxPrice,
    search,
    sort,
  ]);


  /* ==========================================================================
     KEEP SEARCH INPUT IN SYNC
  ========================================================================== */

  useEffect(() => {

    setSearchInput(search);

  }, [search]);


  /* ==========================================================================
     LOAD MORE
  ========================================================================== */

  async function loadMoreProducts() {

    if (
      loadingMore ||
      !hasMoreProducts
    ) {
      return;
    }


    const nextPage =
      page + 1;


    setLoadingMore(true);


    try {

      const params =
        new URLSearchParams();


      params.set(
        "page",
        String(nextPage)
      );


      params.set(
        "limit",
        "12"
      );


      if (category) {

        params.set(
          "category",
          category
        );
      }


      if (maxPrice) {

        params.set(
          "maxPrice",
          maxPrice
        );
      }


      if (search) {

        params.set(
          "search",
          search
        );
      }


      if (sort) {

        params.set(
          "sort",
          sort
        );
      }


      /*
       * IMPORTANT:
       * Use the real Sivaah backend.
       */
      const response =
        await fetch(
          `${BACKEND_URL}/api/products/paginated?${params.toString()}`
        );


      const data =
        await response.json();


      if (!response.ok) {

        console.error(
          "Sivaah Load More API error:",
          data
        );

        throw new Error(
          data?.message ||
          data?.error ||
          "Failed to load more products"
        );
      }


      const products =
        Array.isArray(data.products)
          ? data.products
          : [];


      setItems(previous => {
        const existingKeys = new Set(
          previous.map(
            product =>
              String(
                product?._id ||
                product?.id ||
                product?.slug ||
                ""
              )
          )
        );

        const uniqueProducts = products.filter(product => {
          const key = String(
            product?._id ||
            product?.id ||
            product?.slug ||
            ""
          );

          if (!key || existingKeys.has(key)) {
            return false;
          }

          existingKeys.add(key);

          return true;
        });

        return [
          ...previous,
          ...uniqueProducts,
        ];
      });


      setPage(
        nextPage
      );


      setHasMoreProducts(
        Boolean(data.hasMore)
      );

    } catch (error) {

      console.error(
        "Load more error:",
        error
      );

    } finally {

      setLoadingMore(false);
    }
  }


  /* ==========================================================================
     QUERY UPDATE
  ========================================================================== */

  function updateQuery(
    key,
    value
  ) {

    const params =
      new URLSearchParams();


    if (category) {

      params.set(
        "category",
        category
      );
    }


    if (maxPrice) {

      params.set(
        "maxPrice",
        maxPrice
      );
    }


    if (search) {

      params.set(
        "search",
        search
      );
    }


    if (sort) {

      params.set(
        "sort",
        sort
      );
    }


    if (value) {

      params.set(
        key,
        value
      );

    } else {

      params.delete(
        key
      );
    }


    const queryString =
      params.toString();


    router.push(
      queryString
        ? `/alldesigns?${queryString}`
        : "/alldesigns",
      undefined,
      {
        shallow: true,
        scroll: false,
      }
    );
  }


  /* ==========================================================================
     SEARCH
  ========================================================================== */

  function handleSearchSubmit(
    event
  ) {

    event.preventDefault();


    updateQuery(
      "search",
      searchInput.trim()
    );


    setMobileFilters(false);
  }


  /* ==========================================================================
     CLEAR FILTERS
  ========================================================================== */

  function clearFilters() {

    setSearchInput("");


    router.push(
      "/alldesigns",
      undefined,
      {
        shallow: true,
        scroll: false,
      }
    );


    setMobileFilters(false);
  }

  const categoryCollections =
    safeCategories
      .map((item, index) => {

        const categoryName =
          typeof item === "string"
            ? item
            : item?.name;

        if (!categoryName) {
          return null;
        }

        const matchingProduct =
          items.find(product =>
            String(product?.category || "")
              .trim()
              .toLowerCase() ===
            String(categoryName)
              .trim()
              .toLowerCase()
          );

        const image =
          matchingProduct?.images?.[0] || null;

        return {
          name: categoryName,
          slug: getCategorySlug(categoryName),
          image,
          key: `${categoryName}-${index}`,
        };

      })
      .filter(
        item =>
          item &&
          item.image
      );
  /* ==========================================================================
     RENDER
  ========================================================================== */

  return (
    <>
      <Head>

        <title>
          {pageTitle}
        </title>


        <meta
          name="description"
          content={pageDescription}
        />


        <meta
          name="robots"
          content={robotsContent}
        />


        <link
          rel="canonical"
          href={SHOP_URL}
        />


        {/* Open Graph */}

        <meta
          property="og:type"
          content="website"
        />


        <meta
          property="og:title"
          content={pageTitle}
        />


        <meta
          property="og:description"
          content={pageDescription}
        />


        <meta
          property="og:url"
          content={SHOP_URL}
        />


        <meta
          property="og:site_name"
          content="SIVAAH"
        />


        {/* Twitter */}

        <meta
          name="twitter:card"
          content="summary_large_image"
        />


        <meta
          name="twitter:title"
          content={pageTitle}
        />


        <meta
          name="twitter:description"
          content={pageDescription}
        />


        {/* Collection Schema */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html:
              JSON.stringify(
                collectionSchema
              ),
          }}
        />

      </Head>


      <main className="shop-page">

        <div className="shop-container">


          {/* ================================================================
              HERO
          ================================================================ */}

          <section
            className="shop-hero"
            aria-labelledby="shop-page-title"
          >

            <div className="hero-content">

              <p className="hero-eyebrow">
                925 STERLING SILVER
              </p>


              <h1 id="shop-page-title">
                {activeCategoryName}
              </h1>


              <p className="hero-description">

                {category

                  ? `Explore Sivaah ${String(
                    category
                  ).toLowerCase()} jewellery in 925 silver with real product weights and transparent pricing.`

                  : "Explore 925 silver jewellery with real product weights, transparent pricing and detailed product information."

                }

              </p>


              <div className="hero-facts">

                <span>
                  925 Silver
                </span>

                <span>
                  Real Product Weights
                </span>

                <span>
                  Transparent Pricing
                </span>

              </div>

            </div>

          </section>


          {/* ================================================================
              CATEGORY NAVIGATION
          ================================================================ */}

          <nav
            className="category-navigation"
            aria-label="Silver jewellery categories"
          >

            <div className="category-scroll">


              {/* ALL */}

              <Link
                href="/alldesigns"
                className={
                  !category
                    ? "category-chip active"
                    : "category-chip"
                }
                scroll={false}
              >
                All Jewellery
              </Link>


              {/* CATEGORIES */}

              {safeCategories.map(
                (item, index) => {

                  const categoryName =
                    typeof item === "string"
                      ? item
                      : item?.name;


                  if (!categoryName) {
                    return null;
                  }


                  const slug =
                    getCategorySlug(
                      categoryName
                    );


                  const isActive =
                    category === categoryName;


                  return (
                    <Link
                      key={`${categoryName}-${index}`}
                      href={`/alldesigns?category=${encodeURIComponent(
                        categoryName
                      )}`}
                      className={
                        isActive
                          ? "category-chip active"
                          : "category-chip"
                      }
                    >
                      {categoryName}
                    </Link>
                  );
                }
              )}

            </div>

          </nav>


          {/* ================================================================
              DESKTOP FILTER BAR
          ================================================================ */}

          <section
            className="desktop-filter-bar"
            aria-label="Shop filters"
          >


            {/* SEARCH */}

            <form
              className="search-control"
              onSubmit={
                handleSearchSubmit
              }
            >

              <span
                className="search-icon"
                aria-hidden="true"
              >
                ⌕
              </span>


              <input
                type="search"
                value={searchInput}
                onChange={
                  event =>
                    setSearchInput(
                      event.target.value
                    )
                }
                placeholder="Search jewellery..."
                aria-label="Search jewellery"
              />


              {searchInput && (

                <button
                  type="button"
                  className="search-clear"
                  aria-label="Clear search"
                  onClick={() => {

                    setSearchInput("");

                    updateQuery(
                      "search",
                      ""
                    );
                  }}
                >
                  ×
                </button>

              )}

            </form>


            {/* CATEGORY */}

            <label className="select-control">

              <span className="sr-only">
                Filter by category
              </span>


              <select
                value={category}
                onChange={
                  event =>
                    updateQuery(
                      "category",
                      event.target.value
                    )
                }
              >

                <option value="">
                  All Categories
                </option>


                {safeCategories.map(
                  (item, index) => {

                    const categoryName =
                      typeof item === "string"
                        ? item
                        : item?.name;


                    if (!categoryName) {
                      return null;
                    }


                    return (
                      <option
                        key={`${categoryName}-${index}`}
                        value={categoryName}
                      >
                        {categoryName}
                      </option>
                    );
                  }
                )}

              </select>

            </label>


            {/* PRICE */}

            <label className="select-control">

              <span className="sr-only">
                Filter by price
              </span>


              <select
                value={maxPrice}
                onChange={
                  event =>
                    updateQuery(
                      "maxPrice",
                      event.target.value
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
                  Under ₹1,999
                </option>

                <option value="2999">
                  Under ₹2,999
                </option>

                <option value="4999">
                  Under ₹4,999
                </option>

              </select>

            </label>


            {/* SORT */}

            <label className="select-control">

              <span className="sr-only">
                Sort products
              </span>


              <select
                value={sort}
                onChange={
                  event =>
                    updateQuery(
                      "sort",
                      event.target.value
                    )
                }
              >

                <option value="">
                  Sort: Latest
                </option>

                <option value="price-asc">
                  Price: Low to High
                </option>

                <option value="price-desc">
                  Price: High to Low
                </option>

              </select>

            </label>

          </section>


          {/* ================================================================
              MOBILE FILTER BUTTON
          ================================================================ */}

          <div className="mobile-filter-trigger">

            <button
              type="button"
              onClick={() =>
                setMobileFilters(true)
              }
              aria-label="Open filters and sorting"
            >

              <span>
                ☰
              </span>

              Filters & Sort

              {hasActiveFilters && (
                <span className="filter-dot" />
              )}

            </button>

          </div>


          {/* ================================================================
              ACTIVE FILTERS
          ================================================================ */}

          {hasActiveFilters && (

            <div className="active-filter-row">

              <div className="active-filter-text">

                {category && (

                  <span>
                    Category:{" "}
                    <strong>
                      {category}
                    </strong>
                  </span>

                )}


                {maxPrice && (

                  <span>
                    Price:{" "}
                    <strong>
                      Under ₹{maxPrice}
                    </strong>
                  </span>

                )}


                {search && (

                  <span>
                    Search:{" "}
                    <strong>
                      "{search}"
                    </strong>
                  </span>

                )}


                {sort && (

                  <span>

                    {sort === "price-asc"
                      ? "Price: Low to High"
                      : "Price: High to Low"}

                  </span>

                )}

              </div>


              <button
                type="button"
                onClick={clearFilters}
              >
                Clear all
              </button>

            </div>

          )}


          {/* ================================================================
              PRODUCTS HEADING
          ================================================================ */}

          <div className="products-heading">

            <div>

              <h2>
                {category
                  ? `${category} Jewellery`
                  : "Shop 925 Silver Jewellery"}
              </h2>


              <p aria-live="polite">
                {loading
                  ? "Loading jewellery..."
                  : category
                    ? "Explore the current selection"
                    : "A curated selection of Sivaah designs"}
              </p>

            </div>

          </div>


          {/* ================================================================
              PRODUCTS
          ================================================================ */}

          {loading ? (

            <section
              className="products-grid"
              aria-label="Loading silver jewellery"
              aria-busy="true"
            >

              <ProductGridSkeleton
                count={12}
              />

            </section>

          ) : items.length > 0 ? (

            <section
              className="products-grid"
              aria-label={
                `${activeCategoryName} products`
              }
            >

              {items.map(
                (product, index) => (

                  <ProductCard2
                    key={
                      product._id ||
                      product.id ||
                      product.slug ||
                      `product-${index}`
                    }
                    product={product}
                  />

                )
              )}

            </section>

          ) : (

            <section
              className="empty-state"
              aria-labelledby="no-products-title"
            >

              <div
                className="empty-icon"
                aria-hidden="true"
              >
                ◇
              </div>


              <h2 id="no-products-title">
                No jewellery found
              </h2>


              <p>
                Try changing your search
                or filters to explore
                more Sivaah jewellery.
              </p>


              <button
                type="button"
                onClick={clearFilters}
              >
                View All Jewellery
              </button>

            </section>

          )}


          {/* ================================================================
              LOAD MORE
          ================================================================ */}

          {!loading &&
            items.length > 0 &&
            hasMoreProducts && (

              <div className="load-more-wrapper">

                {loadingMore && (

                  <div className="load-more-skeleton">

                    <ProductGridSkeleton
                      count={4}
                    />

                  </div>

                )}


                {!loadingMore && (

                  <button
                    type="button"
                    className="load-more-button"
                    onClick={
                      loadMoreProducts
                    }
                  >
                    Explore More Jewellery
                  </button>

                )}

              </div>

            )}
          {/* ================================================================
    CATEGORY DISCOVERY
================================================================ */}

          {!loading &&
            !hasActiveFilters &&
            items.length > 0 &&
            categoryCollections.length > 0 && (

              <section
                className="category-discovery"
                aria-labelledby="category-discovery-title"
              >

                <div className="category-discovery-header">

                  <p className="section-eyebrow">
                    EXPLORE SIVAAH
                  </p>

                  <h2 id="category-discovery-title">
                    Find Your Silver Style
                  </h2>

                  <p>
                    Explore Sivaah jewellery by category and discover
                    pieces for everyday style, gifting moments and
                    personal meaning.
                  </p>

                </div>

                <div className="category-discovery-grid">

                  {categoryCollections.map(collection => (

                    <Link
                      key={collection.key}
                      href={`/collections/${collection.slug}`}
                      className="category-discovery-card"
                    >

                      <div className="category-discovery-image">

                        <img
                          src={collection.image}
                          alt={`${collection.name} in 925 silver by Sivaah`}
                          loading="lazy"
                        />

                      </div>

                      <div className="category-discovery-content">

                        <span>
                          SIVAAH
                        </span>

                        <h3>
                          {collection.name}
                        </h3>

                        <strong>
                          Explore →
                        </strong>

                      </div>

                    </Link>

                  ))}

                </div>

              </section>

            )}

          {/* ================================================================
              SEO / GEO INFORMATION
          ================================================================ */}

          <section
            className="shop-information"
            aria-labelledby="shop-information-title"
          >

            <div className="shop-information-inner">

              <p className="section-eyebrow">
                SIVAAH SILVER JEWELLERY
              </p>


              <h2 id="shop-information-title">
                925 Silver Jewellery With Clear Pricing
              </h2>


              <p>
                Sivaah offers jewellery made
                in 925 sterling silver.
                Product pages provide the
                available product details
                and weight so customers can
                understand the jewellery
                before placing an order.
              </p>


              <p>
                Sivaah follows a transparent
                pricing approach designed to
                make the value behind silver
                jewellery easier to understand,
                rather than presenting only a
                single unexplained price.
              </p>


              <div className="shop-information-links">

                <Link href="/collections/rings">
                  Shop Silver Rings
                </Link>

                <Link href="/collections/earrings">
                  Shop Silver Earrings
                </Link>

                <Link href="/collections/pendants">
                  Shop Silver Pendants
                </Link>

                <Link href="/collections/bracelets">
                  Shop Silver Bracelets
                </Link>

                <Link href="/collections/anklets">
                  Shop Silver Anklets
                </Link>

              </div>

            </div>

          </section>


          {/* ================================================================
              GEO FAQ
          ================================================================ */}

          <div className="faq-list">

            <details>
              <summary>
                What is the best silver jewellery brand in India?
              </summary>

              <p>
                There is no single silver jewellery brand that is best for
                everyone. When choosing a brand, look for genuine 925
                sterling silver, clear product information, accurate
                weight details, quality craftsmanship and transparent
                pricing. Sivaah is built around these principles, with a
                focus on making silver jewellery more transparent and
                easier to understand.
              </p>
            </details>


            <details>
              <summary>
                What is Sivaah?
              </summary>

              <p>
                Sivaah is an Indian 925 silver jewellery brand focused on
                creating meaningful jewellery with a transparent approach
                to pricing and product information. Sivaah offers silver
                jewellery designed for everyday wear, personal style and
                gifting.
              </p>
            </details>


            <details>
              <summary>
                What makes Sivaah jewellery different?
              </summary>

              <p>
                Sivaah's approach is built around transparency. Product
                information is presented clearly so customers can understand
                what they are buying, including the jewellery's weight and
                relevant pricing information. The brand aims to make buying
                silver jewellery more straightforward and trustworthy.
              </p>
            </details>


            <details>
              <summary>
                What type of jewellery does Sivaah offer?
              </summary>

              <p>
                Sivaah offers 925 silver jewellery across categories such as
                rings, earrings, pendants, bracelets and anklets. The
                collection continues to evolve as new designs and categories
                are introduced.
              </p>
            </details>


            <details>
              <summary>
                What should I gift my partner?
              </summary>

              <p>
                Silver jewellery can be a meaningful gift for your partner
                because it can be worn and kept as a reminder of a special
                moment. For a romantic gift, consider pieces such as a
                pendant, ring, bracelet or earrings based on your partner's
                personal style and everyday preferences.
              </p>
            </details>


            <details>
              <summary>
                Is silver jewellery a good gift for your partner?
              </summary>

              <p>
                Yes, 925 silver jewellery can be a thoughtful gift for
                birthdays, anniversaries, Valentine's Day, milestones or
                simply to express affection. A jewellery piece becomes even
                more meaningful when the design connects with your
                partner's personality, memories or relationship.
              </p>
            </details>


            <details>
              <summary>
                What is 925 sterling silver?
              </summary>

              <p>
                925 sterling silver contains 92.5% pure silver. The
                remaining portion consists of other metals that help give
                the jewellery greater strength and durability, making it
                suitable for jewellery.
              </p>
            </details>


            <details>
              <summary>
                Does 925 silver tarnish?
              </summary>

              <p>
                Yes. 925 sterling silver can naturally tarnish over time
                when exposed to air, moisture and certain substances.
                Proper cleaning, handling and storage can help maintain
                its appearance.
              </p>
            </details>


            <details>
              <summary>
                How should I clean silver jewellery?
              </summary>

              <p>
                For light cleaning, gently wipe silver jewellery with a
                soft jewellery or microfiber cloth. Avoid abrasive
                materials and harsh cleaners that may scratch or affect
                the surface. Delicate, plated or stone-set jewellery
                should be cleaned according to its specific care
                requirements.
              </p>
            </details>


            <details>
              <summary>
                Where can I see details of Sivaah jewellery?
              </summary>

              <p>
                Open any product from the Shop page to visit its product
                page. The product page contains the available specifications, to get the
                product weight and pricing information click on "See How it Priced".
              </p>
            </details>

          </div>


        </div>


        {/* ==================================================================
            MOBILE FILTER DRAWER
        ================================================================== */}

        {mobileFilters && (

          <div
            className="mobile-filter-overlay"
            role="presentation"
            onClick={() =>
              setMobileFilters(false)
            }
          >

            <aside
              className="mobile-filter-drawer"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-filter-title"
              onClick={
                event =>
                  event.stopPropagation()
              }
            >


              <div className="drawer-header">

                <div>

                  <p className="drawer-eyebrow">
                    SHOP
                  </p>

                  <h2 id="mobile-filter-title">
                    Filters & Sort
                  </h2>

                </div>


                <button
                  type="button"
                  onClick={() =>
                    setMobileFilters(false)
                  }
                  aria-label="Close filters"
                >
                  ×
                </button>

              </div>


              {/* SEARCH */}

              <form
                className="drawer-search"
                onSubmit={
                  handleSearchSubmit
                }
              >

                <input
                  type="search"
                  value={searchInput}
                  onChange={
                    event =>
                      setSearchInput(
                        event.target.value
                      )
                  }
                  placeholder="Search jewellery..."
                  aria-label="Search jewellery"
                />


                <button type="submit">
                  Search
                </button>

              </form>


              {/* CATEGORY */}

              <div className="drawer-field">

                <label htmlFor="mobile-category">
                  Category
                </label>


                <select
                  id="mobile-category"
                  value={category}
                  onChange={
                    event =>
                      updateQuery(
                        "category",
                        event.target.value
                      )
                  }
                >

                  <option value="">
                    All Categories
                  </option>


                  {safeCategories.map(
                    (item, index) => {

                      const categoryName =
                        typeof item === "string"
                          ? item
                          : item?.name;


                      if (!categoryName) {
                        return null;
                      }


                      return (
                        <option
                          key={`${categoryName}-${index}`}
                          value={categoryName}
                        >
                          {categoryName}
                        </option>
                      );
                    }
                  )}

                </select>

              </div>


              {/* PRICE */}

              <div className="drawer-field">

                <label htmlFor="mobile-price">
                  Price
                </label>


                <select
                  id="mobile-price"
                  value={maxPrice}
                  onChange={
                    event =>
                      updateQuery(
                        "maxPrice",
                        event.target.value
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
                    Under ₹1,999
                  </option>

                  <option value="2999">
                    Under ₹2,999
                  </option>

                  <option value="4999">
                    Under ₹4,999
                  </option>

                </select>

              </div>


              {/* SORT */}

              <div className="drawer-field">

                <label htmlFor="mobile-sort">
                  Sort
                </label>


                <select
                  id="mobile-sort"
                  value={sort}
                  onChange={
                    event =>
                      updateQuery(
                        "sort",
                        event.target.value
                      )
                  }
                >

                  <option value="">
                    Latest
                  </option>

                  <option value="price-asc">
                    Price: Low to High
                  </option>

                  <option value="price-desc">
                    Price: High to Low
                  </option>

                </select>

              </div>


              <div className="drawer-actions">

                <button
                  type="button"
                  className="drawer-clear"
                  onClick={
                    clearFilters
                  }
                >
                  Clear All
                </button>


                <button
                  type="button"
                  className="drawer-apply"
                  onClick={() =>
                    setMobileFilters(false)
                  }
                >
                  View Jewellery
                </button>

              </div>


            </aside>

          </div>

        )}

      </main>


      {/* ======================================================================
          STYLES
      ====================================================================== */}

      <style jsx>{`

/* ================================================================
   BASE
================================================================ */

.shop-page {
  min-height: 100vh;
  background: #faf8f4;
  color: #25221e;
}

.shop-container {
  width: min(1440px, 94%);
  margin: 0 auto;
  padding: 18px 0 80px;
}


/* ================================================================
   HERO
================================================================ */

.shop-hero {
  min-height: 245px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;

  border-radius: 28px;

  background:
    radial-gradient(
      circle at 80% 20%,
      rgba(198, 157, 73, 0.18),
      transparent 35%
    ),
    linear-gradient(
      135deg,
      #eee4d4 0%,
      #f8f3eb 50%,
      #e7dccb 100%
    );

  border: 1px solid rgba(120, 95, 55, 0.12);
}

.hero-content {
  width: min(820px, 90%);
  margin: 0 auto;
  text-align: center;
  padding: 48px 20px;
}

.hero-eyebrow,
.section-eyebrow,
.drawer-eyebrow {
  margin: 0 0 12px;

  font-size: 11px;
  font-weight: 700;

  letter-spacing: 0.22em;
  text-transform: uppercase;

  color: #9a7942;
}

.shop-hero h1 {
  margin: 0;

  font-family:
    "Cormorant Garamond",
    Georgia,
    serif;

  font-size:
    clamp(
      38px,
      5vw,
      64px
    );

  line-height: 1.02;
  font-weight: 500;
  letter-spacing: -0.035em;

  color: #211f1b;
}

.hero-description {
  max-width: 680px;
  margin: 18px auto 0;

  font-size: 14px;
  line-height: 1.8;

  color: #625b50;
}

.hero-facts {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  gap: 9px;
  margin-top: 24px;
}

.hero-facts span {
  padding: 8px 13px;

  border:
    1px solid
    rgba(154, 121, 66, 0.25);

  border-radius: 999px;

  background:
    rgba(255, 255, 255, 0.55);

  font-size: 10px;
  font-weight: 700;

  letter-spacing: 0.05em;

  color: #695333;
}


/* ================================================================
   CATEGORY NAVIGATION
================================================================ */

.category-navigation {
  margin: 26px 0 18px;
}

.category-scroll {
  display: flex;

  gap: 9px;

  overflow-x: auto;

  scrollbar-width: none;

  padding: 2px;
}

.category-scroll::-webkit-scrollbar {
  display: none;
}


/*
 * IMPORTANT:
 * These styles belong only to the Shop category navigation.
 * They do NOT touch ProductCard links.
 */

:global(.shop-page .category-chip) {
  flex: 0 0 auto;

  display: inline-flex;

  align-items: center;
  justify-content: center;

  border:
    1px solid
    #ddd4c7;

  background: #fffdf9;

  color: #625b51 !important;

  border-radius: 999px;

  padding: 10px 17px;

  font-family: inherit;

  font-size: 11px;

  font-weight: 600;

  text-decoration: none !important;

  cursor: pointer;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

:global(.shop-page .category-chip:visited) {
  color: #625b51 !important;
  text-decoration: none !important;
}

:global(.shop-page .category-chip:hover) {
  border-color: #b88b4a;

  background: #f8f1e6;

  color: #8a6634 !important;

  text-decoration: none !important;
}

:global(.shop-page .category-chip.active) {
  background: #2b2823;

  border-color: #2b2823;

  color: #fff !important;

  text-decoration: none !important;
}


/* ================================================================
   FILTER BAR
================================================================ */

.desktop-filter-bar {
  position: relative;
  top: auto;
  z-index: 2;

  display: grid;

  grid-template-columns:
    minmax(260px, 2fr)
    minmax(150px, 1fr)
    minmax(140px, 1fr)
    minmax(160px, 1fr);

  gap: 10px;

  padding: 10px;

  background:
    rgba(
      255,
      253,
      249,
      0.94
    );

  backdrop-filter:
    blur(18px);

  -webkit-backdrop-filter:
    blur(18px);

  border:
    1px solid
    #e5ddd1;

  border-radius: 18px;

  box-shadow:
    0 8px 30px
    rgba(
      52,
      42,
      29,
      0.05
    );
}

.search-control,
.select-control {
  min-width: 0;

  height: 46px;

  display: flex;
  align-items: center;

  border:
    1px solid
    #ded6ca;

  border-radius: 12px;

  background: #fff;
}

.search-control {
  position: relative;
}

.search-icon {
  padding-left: 14px;

  font-size: 19px;

  color: #8b7a64;
}

.search-control input {
  width: 100%;
  height: 100%;

  border: 0;
  outline: 0;

  padding:
    0 38px 0 10px;

  background:
    transparent;

  color: #2c2925;

  font-family: inherit;

  font-size: 12px;
}

.search-control input::placeholder {
  color: #9b9287;
}

.search-clear {
  position: absolute;

  right: 8px;

  width: 28px;
  height: 28px;

  border: 0;

  background: transparent;

  color: #887b6c;

  font-size: 20px;

  cursor: pointer;
}

.select-control select {
  width: 100%;
  height: 100%;

  border: 0;
  outline: 0;

  padding:
    0 13px;

  background: transparent;

  color: #3b3732;

  font-family: inherit;

  font-size: 11px;
  font-weight: 600;

  cursor: pointer;
}


/* ================================================================
   ACTIVE FILTERS
================================================================ */

.active-filter-row {
  display: flex;

  justify-content: space-between;
  align-items: center;

  gap: 15px;

  margin-top: 15px;

  padding: 12px 15px;

  border:
    1px solid
    #e8dfd2;

  border-radius: 13px;

  background: #fffdf9;
}

.active-filter-text {
  display: flex;

  flex-wrap: wrap;

  gap: 12px;

  color: #776e63;

  font-size: 11px;
}

.active-filter-text strong {
  color: #312d27;
}

.active-filter-row button {
  flex: 0 0 auto;

  border: 0;

  background: transparent;

  color: #9a7540;

  font-family: inherit;

  font-size: 11px;
  font-weight: 700;

  cursor: pointer;
}


/* ================================================================
   MOBILE FILTER
================================================================ */

.mobile-filter-trigger {
  display: none;
}


/* ================================================================
   PRODUCTS HEADING
================================================================ */

.products-heading {
  display: flex;

  justify-content: space-between;
  align-items: end;

  margin:
    35px 0 17px;
}

.products-heading h2 {
  margin: 0;

  font-family:
    "Cormorant Garamond",
    Georgia,
    serif;

  font-size:
    clamp(
      25px,
      3vw,
      34px
    );

  line-height: 1.1;

  font-weight: 500;

  letter-spacing: -0.025em;

  color: #26231f;
}

.products-heading p {
  margin: 7px 0 0;

  color: #857b6f;

  font-size: 11px;
}


/* ================================================================
   PRODUCT GRID

   IMPORTANT:
   ProductCard controls its own typography and appearance.
   Shop only controls the GRID layout.
================================================================ */

.products-grid {
  display: grid;

  grid-template-columns:
    repeat(
      4,
      minmax(0, 1fr)
    );

  gap: 20px;

  align-items: stretch;
}


/*
 * Only constrain the grid item width.
 *
 * DO NOT set:
 * .product-title
 * .lux-card
 * .card-content
 * .price
 * .product-material
 *
 * ProductCard owns those styles.
 */

:global(.shop-page .products-grid > *) {
  min-width: 0;
  width: 100%;
}


/* ================================================================
   EMPTY STATE
================================================================ */

.empty-state {
  min-height: 360px;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  text-align: center;

  border:
    1px solid
    #e6ded2;

  border-radius: 22px;

  background: #fffdf9;

  padding: 50px 20px;
}

.empty-icon {
  width: 52px;
  height: 52px;

  display: grid;

  place-items: center;

  margin-bottom: 18px;

  border:
    1px solid
    #d6c6ac;

  border-radius: 50%;

  color: #9a7942;

  font-size: 22px;
}

.empty-state h2 {
  margin: 0;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 30px;

  font-weight: 500;
}

.empty-state p {
  max-width: 420px;

  margin:
    10px auto 22px;

  color: #7b7368;

  font-size: 12px;

  line-height: 1.7;
}

.empty-state button {
  border:
    1px solid
    #2c2924;

  background: #2c2924;

  color: #fff;

  border-radius: 999px;

  padding:
    12px 22px;

  font-family: inherit;

  font-size: 11px;

  font-weight: 700;

  cursor: pointer;

  transition: 0.2s ease;
}

.empty-state button:hover {
  background: #9a7942;
  border-color: #9a7942;
}


/* ================================================================
   LOAD MORE
================================================================ */

.load-more-wrapper {
  display: flex;

  justify-content: center;
  align-items: center;

  width: 100%;

  margin:
    38px 0 20px;
}

.load-more-button {
  display: inline-flex !important;

  align-items: center;
  justify-content: center;

  width: auto !important;

  min-width: 220px;

  height: 48px;

  margin: 0;

  padding:
    0 28px !important;

  border:
    1px solid
    #c7a36b !important;

  border-radius:
    999px !important;

  background:
    #c7a36b !important;

  color:
    #fff !important;

  font-family: inherit !important;

  font-size:
    11px !important;

  font-weight: 700 !important;

  letter-spacing: 0.04em;

  cursor: pointer;

  appearance: none;

  -webkit-appearance: none;

  box-shadow: none;

  transition:
    background 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.load-more-button:hover {
  background:
    #b88e50 !important;

  border-color:
    #b88e50 !important;

  color:
    #fff !important;

  transform:
    translateY(-2px);

  box-shadow:
    0 8px 20px
    rgba(
      120,
      90,
      45,
      0.16
    );
}

.load-more-button:disabled {
  opacity: 0.55;

  cursor: wait;

  transform: none;

  box-shadow: none;
}

.load-more-skeleton {
  margin-top: 15px;
}


/* ================================================================
   CATEGORY DISCOVERY
================================================================ */

.category-discovery {
  width: 100%;

  margin-top: 78px;

  padding-top: 65px;

  border-top:
    1px solid
    #e3dacd;
}

.category-discovery-header {
  max-width: 720px;

  margin:
    0 auto 32px;

  text-align: center;
}

.category-discovery-header .section-eyebrow {
  margin-bottom: 10px;
}

.category-discovery-header h2 {
  margin: 0;

  font-family:
    "Cormorant Garamond",
    Georgia,
    serif;

  font-size:
    clamp(
      32px,
      4vw,
      46px
    );

  line-height: 1.08;

  font-weight: 500;

  letter-spacing: -0.03em;

  color: #26231f;
}

.category-discovery-header p:not(.section-eyebrow) {
  max-width: 620px;

  margin:
    14px auto 0;

  color: #71695f;

  font-size: 13px;

  line-height: 1.8;
}

.category-discovery-grid {
  width: 100%;

  display: grid;

  grid-template-columns:
    repeat(
      4,
      minmax(0, 1fr)
    );

  gap: 16px;
}


/* ================================================================
   CATEGORY DISCOVERY CARD
================================================================ */

/*
 * IMPORTANT:
 * Explicitly reset every anchor state so Chrome never
 * falls back to blue/underlined browser link styling.
 */

:global(.shop-page .category-discovery-card),
:global(.shop-page .category-discovery-card:visited),
:global(.shop-page .category-discovery-card:hover),
:global(.shop-page .category-discovery-card:active) {
  display: block;

  width: 100%;

  min-width: 0;

  overflow: hidden;

  box-sizing: border-box;

  border:
    1px solid
    #e1d8ca;

  border-radius: 20px;

  background: #fffdf9;

  color:
    #28241f !important;

  text-decoration:
    none !important;

  font-family: inherit;

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;
}

:global(.shop-page .category-discovery-card:hover) {
  transform:
    translateY(-4px);

  border-color:
    #c7a36b;

  box-shadow:
    0 14px 35px
    rgba(
      58,
      45,
      29,
      0.08
    );
}


/* ================================================================
   CATEGORY IMAGE
================================================================ */

.category-discovery-image {
  position: relative;

  width: 100%;

  aspect-ratio:
    1 / 1;

  overflow: hidden;

  background:
    #f3ede4;
}

.category-discovery-image img {
  display: block;

  width: 100%;
  height: 100%;

  max-width: none;

  object-fit: cover;

  object-position: center;

  border: 0;

  transition:
    transform 0.4s ease;
}

:global(
  .shop-page
  .category-discovery-card:hover
  .category-discovery-image
  img
) {
  transform:
    scale(1.04);
}


/* ================================================================
   CATEGORY CONTENT
================================================================ */

.category-discovery-content {
  display: block;

  padding:
    17px;

  background:
    #fffdf9;

  box-sizing:
    border-box;
}

.category-discovery-content span {
  display: block;

  margin:
    0 0 5px;

  color:
    #9a7942 !important;

  font-family:
    inherit;

  font-size: 8px;

  font-weight: 700;

  letter-spacing:
    0.16em;

  text-transform:
    uppercase;
}

.category-discovery-content h3 {
  margin: 0;

  padding: 0;

  font-family:
    "Cormorant Garamond",
    Georgia,
    serif;

  font-size: 23px;

  line-height: 1.1;

  font-weight: 500;

  letter-spacing: normal;

  color:
    #28241f !important;
}

.category-discovery-content strong {
  display: block;

  margin-top: 10px;

  color:
    #74572f !important;

  font-family:
    inherit;

  font-size: 10px;

  font-weight: 700;

  text-decoration:
    none !important;
}


/* ================================================================
   SEO / GEO INFORMATION
================================================================ */

.shop-information {
  margin-top: 85px;

  padding:
    70px 20px;

  border-top:
    1px solid
    #e3dacd;

  border-bottom:
    1px solid
    #e3dacd;
}

.shop-information-inner {
  max-width: 850px;

  margin: 0 auto;

  text-align: center;
}

.shop-information h2 {
  margin: 0;

  font-family:
    "Cormorant Garamond",
    Georgia,
    serif;

  font-size:
    clamp(
      29px,
      4vw,
      44px
    );

  font-weight: 500;

  line-height: 1.12;

  letter-spacing: -0.03em;
}

.shop-information p:not(.section-eyebrow) {
  margin:
    17px auto 0;

  max-width: 720px;

  color:
    #71695f;

  font-size: 13px;

  line-height: 1.85;
}

.shop-information-links {
  display: flex;

  justify-content: center;

  flex-wrap: wrap;

  gap: 10px;

  margin-top: 28px;
}


/*
 * THESE ARE THE BLUE LINKS IN YOUR SCREENSHOT.
 *
 * Explicitly style every state.
 */

:global(.shop-page .shop-information-links a),
:global(.shop-page .shop-information-links a:visited),
:global(.shop-page .shop-information-links a:hover),
:global(.shop-page .shop-information-links a:active) {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  padding:
    9px 13px;

  border:
    1px solid
    #ddd3c4;

  border-radius:
    999px;

  color:
    #5c4b34 !important;

  background:
    #fffdf9;

  text-decoration:
    none !important;

  font-size:
    10px;

  font-weight:
    700;

  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    color 0.2s ease;
}

:global(.shop-page .shop-information-links a:hover) {
  border-color:
    #a57d40;

  background:
    #f8f1e6;

  color:
    #74572f !important;
}


/* ================================================================
   FAQ
================================================================ */

.shop-faq {
  max-width: 950px;

  margin:
    85px auto 20px;
}

.faq-header {
  text-align: center;

  margin-bottom:
    28px;
}

.faq-header h2 {
  margin: 0;

  font-family:
    "Cormorant Garamond",
    Georgia,
    serif;

  font-size:
    clamp(
      30px,
      4vw,
      42px
    );

  font-weight: 500;
}

.faq-list {
  border-top:
    1px solid
    #ded5c8;
}

.faq-list details {
  border-bottom:
    1px solid
    #ded5c8;
}

.faq-list summary {
  position: relative;

  padding:
    20px 45px 20px 0;

  list-style: none;

  cursor: pointer;

  color:
    #302c27;

  font-family:
    "Cormorant Garamond",
    Georgia,
    serif;

  font-size:
    17px;
}

.faq-list summary::-webkit-details-marker {
  display: none;
}

.faq-list summary::after {
  content: "+";

  position: absolute;

  right: 4px;

  top: 17px;

  color:
    #9a7942;

  font-family:
    Arial,
    sans-serif;

  font-size:
    22px;
}

.faq-list details[open] summary::after {
  content: "−";
}

.faq-list details p {
  max-width: 850px;

  margin:
    -3px 0 20px;

  padding-right:
    35px;

  color:
    #746c62;

  font-size:
    12px;

  line-height:
    1.85;
}


/* ================================================================
   ACCESSIBILITY
================================================================ */

.sr-only {
  position: absolute;

  width: 1px;
  height: 1px;

  padding: 0;
  margin: -1px;

  overflow: hidden;

  clip:
    rect(
      0,
      0,
      0,
      0
    );

  white-space:
    nowrap;

  border: 0;
}


/* ================================================================
   MOBILE DRAWER
================================================================ */

.mobile-filter-overlay {
  display: none;
}


/* ================================================================
   TABLET
================================================================ */

@media (max-width: 1100px) {

  .products-grid {
    grid-template-columns:
      repeat(
        3,
        minmax(0, 1fr)
      );
  }

  .category-discovery-grid {
    grid-template-columns:
      repeat(
        2,
        minmax(0, 1fr)
      );
  }

  .desktop-filter-bar {
    grid-template-columns:
      minmax(220px, 2fr)
      minmax(140px, 1fr)
      minmax(130px, 1fr);
  }

}


/* ================================================================
   MOBILE
================================================================ */

@media (max-width: 700px) {

  .shop-container {
    width: 92%;

    padding-top: 10px;

    padding-bottom: 70px;
  }


  .shop-hero {
    min-height: 210px;

    border-radius: 21px;
  }


  .hero-content {
    width: 94%;

    padding:
      35px 10px;
  }


  .hero-eyebrow {
    font-size: 9px;

    letter-spacing:
      0.17em;
  }


  .shop-hero h1 {
    font-size: 37px;

    line-height:
      1.02;
  }


  .hero-description {
    margin-top:
      14px;

    font-size:
      11px;

    line-height:
      1.65;
  }


  .hero-facts {
    gap: 6px;

    margin-top:
      18px;
  }


  .hero-facts span {
    padding:
      7px 9px;

    font-size:
      8px;
  }


  .category-navigation {
    margin:
      18px 0 12px;

    margin-left:
      -4%;

    margin-right:
      -4%;

    padding-left:
      4%;

    padding-right:
      4%;
  }


  :global(.shop-page .category-chip) {
    padding:
      9px 13px;

    font-size:
      10px;
  }


  .desktop-filter-bar {
    display: none;
  }


  .mobile-filter-trigger {
    display: block;

    position: sticky;

    top: 60px;

    z-index: 19;

    margin-top:
      10px;
  }


  .mobile-filter-trigger button {
    width: 100%;

    height: 44px;

    display: flex;

    align-items: center;

    justify-content: center;

    gap: 8px;

    border:
      1px solid
      #ded5c8;

    border-radius:
      12px;

    background:
      rgba(
        255,
        253,
        249,
        0.96
      );

    backdrop-filter:
      blur(14px);

    color:
      #37322b;

    font-family:
      inherit;

    font-size:
      11px;

    font-weight:
      700;

    box-shadow:
      0 5px 20px
      rgba(
        50,
        40,
        28,
        0.05
      );
  }


  .filter-dot {
    width: 6px;
    height: 6px;

    border-radius: 50%;

    background:
      #9a7942;
  }


  .active-filter-row {
    align-items:
      flex-start;

    flex-direction:
      column;

    gap: 8px;

    margin-top:
      10px;
  }


  .active-filter-text {
    gap:
      7px 10px;
  }


  .products-heading {
    margin-top:
      28px;

    margin-bottom:
      14px;
  }


  .products-heading h2 {
    font-size:
      25px;
  }


  .products-heading p {
    font-size:
      10px;
  }


  /*
   * ProductCard itself is untouched.
   * Only Shop grid changes from 4 to 2 columns.
   */

  .products-grid {
    grid-template-columns:
      repeat(
        2,
        minmax(0, 1fr)
      );

    gap:
      11px;
  }


  .load-more-wrapper {
    margin:
      30px 0 10px;
  }


  .load-more-button {
    min-width:
      200px;

    height:
      45px;

    padding:
      0 22px !important;

    font-size:
      10px !important;
  }


  .category-discovery {
    margin-top:
      50px;

    padding-top:
      42px;
  }


  .category-discovery-header {
    margin:
      0 0 22px;

    text-align:
      left;
  }


  .category-discovery-header h2 {
    font-size:
      30px;

    line-height:
      1.05;
  }


  .category-discovery-header p:not(.section-eyebrow) {
    margin-top:
      10px;

    font-size:
      11px;

    line-height:
      1.65;
  }


  .category-discovery-grid {
    grid-template-columns:
      repeat(
        2,
        minmax(0, 1fr)
      );

    gap:
      10px;
  }


  :global(.shop-page .category-discovery-card) {
    border-radius:
      14px;
  }


  .category-discovery-image {
    aspect-ratio:
      1 / 1;

    overflow:
      hidden;
  }


  .category-discovery-content {
    padding:
      11px 12px 13px;
  }


  .category-discovery-content h3 {
    font-size:
      18px;
  }


  .category-discovery-content strong {
    margin-top:
      7px;

    font-size:
      9px;
  }


  .empty-state {
    min-height:
      300px;

    border-radius:
      17px;

    padding:
      35px 18px;
  }


  .empty-state h2 {
    font-size:
      26px;
  }


  .shop-information {
    margin-top:
      60px;

    padding:
      55px 5px;
  }


  .shop-information h2 {
    font-size:
      30px;
  }


  .shop-information p:not(.section-eyebrow) {
    font-size:
      11px;

    line-height:
      1.8;
  }


  .shop-information-links {
    gap:
      7px;
  }


  :global(.shop-page .shop-information-links a) {
    padding:
      8px 10px;

    font-size:
      8px;
  }


  .shop-faq {
    margin-top:
      60px;
  }


  .faq-list summary {
    padding:
      18px 35px 18px 0;

    font-size:
      15px;
  }


  .faq-list details p {
    font-size:
      11px;
  }


  /* ------------------------------------------------------------
     MOBILE DRAWER
  ------------------------------------------------------------ */

  .mobile-filter-overlay {
    display: flex;

    position: fixed;

    inset: 0;

    z-index:
      1000;

    align-items:
      flex-end;

    background:
      rgba(
        25,
        22,
        18,
        0.42
      );
  }


  .mobile-filter-drawer {
    width: 100%;

    max-height:
      88vh;

    overflow-y:
      auto;

    padding:
      22px 18px 26px;

    border-radius:
      22px 22px 0 0;

    background:
      #fffdf9;

    box-shadow:
      0 -15px 50px
      rgba(
        20,
        16,
        10,
        0.18
      );
  }


  .drawer-header {
    display: flex;

    align-items:
      flex-start;

    justify-content:
      space-between;

    margin-bottom:
      20px;
  }


  .drawer-header h2 {
    margin: 0;

    font-family:
      Georgia,
      "Times New Roman",
      serif;

    font-size:
      27px;

    font-weight:
      500;
  }


  .drawer-header button {
    width: 34px;
    height: 34px;

    border:
      1px solid
      #ddd4c8;

    border-radius:
      50%;

    background:
      #fff;

    color:
      #443d34;

    font-size:
      21px;
  }


  .drawer-search {
    display: grid;

    grid-template-columns:
      1fr auto;

    gap:
      8px;

    margin-bottom:
      17px;
  }


  .drawer-search input {
    min-width:
      0;

    height:
      46px;

    border:
      1px solid
      #ddd4c8;

    border-radius:
      11px;

    padding:
      0 12px;

    outline:
      0;

    font-family:
      inherit;

    font-size:
      12px;
  }


  .drawer-search button {
    border:
      0;

    border-radius:
      11px;

    padding:
      0 17px;

    background:
      #2c2924;

    color:
      #fff;

    font-family:
      inherit;

    font-size:
      11px;

    font-weight:
      700;
  }


  .drawer-field {
    margin-bottom:
      15px;
  }


  .drawer-field label {
    display:
      block;

    margin-bottom:
      7px;

    color:
      #6e655a;

    font-size:
      10px;

    font-weight:
      700;

    text-transform:
      uppercase;

    letter-spacing:
      0.08em;
  }


  .drawer-field select {
    width:
      100%;

    height:
      47px;

    border:
      1px solid
      #ddd4c8;

    border-radius:
      11px;

    padding:
      0 12px;

    background:
      #fff;

    color:
      #332f2a;

    font-family:
      inherit;

    font-size:
      12px;
  }


  .drawer-actions {
    display:
      grid;

    grid-template-columns:
      1fr 1.5fr;

    gap:
      9px;

    margin-top:
      23px;
  }


  .drawer-actions button {
    height:
      47px;

    border-radius:
      12px;

    font-family:
      inherit;

    font-size:
      11px;

    font-weight:
      700;
  }


  .drawer-clear {
    border:
      1px solid
      #d8cfc2;

    background:
      #fff;

    color:
      #665d53;
  }


  .drawer-apply {
    border:
      1px solid
      #2c2924;

    background:
      #2c2924;

    color:
      #fff;
  }

}


/* ================================================================
   VERY SMALL MOBILE
================================================================ */

@media (max-width: 380px) {

  .shop-hero h1 {
    font-size:
      33px;
  }


  .hero-facts span {
    font-size:
      7px;

    padding:
      6px 8px;
  }


  .products-grid {
    gap:
      8px;
  }


  .category-discovery-grid {
    gap:
      8px;
  }


  .category-discovery-content {
    padding:
      10px;
  }


  .category-discovery-content h3 {
    font-size:
      17px;
  }

}

`}</style>

    </>
  );
}


/* ============================================================================
   SERVER SIDE RENDERING
============================================================================ */

/*
 * This is the important SEO/GEO improvement.
 *
 * The first 12 products are now present in the HTML generated by Next.js.
 *
 * Google / Bing / AI crawlers don't have to wait for browser JavaScript
 * before discovering the product catalogue.
 */

export async function getServerSideProps({
  query,
}) {

  try {

    const category =
      getQueryValue(
        query?.category
      );

    const maxPrice =
      getQueryValue(
        query?.maxPrice
      );

    const search =
      getQueryValue(
        query?.search
      );

    const sort =
      getQueryValue(
        query?.sort
      );


    /* ------------------------------------------------------------------------
       PRODUCT REQUEST
    ------------------------------------------------------------------------ */

    const productParams =
      new URLSearchParams();


    productParams.set(
      "page",
      "1"
    );


    productParams.set(
      "limit",
      "12"
    );


    if (category) {

      productParams.set(
        "category",
        category
      );
    }


    if (maxPrice) {

      productParams.set(
        "maxPrice",
        maxPrice
      );
    }


    if (search) {

      productParams.set(
        "search",
        search
      );
    }


    if (sort) {

      productParams.set(
        "sort",
        sort
      );
    }


    /* ------------------------------------------------------------------------
       FETCH PRODUCTS + CATEGORIES
    ------------------------------------------------------------------------ */

    const [
      productsResponse,
      categoriesResponse,
    ] = await Promise.all([

      fetch(
        `${BACKEND_URL}/api/products/paginated?${productParams.toString()}`
      ),

      fetch(
        `${BACKEND_URL}/api/categories`
      ),

    ]);


    /* ------------------------------------------------------------------------
       PRODUCT DATA
    ------------------------------------------------------------------------ */

    let productsData = {};

    if (productsResponse.ok) {

      productsData =
        await productsResponse.json();

    } else {

      console.error(
        "Shop SSR product API failed:",
        productsResponse.status
      );

    }


    /* ------------------------------------------------------------------------
       CATEGORY DATA
    ------------------------------------------------------------------------ */

    let categoriesRaw = [];

    if (categoriesResponse.ok) {

      categoriesRaw =
        await categoriesResponse.json();

    } else {

      console.error(
        "Shop SSR category API failed:",
        categoriesResponse.status
      );

    }


    const initialProducts =
      Array.isArray(
        productsData.products
      )
        ? productsData.products
        : [];


    const initialHasMore =
      Boolean(
        productsData.hasMore
      );


    const categories =
      Array.isArray(
        categoriesRaw
      )
        ? categoriesRaw
          .map(
            categoryItem =>
              typeof categoryItem === "string"
                ? categoryItem
                : categoryItem?.name
          )
          .filter(Boolean)
        : Array.isArray(
          categoriesRaw?.categories
        )
          ? categoriesRaw.categories
            .map(
              categoryItem =>
                typeof categoryItem === "string"
                  ? categoryItem
                  : categoryItem?.name
            )
            .filter(Boolean)
          : [];


    return {

      props: {

        initialProducts,

        initialHasMore,

        categories,

      },

    };


  } catch (error) {

    console.error(
      "Shop SSR error:",
      error
    );


    return {

      props: {

        initialProducts: [],

        initialHasMore: false,

        categories: [],

      },

    };

  }

}