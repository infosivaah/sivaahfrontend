import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import imageCompression from "browser-image-compression";

export default function AddProduct() {
  const router = useRouter();

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  useEffect(() => {
    if (!token) router.push("/main/login");
  }, [token]);

  /* ---------------- STATES ---------------- */

  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    subtitle: "",
    emotion: "Protection",
    category: "",          // ✅ category NAME
    description: "",
    benefits: "",
    price: "",
    mrp: "",
    stock: "",
    isActive: true
  });

  /* ---------------- FETCH CATEGORIES ---------------- */

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then(res => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  /* ---------------- HELPERS ---------------- */

  const generateSlug = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  /* ---------------- SMART IMAGE HANDLER ---------------- */

  const handleImages = async (e) => {
    const files = Array.from(e.target.files);
    const processed = [];

    for (const file of files) {
      if (file.size <= 8 * 1024 * 1024) {
        processed.push(file);
        continue;
      }

      const compressed = await imageCompression(file, {
        maxSizeMB: 6,
        maxWidthOrHeight: 2500,
        initialQuality: 0.9,
        useWebWorker: true
      });

      processed.push(compressed);
    }

    setImages(processed);
    setPreview(processed.map(img => URL.createObjectURL(img)));
  };

  /* ---------------- IMAGE UPLOAD ---------------- */

  const uploadImagesToServer = async () => {
    const formData = new FormData();
    images.forEach(img => formData.append("images", img));

    const res = await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    if (!res.ok) throw new Error("Image upload failed");

    const data = await res.json();
    return data.urls;
  };

  /* ---------------- SUBMIT ---------------- */

  const submitProduct = async () => {
    if (
      !form.name ||
      !form.price ||
      !form.stock ||
      !form.category ||
      images.length === 0
    ) {
      alert("❌ Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const imageUrls = await uploadImagesToServer();

      const payload = {
        ...form,
        slug: generateSlug(form.name), // ✅ AUTO SLUG
        benefits: form.benefits
          .split(",")
          .map(b => b.trim())
          .filter(Boolean),
        price: Number(form.price),
        mrp: Number(form.mrp),
        stock: Number(form.stock),
        images: imageUrls
      };

      const res = await fetch(
        "http://localhost:5000/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        }
      );

      if (!res.ok) throw new Error("Product save failed");

      alert("✅ Product Added Successfully");
      router.push("/main/products");
    } catch (err) {
      console.error(err);
      alert("❌ Error adding product");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="container mt-5">
      <h1>Add Product</h1>

      <input
        className="form-control mb-2"
        placeholder="Name *"
        name="name"
        onChange={handleChange}
      />

      <input
        className="form-control mb-2"
        placeholder="Subtitle"
        name="subtitle"
        onChange={handleChange}
      />

      {/* CATEGORY (NAME STORED) */}
      <select
        className="form-control mb-2"
        name="category"
        value={form.category}
        onChange={handleChange}
      >
        <option value="">Select Category *</option>
        {categories.map(cat => (
          <option key={cat._id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>

      <select
        className="form-control mb-2"
        name="emotion"
        onChange={handleChange}
      >
        <option>Protection</option>
        <option>Strength</option>
        <option>Abundance</option>
        <option>Balance</option>
        <option>Healing</option>
        <option>Love</option>
        <option>Peace</option>
        <option>Focus</option>
        <option>Grounding</option>
        <option>Good Luck</option>
        <option>Care</option>
      </select>

      <textarea
        className="form-control mb-2"
        placeholder="Description"
        name="description"
        onChange={handleChange}
      />

      <textarea
        className="form-control mb-2"
        placeholder="Benefits (comma separated)"
        name="benefits"
        onChange={handleChange}
      />

      <input
        className="form-control mb-2"
        placeholder="Price *"
        name="price"
        type="number"
        onChange={handleChange}
      />

      <input
        className="form-control mb-2"
        placeholder="MRP"
        name="mrp"
        type="number"
        onChange={handleChange}
      />

      <input
        className="form-control mb-3"
        placeholder="Stock *"
        name="stock"
        type="number"
        onChange={handleChange}
      />

      <input
        type="file"
        className="form-control mb-3"
        multiple
        accept="image/*"
        onChange={handleImages}
      />

      {preview.length > 0 && (
        <div className="d-flex gap-2 flex-wrap mb-3">
          {preview.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="preview"
              width="80"
              height="80"
              style={{ objectFit: "cover", borderRadius: 6 }}
            />
          ))}
        </div>
      )}

      <button
        className="btn btn-dark w-100"
        onClick={submitProduct}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Add Product"}
      </button>
    </div>
  );
}
