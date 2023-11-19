import { Route, Routes } from "react-router-dom";
import Authentication from "./pages/Authentication";
import Verification from "./pages/Verification";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Authentication/>}/>
      <Route path="/verification" element={<Verification />} />
    </Routes>
  );
}

export default App;
