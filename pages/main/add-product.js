import { useState, useEffect, useMemo } from "react";
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
  const [silverRate, setSilverRate] = useState(null);

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    subtitle: "",
    emotion: "Protection",
    category: "",
    description: "",
    benefits: "",
    grams: "",
    labourPerGram: "",
    mrp: "",
    stock: "",

    // 🔥 NEW SEO FIELDS
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",

    isActive: true
  });

  /* ---------------- FETCH CATEGORIES ---------------- */

  useEffect(() => {
    fetch("https://sivaahbackend.onrender.com/api/categories")
      .then(res => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  /* ---------------- FETCH SILVER RATE ---------------- */

  useEffect(() => {
    fetch("https://sivaahbackend.onrender.com/api/rate")
      .then(res => res.json())
      .then(data => setSilverRate(data.rate))
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

  /* ---------------- AUTO PRICE CALCULATION ---------------- */

  const calculatedPrice = useMemo(() => {
    if (!silverRate || !form.grams || !form.labourPerGram) return "";

    const grams = Number(form.grams);
    const labour = Number(form.labourPerGram);

    return Math.round(
      grams * silverRate +
      grams * labour
    );
  }, [silverRate, form.grams, form.labourPerGram]);

  /* ---------------- IMAGE HANDLER ---------------- */

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

    const res = await fetch("https://sivaahbackend.onrender.com/api/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
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
      !form.stock ||
      !form.category ||
      !form.grams ||
      !form.labourPerGram ||
      !calculatedPrice ||
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

        slug: generateSlug(form.name),

        benefits: form.benefits
          .split(",")
          .map(b => b.trim())
          .filter(Boolean),

        grams: Number(form.grams),
        labourPerGram: Number(form.labourPerGram),

        price: calculatedPrice,
        mrp: Number(form.mrp),
        stock: Number(form.stock),

        images: imageUrls,

        // 🔥 SEND SEO DATA
        seo: {
          title: form.seoTitle,
          description: form.seoDescription,
          keywords: form.seoKeywords
        }
      };

      const res = await fetch(
        "https://sivaahbackend.onrender.com/api/products",
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

      {!silverRate && (
        <p className="text-danger">⚠️ Silver rate not loaded yet.</p>
      )}

      <input className="form-control mb-2" placeholder="Name *" name="name" onChange={handleChange} />
      <input className="form-control mb-2" placeholder="Subtitle" name="subtitle" onChange={handleChange} />

      <select className="form-control mb-2" name="category" value={form.category} onChange={handleChange}>
        <option value="">Select Category *</option>
        {categories.map(cat => (
          <option key={cat._id} value={cat.name}>{cat.name}</option>
        ))}
      </select>

      <select className="form-control mb-2" name="emotion" value={form.emotion} onChange={handleChange}>
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

      <input className="form-control mb-2" name="grams" placeholder="Weight (grams)" type="number" onChange={handleChange} />
      <input className="form-control mb-2" name="labourPerGram" placeholder="Labour ₹ per gram" type="number" onChange={handleChange} />

      <div className="alert alert-light border fw-semibold">
        Price (Auto): ₹ {calculatedPrice || "—"}
      </div>

      <textarea className="form-control mb-2" placeholder="Description" name="description" onChange={handleChange} />
      <textarea className="form-control mb-2" placeholder="Benefits (comma separated)" name="benefits" onChange={handleChange} />

      <input className="form-control mb-2" placeholder="MRP" name="mrp" type="number" onChange={handleChange} />
      <input className="form-control mb-3" placeholder="Stock *" name="stock" type="number" onChange={handleChange} />

      {/* 🔥 SEO SECTION */}
      <hr />
      <h5>SEO Settings (for Google Ranking)</h5>

      <input className="form-control mb-2" placeholder="SEO Title (Google Title)" name="seoTitle" onChange={handleChange} />
      <textarea className="form-control mb-2" placeholder="SEO Description (Google Description)" name="seoDescription" onChange={handleChange} />
      <input className="form-control mb-3" placeholder="SEO Keywords (comma separated)" name="seoKeywords" onChange={handleChange} />

      <input type="file" className="form-control mb-3" multiple accept="image/*" onChange={handleImages} />

      {preview.length > 0 && (
        <div className="d-flex gap-2 flex-wrap mb-3">
          {preview.map((src, i) => (
            <img key={i} src={src} alt="preview" width="80" height="80" style={{ objectFit: "cover", borderRadius: 6 }} />
          ))}
        </div>
      )}

      <button className="btn btn-dark w-100" onClick={submitProduct} disabled={loading}>
        {loading ? "Uploading..." : "Add Product"}
      </button>
    </div>
  );
}
