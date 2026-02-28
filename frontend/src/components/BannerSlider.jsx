import { useNavigate } from "react-router-dom";

export default function BannerSlider() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/service/2")}
      className="cursor-pointer rounded-2xl overflow-hidden shadow-lg"
    >
      <div className="relative">
        <img
          src="/images/banner-electrician.svg"
          alt="Electrician service"
          className="w-full h-44 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent" />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white max-w-52">
          <p className="text-lg font-bold leading-tight">Need urgent electrical help?</p>
          <p className="text-xs mt-1 text-blue-100">Book verified experts with quick arrival.</p>
        </div>
      </div>
      <div className="bg-blue-600 text-white text-center p-2 text-sm font-semibold">
        ₹100 Cashback on Electrician Booking
      </div>
    </div>
  );
}
