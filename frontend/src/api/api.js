import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const getWallet = (userId) => api.get(`/wallet/${userId}`);
export const getLedger = (userId) => api.get(`/wallet/${userId}/ledger`);
export const getPendingWithdrawals = () => api.get("/admin/withdrawals?status=PENDING");

export default api;
