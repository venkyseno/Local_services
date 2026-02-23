import { useEffect, useState } from "react";
import { getWallet, getLedger } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Wallet() {
  const [wallet, setWallet] = useState(null);
  const [ledger, setLedger] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) {
      navigate("/login");
      return;
    }

    getWallet(user.id).then((res) => setWallet(res.data));
    getLedger(user.id).then((res) => setLedger(res.data));
  }, [navigate]);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Wallet</h2>

      <div className="bg-white rounded-xl shadow p-4">
        <p className="text-gray-500 text-sm">Cashback Balance</p>
        <p className="text-3xl font-bold mt-1">
          ₹{wallet?.balance ?? "—"}
        </p>
        <button
          onClick={() => navigate("/profile/withdraw")}
          className="mt-3 bg-black text-white px-4 py-2 rounded-lg text-sm"
        >
          Withdraw
        </button>
      </div>

      <h3 className="text-lg font-semibold">Transaction History</h3>
      {ledger.length === 0 ? (
        <p className="text-gray-500">No transactions yet.</p>
      ) : (
        ledger.map((entry) => (
          <div key={entry.id} className="bg-white rounded-xl shadow p-3 flex justify-between">
            <span className="text-sm text-gray-600">{entry.type}</span>
            <span className={entry.type === "CREDIT" ? "text-green-600 font-semibold" : "text-red-500 font-semibold"}>
              {entry.type === "CREDIT" ? "+" : "-"}₹{entry.amount}
            </span>
          </div>
        ))
      )}
    </div>
  );
}
