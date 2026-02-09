import { useEffect, useState } from "react";

export default function UpdateRate() {
  const token = localStorage.getItem("token");

  const [rate, setRate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://sivaahbackend.onrender.com/api/rate")
      .then(r => r.json())
      .then(data => {
        if (data?.ratePerGram) {
          setRate(data.ratePerGram);
        }
      });
  }, []);

  const updateRate = async () => {
    setLoading(true);

    await fetch("https://sivaahbackend.onrender.com/api/rate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        ratePerGram: Number(rate)
      })
    });

    alert("✅ Rate Updated!");
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <h1>Update Silver Rate</h1>

      <input
        type="number"
        className="form-control mb-3"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
        placeholder="₹ per gram"
      />

      <button
        className="btn btn-dark"
        onClick={updateRate}
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Rate"}
      </button>
    </div>
  );
}
