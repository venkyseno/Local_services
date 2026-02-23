import { useParams, useNavigate } from "react-router-dom";
import { services } from "../data/Services";
import { useState } from "react";
import api from "../api/api";

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const service = services.find((s) => s.id === Number(id));

  if (!service) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">Service not found</h2>
      </div>
    );
  }

  const handleBook = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user) {
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/cases", {
        serviceId: service.id,
        description: service.name,
        customerPhone: user.mobile,
        assistedByUserId: user.id,
      });

      if (res.data?.data?.id) {
        navigate("/profile/orders");
      }
    } catch (err) {
      alert("Booking failed: " + (err.response?.data || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <img
        src={service.image}
        alt={service.name}
        className="rounded-xl mb-4 w-full h-48 object-cover"
      />
      <h1 className="text-2xl font-bold mb-2">{service.name}</h1>
      <p className="text-gray-600 mb-6">{service.description}</p>
      <button
        onClick={handleBook}
        disabled={loading}
        className="bg-black text-white w-full py-3 rounded-xl disabled:opacity-50"
      >
        {loading ? "Booking..." : "Confirm Booking"}
      </button>
    </div>
  );
}
