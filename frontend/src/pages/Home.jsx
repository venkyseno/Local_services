import { Link } from "react-router-dom";
import BannerSlider from "../components/BannerSlider";
import { services } from "../data/Services";

export default function Home() {
  return (
    <div className="p-4 space-y-6 bg-slate-50 min-h-screen">
      <BannerSlider />

      <h2 className="text-xl font-bold">All Services</h2>

      <div className="grid grid-cols-2 gap-4">
        {services.map((service) => (
          <Link
            key={service.id}
            to={`/service/${service.id}`}
            className="bg-white shadow-md rounded-2xl p-3 border border-slate-100 hover:shadow-lg transition"
          >
            <img
              src={service.image}
              alt={service.name}
              className="w-full aspect-square object-cover rounded-xl mb-2"
            />
            <div className="text-base font-semibold">{service.name}</div>
            <div className="text-xs text-gray-500">{service.price}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
