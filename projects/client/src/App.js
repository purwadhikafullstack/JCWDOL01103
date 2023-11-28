import { Route, Routes } from "react-router-dom";
import Authentication from "./pages/Authentication";
import Verification from "./pages/Verification";
import NotFound from "./pages/NotFound";
import Test from "./pages/Test";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Test/>} />
      <Route path="/login" element={<Authentication/>}/>
      <Route path="/verification/:token" element={<Verification />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    
  );
}

export default App
