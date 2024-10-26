import React from "react";

import Navbar from "../components/Navbar/Navbar";
import CardMenu from "../components/Cards/CardMenu";
import CarT from "../components/CarT/Cart";
import { useSelector } from "react-redux";
function Home() {
  const statusTabCart = useSelector(store => store.cart.statusTab)
  return (
    <>
      <main style={{ width:"1200px", maxWidth:"100%",margin:"auto", padding:"1.25rem",  transform: statusTabCart === false ? "none" : "translateX(-56px)",transitionProperty: 'transform',transitionDuration:"500ms"}}>
        <Navbar />
        <CardMenu />
      </main>
      <CarT />
    </>
  );
}

export default Home;
