import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/profile/:id" element={<Profile />} />
    </Routes>
  );
}

export default App;
