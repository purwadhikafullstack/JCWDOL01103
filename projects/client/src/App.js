import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";
import Authentication from "./pages/Authentication";
import Verification from "./pages/Verification";
import NotFound from "./pages/NotFound";
import Test from "./pages/Test";
import DashboardWarehouse from "./pages/DashboardWarehouse";
import UserAddress from "./pages/UserAddress";
import Journal from "./pages/Journal";
import Product from "./pages/Product";
import LayoutDashboard from "./pages/LayoutDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Authentication />} />
      <Route path="/verification/:token" element={<Verification />} />

      <Route path="/dashboard" element={<LayoutDashboard />}>
        <Route path="/dashboard/profile/:id" element={<Profile />} />
        <Route path="/dashboard/products" element={<Product />} />
      </Route>

      <Route path="/dashboard/warehouse" element={<DashboardWarehouse />} />
      <Route path="/test" element={<Test />} />
      <Route path="/user-address" element={<UserAddress />} />
      <Route path="/journal" element={<Journal />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
