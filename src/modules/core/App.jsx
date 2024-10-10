import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Homes from "../Pages/Home";
import Login from "../Client/Components/Login/Login";
import Register from "../Client/Components/Register/Register";
import ProtectedRoutes from "../auth/ProtectedRoutes";
import ResetPassword from "../auth/ResetPassword";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Homes />} />
          </Route>
          <Route path="/forgotPass" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
