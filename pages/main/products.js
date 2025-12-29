import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  useEffect(() => {
    if (!token) router.push("/admin/login");

    fetch("https://sivaahbackend.onrender.com/api/products", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setProducts);
  }, []);

  const deleteProduct = async (id) => {
    await fetch(`https://sivaahbackend.onrender.com/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setProducts(products.filter(p => p._id !== id));
  };

  return (
    <div className="container mt-5">
        <button
  className="btn btn-dark mb-4"
  onClick={() => router.push("/main/add-product")}
>
  + Add Product
</button>
      <h1>Manage Products</h1>

   {products.map(p => (
  <div
    key={p._id}
    className="border p-3 mb-3 d-flex justify-content-between align-items-center"
  >
    <div>
      <h5 className="mb-1">{p.name}</h5>
      <p className="mb-0">₹{p.price}</p>
    </div>

    <div className="d-flex gap-2">
      <button
        className="btn btn-outline-dark btn-sm"
        onClick={() => router.push(`/main/edit-product/${p._id}`)}
      >
        Edit
      </button>

      <button
        className="btn btn-danger btn-sm"
        onClick={() => deleteProduct(p._id)}
      >
        Delete
      </button>
    </div>
  </div>
))}

    </div>
  );
}
