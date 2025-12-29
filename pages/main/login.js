import { useState } from "react";
import { useRouter } from "next/router";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const login = async () => {
    const res = await fetch("http://localhost:5000/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      router.push("/main/products");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Admin Login</h1>

      <input
        className="form-control mb-3"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="form-control mb-3"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button className="btn btn-dark" onClick={login}>
        Login
      </button>
    </div>
  );
}
