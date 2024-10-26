import React, { useEffect, useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IconButton from "@mui/material/IconButton";
import { useSelector,useDispatch } from "react-redux";
import { toggleStatusTab } from "../../../stores/cart";
const StyledIconButtonCart = () => {
    const [totalQuantity, setTotalQuantity] = useState(0)
    const carts = useSelector(store => store.cart.items)
    const dispatch = useDispatch()
    useEffect(() =>{
        let total = 0
        carts.forEach(item => total += item.quantity)
        setTotalQuantity(total);
    },[carts])
    const handleOpenTabCart = () => {
        dispatch(toggleStatusTab())
    }
  return (
    <IconButton
      sx={{
        width: "2.5rem",
        height: "2.5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
      onClick={handleOpenTabCart}
    >
      <AddShoppingCartIcon
        sx={{ display: { xs: "flex", md: "flex" }, mr: 1 }}
      />
      <span
        style={{
          position: "absolute",
          top: "1rem",
          right: "1.8rem",
          backgroundColor: "#f87171a0",
          color: "white",
          fontSize: "0.9rem",
          width: "1.25rem",
          height: "1.25rem",
          borderRadius: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {totalQuantity}
      </span>
    </IconButton>
  );
};
export default StyledIconButtonCart;
