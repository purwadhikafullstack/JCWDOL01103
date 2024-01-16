import { Navigate, Route, Routes } from "react-router-dom";
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
import Category from "./pages/Category";
import LayoutDashboard from "./components/templates/LayoutDashboard";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Authentication />} />
      <Route path="/verification/:token" element={<Verification />} />

      <Route path="/dashboard" element={<LayoutDashboard />}>
        <Route index element={<Navigate to="products" replace={true} />} />
        <Route
          path="/dashboard/products"
          element={
            <ProtectedRoute element={<Product />} roles={["admin", "master"]} />
          }
        />
        <Route
          path="/dashboard/categories"
          element={
            <Category element={<Product />} roles={["admin", "master"]} />
          }
        />
      </Route>

      <Route path="/dashboard/warehouse" element={<DashboardWarehouse />} />
      <Route path="/test" element={<Test />} />
      <Route path="/user-address" element={<UserAddress />} />
      <Route path="/journal" element={<Journal />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/shop/product/:id" element={<ProductDetail />} />
      <Route
        path="/cart"
        element={<ProtectedRoute element={<Cart />} roles={["user"]} />}
      />
      <Route path="/profile" element={<Profile />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
