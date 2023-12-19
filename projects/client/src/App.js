import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";
import Authentication from "./pages/Authentication";
import Verification from "./pages/Verification";
import NotFound from "./pages/NotFound";
import Test from "./pages/Test";
import DashboardWarehouse from "./pages/DashboardWarehouse";
import Dashboard from "./pages/Dashboard";
import UserAddress from "./pages/UserAddress";
import Journal from "./pages/Journal";
import Product from "./pages/Product";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/login" element={<Authentication />} />
      <Route path="/verification/:token" element={<Verification />} />
      <Route path="/dashboard/warehouse" element={<DashboardWarehouse />} />
      <Route path="/test" element={<Test />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/user-address" element={<UserAddress />} />
      <Route path="/journal" element={<ProtectedRoute element={<Journal />} roles={["admin","master"]} />} />
      <Route path="/products" element={<Product />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
