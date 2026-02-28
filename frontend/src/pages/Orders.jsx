import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const STATUS_COLORS = {
  CREATED: "bg-gray-100 text-gray-600",
  ASSIGNED: "bg-blue-100 text-blue-700",
  IN_PROGRESS: "bg-yellow-100 text-yellow-700",
  CLOSED: "bg-green-100 text-green-700",
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/cases/user/${user.id}`);
      // Backend returns SuccessResponse: { success: true, data: [...] }
      setOrders(res.data?.data ?? []);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">My Orders</h1>

      {loading && <p className="text-gray-400">Loading...</p>}

      {!loading && orders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No orders yet.</p>
          <button
            onClick={() => navigate("/")}
            className="bg-black text-white px-6 py-2 rounded-xl"
          >
            Book a Service
          </button>
        </div>
      )}

      {orders.map((order) => (
        <div key={order.id} className="bg-white rounded-xl shadow p-4 mb-3">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold">Order #{order.id}</p>
              <p className="text-sm text-gray-500 mt-1">{order.description}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_COLORS[order.status] || ""}`}>
              {order.status}
            </span>
          </div>
          {order.serviceAmount && (
            <p className="text-sm text-gray-600 mt-2">Amount: ₹{order.serviceAmount}</p>
          )}
          {order.attachmentName && (
            <p className="text-xs text-gray-500 mt-2">Attachment: {order.attachmentName}</p>
          )}
          {order.attachmentDataUrl && (
            <img
              src={order.attachmentDataUrl}
              alt="Issue attachment"
              className="mt-2 w-full h-36 object-cover rounded-lg border"
            />
          )}
        </div>
      ))}
    </div>
  );
}