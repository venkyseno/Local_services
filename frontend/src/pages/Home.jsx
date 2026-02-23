import { Link } from "react-router-dom";
import BannerSlider from "../components/BannerSlider";
import { services } from "../data/Services";

export default function Home() {
  return (
    <div className="p-4 space-y-6">
      <BannerSlider />

      <h2 className="text-xl font-bold">All Services</h2>

      <div className="grid grid-cols-2 gap-4">
        {services.map((service) => (
          <Link
            key={service.id}
            to={`/service/${service.id}`}
            className="bg-white shadow rounded-xl p-4"
          >
            <div className="text-lg font-semibold">{service.name}</div>
            <div className="text-sm text-gray-500">{service.price}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
