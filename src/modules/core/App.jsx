import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Homes from '../Pages/Home'
import Login from '../auth/Login/Login'
import Register from '../auth/Register/Register'
import DetailCar from '../Pages/DetailCar'
import ProtectedRoutes from '../auth/ProtectedRoutes'
import ResetPassword from '../auth/ResetPassword'
import Layout from '../Pages/Layout'
import AdminHome from '../Pages/AdminHome'
import initializeAdmins from '../api/InitializeLocalAdmin'
import { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import {initializeCart} from '../../stores/cartSlice'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const userId = localStorage.getItem('loggedin')
    if (userId) {
      dispatch(initializeCart({userId}))
      
    }  
    initializeAdmins()
  }, [dispatch])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPass" element={<ResetPassword />} />
          <Route path="/admin/verify" element={<Login isAdmin />} />

          <Route element={<ProtectedRoutes isAdminRoute={false} />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Homes />} />
              <Route path="/detailCar" element={<DetailCar />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoutes isAdminRoute={true} />}>
            <Route path="/admin/dashboard" element={<AdminHome />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
