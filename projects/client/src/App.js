import { Route, Routes } from "react-router-dom";
import Authentication from "./pages/Authentication";
import Verification from "./pages/Verification";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/login" element={<Authentication/>}/>
      <Route path="/verification/:token" element={<Verification />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    
  );
}

export default App;
