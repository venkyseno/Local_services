import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Withdraw() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleWithdraw = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post(`/wallet/${user.id}/withdraw`, {
        amount: Number(amount),
      });
      alert("Withdrawal requested. ID: " + res.data.id);
      setAmount("");
      navigate("/profile/wallet");
    } catch (err) {
      alert(err.response?.data || "Withdrawal failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Withdraw Cashback</h2>
      <p className="text-sm text-gray-500">Minimum withdrawal: ₹500</p>

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-3 rounded-lg w-full"
      />

      <button
        onClick={handleWithdraw}
        disabled={loading || !amount}
        className="w-full bg-black text-white py-3 rounded-xl disabled:opacity-50"
      >
        {loading ? "Requesting..." : "Withdraw"}
      </button>
    </div>
  );
}
