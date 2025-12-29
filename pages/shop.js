import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import ProductCard from "../components/ProductCard";

export default function ShopPage() {
  const router = useRouter();
  const { category, maxPrice, search, sort } = router.query;

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH DATA ---------------- */

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5000/api/products").then(r => r.json()),
      fetch("http://localhost:5000/api/categories").then(r => r.json())
    ])
      .then(([productsData, categoriesData]) => {
        setProducts(productsData);
        setCategories(categoriesData.map(c => c.name));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  /* ---------------- FILTER LOGIC ---------------- */

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (category) {
      list = list.filter(
        p =>
          p.category &&
          p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (maxPrice) {
      list = list.filter(
        p => Number(p.price) <= Number(maxPrice)
      );
    }

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q)
      );
    }

    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "name-asc") list.sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [products, category, maxPrice, search, sort]);

  /* ---------------- HELPERS ---------------- */

  const updateQuery = (key, value) => {
    const params = new URLSearchParams(router.query);
    if (!value) params.delete(key);
    else params.set(key, value);
    router.push(`/shop?${params.toString()}`);
  };

  /* ---------------- UI ---------------- */

  if (loading) {
    return <p className="text-center mt-5">Loading shop...</p>;
  }

  return (
    <>
      <h1 className="mb-3 fw-semibold">Shop Jewellery</h1>

      {/* FILTER BAR */}
      <div
        className="p-3 rounded mb-4"
        style={{
          background: "#faf7f2",
          position: "sticky",
          top: 70,
          zIndex: 5
        }}
      >
        <div className="row g-2 align-items-center">
          {/* SEARCH */}
          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Search jewellery..."
              defaultValue={search || ""}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateQuery("search", e.target.value);
                }
              }}
            />
          </div>

          {/* CATEGORY */}
          <div className="col-md-3">
            <select
              className="form-control"
              value={category || ""}
              onChange={(e) =>
                updateQuery("category", e.target.value)
              }
            >
              <option value="">All Categories</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* PRICE */}
          <div className="col-md-2">
            <select
              className="form-control"
              value={maxPrice || ""}
              onChange={(e) =>
                updateQuery("maxPrice", e.target.value)
              }
            >
              <option value="">Any Price</option>
              <option value="999">Under ₹999</option>
              <option value="1999">Under ₹1999</option>
              <option value="2999">Under ₹2999</option>
            </select>
          </div>

          {/* SORT */}
          <div className="col-md-2">
            <select
              className="form-control"
              value={sort || ""}
              onChange={(e) =>
                updateQuery("sort", e.target.value)
              }
            >
              <option value="">Sort</option>
              <option value="price-asc">Price ↑</option>
              <option value="price-desc">Price ↓</option>
              <option value="name-asc">Name A–Z</option>
            </select>
          </div>

          {/* CLEAR */}
          <div className="col-md-1">
            <button
              className="btn btn-outline-dark w-100"
              onClick={() => router.push("/shop")}
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      {/* CATEGORY CHIPS */}
      <div className="d-flex gap-2 flex-wrap mb-4">
        {categories.map((cat, i) => (
          <button
            key={i}
            className={`btn btn-sm ${
              category === cat
                ? "btn-dark"
                : "btn-outline-dark"
            }`}
            onClick={() =>
              updateQuery("category", category === cat ? "" : cat)
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="row g-4">
          {filteredProducts.map(product => (
            <div key={product._id} className="col-6 col-md-3">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
