import "./App.css"
import { Route, Routes } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import Address from "./pages/Address"
import UpdateAddress from "./pages/UpdateAddress"
import AddAddress from "./pages/AddAddress"

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/address" element={<Address />} />
      <Route path="/form-address/:addressId" element={<UpdateAddress />} />
      <Route path="/add-address" element={<AddAddress />} />
    </Routes>
  )
}

export default App
