import { useParams, useNavigate } from "react-router-dom";
import { services } from "../data/Services";
import { useState } from "react";
import api from "../api/api";

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [issueDescription, setIssueDescription] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [attachmentPreview, setAttachmentPreview] = useState("");

  const service = services.find((s) => s.id === Number(id));

  if (!service) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">Service not found</h2>
      </div>
    );
  }

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      setAttachment(null);
      setAttachmentPreview("");
      return;
    }

    setAttachment(file);
    const reader = new FileReader();
    reader.onload = () => setAttachmentPreview(reader.result?.toString() || "");
    reader.readAsDataURL(file);
  };

  const handleBook = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user) {
      navigate("/login");
      return;
    }

    if (!issueDescription.trim()) {
      alert("Please add issue description before confirming booking.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/cases", {
        serviceId: service.id,
        description: issueDescription.trim(),
        customerPhone: user.mobile,
        assistedByUserId: user.id,
        attachmentName: attachment?.name || null,
        attachmentDataUrl: attachmentPreview || null,
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
    <div className="p-4 bg-slate-50 min-h-screen">
      <img
        src={service.image}
        alt={service.name}
        className="rounded-2xl mb-4 w-full h-52 object-cover bg-[#E6F0FF]"
      />
      <h1 className="text-2xl font-bold mb-2">{service.name}</h1>
      <p className="text-gray-600 mb-5">{service.description}</p>

      <label className="text-sm font-semibold text-gray-700">Issue description</label>
      <textarea
        value={issueDescription}
        onChange={(event) => setIssueDescription(event.target.value)}
        rows={4}
        placeholder="Describe the problem in detail..."
        className="w-full mt-2 mb-4 rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <label className="text-sm font-semibold text-gray-700">Attach issue image (optional)</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full mt-2 mb-3 rounded-xl border border-gray-300 p-2 bg-white"
      />

      {attachmentPreview && (
        <img
          src={attachmentPreview}
          alt="Issue preview"
          className="w-full h-40 object-cover rounded-xl border mb-5"
        />
      )}

      <button
        onClick={handleBook}
        disabled={loading}
        className="bg-gradient-to-r from-blue-700 to-blue-500 text-white w-full py-3 rounded-xl disabled:opacity-50 font-semibold shadow-md"
      >
        {loading ? "Booking..." : "Confirm Booking"}
      </button>
    </div>
  );
}
