import { Route, Routes } from "react-router-dom";

import Login from "./pages/shared/login"
import Home from "./pages/employee/home"
import HomeAD from "./pages/admin/home"
function App() {
  return (
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/emp/*" element={<Home />} />
      <Route path="/adm/*" element={<HomeAD />} />
    </Routes>

  );
}

export default App;
