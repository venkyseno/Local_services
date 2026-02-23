import { useEffect, useState } from "react";
import api from "../api/api";

export default function AdminDashboard() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  const admin = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/withdrawals?status=PENDING");
      setWithdrawals(res.data);
    } catch (err) {
      console.error("Failed to fetch withdrawals", err);
    } finally {
      setLoading(false);
    }
  };

  const approve = async (id) => {
    await api.post(`/admin/withdrawals/${id}/approve?adminId=${admin?.id}`);
    fetchPending();
  };

  const reject = async (id) => {
    const reason = prompt("Enter rejection reason:");
    if (!reason) return;
    await api.post(`/admin/withdrawals/${id}/reject?adminId=${admin?.id}`, { reason });
    fetchPending();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <h2 className="text-lg font-semibold mb-3">Pending Withdrawals</h2>

      {loading && <p className="text-gray-400">Loading...</p>}

      {!loading && withdrawals.length === 0 && (
        <p className="text-gray-500">No pending withdrawals.</p>
      )}

      {withdrawals.map((w) => (
        <div key={w.id} className="border p-4 mb-3 rounded-xl shadow-sm bg-white">
          <p><span className="text-gray-500">User ID:</span> {w.userId}</p>
          <p><span className="text-gray-500">Amount:</span> ₹{w.amount}</p>
          <p><span className="text-gray-500">Status:</span> {w.status}</p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => approve(w.id)}
              className="bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm"
            >
              Approve
            </button>
            <button
              onClick={() => reject(w.id)}
              className="bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
