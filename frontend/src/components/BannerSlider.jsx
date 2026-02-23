import { useNavigate } from "react-router-dom";

export default function BannerSlider() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/service/2")}
      className="cursor-pointer"
    >
      <img
        src="https://images.unsplash.com/photo-1581092160607-ee22731a4b52"
        alt="Electrician service"
        className="rounded-xl w-full h-40 object-cover"
      />
      <div className="bg-blue-600 text-white text-center p-2 rounded-b-xl text-sm font-medium">
        ₹100 Cashback on Electrician Booking
      </div>
    </div>
  );
}
