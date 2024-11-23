import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
const Layout = () => {

  return (
    <>
      <Navbar />
      <main
        style={{
          width: '100%', 
          maxWidth: '1600px', 
          margin: '0 auto', 
          padding: '1.25rem', 
          transitionProperty: 'transform',
          transitionDuration: '500ms',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Outlet />
      </main>
    </>
  )
}

export default Layout
