import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    subtitle: "",
    emotion: "Protection",
    description: "",
    benefits: "",
    price: "",
    mrp: "",
    stock: "",
    isActive: true
  });

  /* ---------------- FETCH PRODUCT ---------------- */
  useEffect(() => {
    if (!router.isReady || !id || !token) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (!res.ok) throw new Error("Fetch failed");

        const data = await res.json();

        setForm({
          name: data.name || "",
          slug: data.slug || "",
          subtitle: data.subtitle || "",
          emotion: data.emotion || "Protection",
          description: data.description || "",
          benefits: Array.isArray(data.benefits)
            ? data.benefits.join(", ")
            : "",
          price: data.price || "",
          mrp: data.mrp || "",
          stock: data.stock || "",
          isActive: data.isActive ?? true
        });

        setFetching(false);
      } catch (err) {
        console.error(err);
        alert("❌ Failed to load product");
        router.push("/main/products");
      }
    };

    fetchProduct();
  }, [router.isReady, id, token]);

  /* ---------------- HANDLE CHANGE ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  /* ---------------- UPDATE PRODUCT ---------------- */
  const updateProduct = async () => {
    setLoading(true);

    try {
      const payload = {
        ...form,
        benefits: form.benefits
          .split(",")
          .map(b => b.trim())
          .filter(Boolean),
        price: Number(form.price),
        mrp: Number(form.mrp),
        stock: Number(form.stock)
      };

      const res = await fetch(
        `http://localhost:5000/api/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        }
      );

      if (!res.ok) throw new Error("Update failed");

      alert("✅ Product Updated");
      router.push("/main/products");
    } catch (err) {
      alert("❌ Update failed");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  if (fetching) {
    return (
      <div className="container mt-5 text-center">
        <p>Loading product...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1>Edit Product</h1>

      <input
        className="form-control mb-2"
        name="name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        className="form-control mb-2"
        name="slug"
        value={form.slug}
        onChange={handleChange}
      />

      <input
        className="form-control mb-2"
        name="subtitle"
        value={form.subtitle}
        onChange={handleChange}
      />

      <select
        className="form-control mb-2"
        name="emotion"
        value={form.emotion}
        onChange={handleChange}
      >
        <option value="Protection">Protection</option>
        <option value="Strength">Strength</option>
        <option value="Abundance">Abundance</option>
        <option value="Balance">Balance</option>
        <option value="Healing">Healing</option>
      </select>

      <textarea
        className="form-control mb-2"
        name="description"
        value={form.description}
        onChange={handleChange}
      />

      <textarea
        className="form-control mb-2"
        name="benefits"
        value={form.benefits}
        onChange={handleChange}
      />

      <input
        className="form-control mb-2"
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
      />

      <input
        className="form-control mb-2"
        name="mrp"
        type="number"
        value={form.mrp}
        onChange={handleChange}
      />

      <input
        className="form-control mb-3"
        name="stock"
        type="number"
        value={form.stock}
        onChange={handleChange}
      />

      <button
        className="btn btn-dark w-100"
        onClick={updateProduct}
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Product"}
      </button>
    </div>
  );
}
