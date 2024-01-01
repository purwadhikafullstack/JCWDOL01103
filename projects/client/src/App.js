import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";
import Authentication from "./pages/Authentication";
import Verification from "./pages/Verification";
import NotFound from "./pages/NotFound";
import Test from "./pages/Test";
import DashboardWarehouse from "./pages/DashboardWarehouse";
import Dashboard from "./pages/Dashboard";
import UserAddress from "./components/organisms/UserAddress";
import Journal from "./pages/Journal";
import Product from "./pages/Product";
import ProtectedRoute from "./utils/ProtectedRoute";
import StockMutation from "./pages/StockMutation";
import FormMutation from "./components/organisms/FormMutation";
import ResetPassword from "./pages/ResetPassword";
import InputNewPassword from "./pages/InputNewPassword";
import AccountProfile from "./pages/AccountProfile";
import LayoutRoot from "./components/templates/LayoutRoot";
import LayoutDashboard from "./components/templates/LayoutDashboard";

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
        <Route path="/account" element={<AccountProfile/>} />
        <Route path="/test" element={<Test />} />
        <Route path="/user-address" element={<ProtectedRoute element={<UserAddress />} roles={["user"]} />}  />
      </Route>
      <Route element={<LayoutDashboard/>}>
        <Route path="/dashboard/warehouse" element={<ProtectedRoute element={<DashboardWarehouse />} roles={["master"]} />}  />
        <Route path="/journal" element={<ProtectedRoute element={<Journal />} roles={["admin","master"]} />} />
        <Route path="/stock-mutation" element={<ProtectedRoute element={<StockMutation />} roles={["admin","master"]} />} />
        <Route path="/stock-mutation/form" element={<ProtectedRoute element={<FormMutation />} roles={["admin","master"]} />}/>
      </Route>
      <Route path="/products" element={<Product />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
