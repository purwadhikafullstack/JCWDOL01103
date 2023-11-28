import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Authentication from "./pages/Authentication";
import Verification from "./pages/Verification";
import NotFound from "./pages/NotFound";
import Test from "./pages/Test";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Authentication/>}/>
      <Route path="/verification/:token" element={<Verification />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
