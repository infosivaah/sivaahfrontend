import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function UpdateRate() {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [token, setToken] = useState(null);

  const [rate, setRate] = useState("");
  const [loading, setLoading] = useState(false);

  /* =====================
     CLIENT ONLY INIT
  ===================== */

  useEffect(() => {
    setMounted(true);

    const t = localStorage.getItem("token");

    if (!t) {
      router.replace("/main/login");
      return;
    }

    setToken(t);
  }, []);

  /* =====================
     FETCH CURRENT RATE
  ===================== */

  useEffect(() => {
    if (!mounted) return;

    fetch("https://sivaahbackend.onrender.com/api/rate")
      .then(r => r.json())
      .then(data => {
        if (data?.rate) {
          setRate(data.rate);
        }
      })
      .catch(console.error);
  }, [mounted]);

  /* =====================
     UPDATE RATE
  ===================== */

  const updateRate = async () => {
    if (!rate) return alert("Enter rate");

    setLoading(true);

    try {
      const res = await fetch(
        "https://sivaahbackend.onrender.com/api/rate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            ratePerGram: Number(rate)
          })
        }
      );

      if (!res.ok) throw new Error("Failed");

      alert("✅ Rate Updated Successfully!");
    } catch (err) {
      alert("❌ Error updating rate");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* =====================
     BLOCK SSR RENDER
  ===================== */

  if (!mounted) return null;

  return (
    <div className="container mt-5" style={{ maxWidth: 500 }}>
      <h1 className="fw-semibold mb-3">
        Update Silver Rate
      </h1>

      <p className="text-muted mb-3">
        Current global rate applied to all products.
      </p>

      <input
        type="number"
        className="form-control mb-3"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
        placeholder="₹ per gram"
      />

      <button
        className="btn btn-dark w-100"
        onClick={updateRate}
        disabled={loading}
      >
        {loading ? "Updating…" : "Update Rate"}
      </button>
    </div>
  );
}
