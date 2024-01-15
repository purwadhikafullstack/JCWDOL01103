import { Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";
import Authentication from "./pages/Authentication";
import Verification from "./pages/Verification";
import NotFound from "./pages/NotFound";
import Test from "./pages/Test";
import DashboardWarehouse from "./pages/DashboardWarehouse";
import UserAddress from "./components/organisms/UserAddress";
import Journal from "./pages/Journal";
import Product from "./pages/Product";
import ProtectedRoute from "./utils/ProtectedRoute";
import StockMutation from "./pages/StockMutation";
import ResetPassword from "./pages/ResetPassword";
import InputNewPassword from "./pages/InputNewPassword";
import AccountProfile from "./pages/AccountProfile";
import LayoutRoot from "./components/templates/LayoutRoot";
import LayoutDashboard from "./components/templates/LayoutDashboard";
import DashboardUser from "./pages/DashboardUser"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Authentication />} />
      <Route path="/verification/:token" element={<Verification />} />
      <Route path="/reset" element={<ResetPassword />} />
      <Route path="/reset/:token" element={<InputNewPassword/>} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/" element={<Homepage />} />
      <Route element={<LayoutRoot/>}>
        <Route path="/account" element={<ProtectedRoute element={<AccountProfile />} roles={["user"]} />}/>
        <Route path="/user-address" element={<ProtectedRoute element={<UserAddress />} roles={["user"]} />}  />
        <Route path="/test" element={<Test />} />
      </Route>
      <Route path="/dashboard" element={<LayoutDashboard />} >
        <Route index element={<Navigate to="product-stock" replace={true} />} />
        <Route path="warehouses" element={<ProtectedRoute element={<DashboardWarehouse />} roles={["master"]} />}/>
        <Route path="product-stock" element={<ProtectedRoute element={<Journal />} roles={["admin","master"]} />} />
        <Route path="stock-mutation" element={<ProtectedRoute element={<StockMutation />} roles={["admin"]} />} />
        <Route path="users" element={<ProtectedRoute element={<DashboardUser />} roles={["master"]} />} />
      </Route>
      <Route path="/products" element={<Product />} />
      <Route path="/not-found" element={<NotFound/>} />
      <Route path="/forbidden" element={<NotFound type="forbidden" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
