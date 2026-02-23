import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ServiceDetail from "./pages/ServiceDetail";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Wallet from "./pages/Wallet";
import Withdraw from "./pages/Withdraw";
import AskAI from "./pages/AskAI";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import WorkerDashboard from "./pages/WorkerDashboard";
import AdminRoute from "./components/AdminRoute";
import WorkerRoute from "./components/WorkerRoute";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/service/:id" element={<ServiceDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/orders" element={<Orders />} />
          <Route path="/profile/wallet" element={<Wallet />} />
          <Route path="/profile/withdraw" element={<Withdraw />} />
          <Route path="/ask-ai" element={<AskAI />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/worker/dashboard"
            element={
              <WorkerRoute>
                <WorkerDashboard />
              </WorkerRoute>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
