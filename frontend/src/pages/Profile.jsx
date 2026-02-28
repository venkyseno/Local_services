import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const role = user?.role?.toUpperCase();

  const requireLogin = (callback) => {
    if (!user) navigate("/login");
    else callback();
  };

  const goToRoleDashboard = () => {
    if (role === "ADMIN") {
      navigate("/admin/dashboard");
      return;
    }

    if (role === "WORKER") {
      navigate("/worker/dashboard");
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {user && (
        <div className="flex items-center gap-3 mb-6 p-4 bg-white rounded-xl shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-lg font-bold text-blue-700">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-lg">{user.name}</p>
            <p className="text-sm text-gray-500">{user.mobile}</p>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{role}</span>
          </div>
        </div>
      )}

      <h1 className="text-xl font-bold mb-3">My Account</h1>

      <ProfileItem label="Orders" onClick={() => requireLogin(() => navigate("/profile/orders"))} />
      <ProfileItem label="Wallet (Cashback)" onClick={() => requireLogin(() => navigate("/profile/wallet"))} />
      <ProfileItem label="Addresses" onClick={() => requireLogin(() => {})} />
      <ProfileItem label="Coupons" onClick={() => requireLogin(() => {})} />
      <ProfileItem label="Help" onClick={() => {}} />

      {(role === "WORKER" || role === "ADMIN") && (
        <button
          onClick={goToRoleDashboard}
          className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-3 rounded-xl font-semibold shadow-md"
        >
          Open {role === "ADMIN" ? "Admin" : "Worker"} Dashboard
        </button>
      )}

      {!user ? (
        <button
          onClick={() => navigate("/login")}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl"
        >
          Login
        </button>
      ) : (
        <button
          onClick={() => {
            localStorage.removeItem("user");
            setUser(null);
            navigate("/");
          }}
          className="mt-6 w-full bg-red-500 text-white py-3 rounded-xl"
        >
          Logout
        </button>
      )}
    </div>
  );
}

function ProfileItem({ label, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex justify-between items-center p-4 bg-white rounded-lg shadow mb-3 cursor-pointer hover:bg-gray-50 active:bg-gray-100"
    >
      <span>{label}</span>
      <span className="text-gray-400">›</span>
    </div>
  );
}
