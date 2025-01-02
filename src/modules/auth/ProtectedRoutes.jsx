import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = ({ isAdminRoute = false }) => {
  const auth = localStorage.getItem('loggedin')
  
  const usersData = localStorage.getItem('users')
  const adminsData = localStorage.getItem('admins')
  
  let user = null

  if (auth && (usersData || adminsData)) {
    try {
      if (isAdminRoute && adminsData) {
        const admins = JSON.parse(adminsData)
        user = admins.find((admin) => admin.id === auth)
      } else if (!isAdminRoute && usersData) {
        const users = JSON.parse(usersData)
        user = users.find((u) => u.id === auth)
      }

      if (!user) {
        console.warn(`No se encontró un ${isAdminRoute ? 'administrador' : 'usuario'} con ID: ${auth}`)
      }
    } catch (error) {
      console.error(
        'Error al analizar los datos de usuarios en localStorage:',
        error
      )
    }
  }

  if (!auth || !user) {
    return <Navigate to={isAdminRoute ? '/admin/verify' : '/login'} />;
  }

  if (isAdminRoute && user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  if (!isAdminRoute && user.role === 'admin') {
    return <Navigate to="/admin/dashboard" />;
  }

  return <Outlet />;
}

export default ProtectedRoutes
