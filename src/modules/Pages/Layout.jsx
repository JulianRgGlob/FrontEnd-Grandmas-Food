import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
const Layout = () => {
  const statusTabCart = useSelector((store) => store.cart.statusTab);

  return (
    <>
      <Navbar />
      <main
        style={{
          width: "1000px",
          maxWidth: "100%",
          margin: "auto",
          padding: "1.25rem",
          // transform: statusTabCart === false ? "none" : "translateX(-56px)",
          transitionProperty: "transform",
          transitionDuration: "500ms",
        }}
      >
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
