import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Homes from "../Pages/Home";
import Login from "../auth/Login/Login";
import Register from "../auth/Register/Register";
import DetailCar from "../Pages/DetailCar";
import ProtectedRoutes from "../auth/ProtectedRoutes";
import ResetPassword from "../auth/ResetPassword";
import Layout from "../Pages/Layout";
import AdminHome from "../Pages/AdminHome"
function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPass" element={<ResetPassword />} />
        <Route path="/admin/verify" element={<AdminHome/>} />
        <Route element={<ProtectedRoutes />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Homes />} />
            <Route path="/detailCar" element={<DetailCar />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
