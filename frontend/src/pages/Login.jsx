import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Login() {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
  try {
    const res = await api.post("/users/login", {
      mobile,
      password,
    });

    const user = res.data;   // ✅ FIXED HERE

    localStorage.setItem("user", JSON.stringify(user));

    if (user.role === "ADMIN") {
      navigate("/admin/dashboard");
    } else if (user.role === "WORKER") {
      navigate("/worker/dashboard");
    } else {
      navigate("/profile");
    }

  } catch (err) {
    alert("Invalid credentials");
  }
};


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <input
        className="border p-2 mb-3 w-full"
        placeholder="Mobile"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />

      <input
        type="password"
        className="border p-2 mb-3 w-full"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Login
      </button>
    </div>
  );
}
