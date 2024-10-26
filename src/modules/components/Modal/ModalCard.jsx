import React, { useState,useEffect } from "react";
import StyledModalBoxCard from "./ModalCard.style";
import Button from "@mui/material/Button";
import { Modal, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../stores/cart";

function ModalCard({ open, handleClose, selectedProduct }) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch()
  // useEffect(() => {
  //   if (open) {

  //     setQuantity(1);
  //     console.log("quantity" ,quantity);
      
  //   }
  // }, [open, selectedProduct]);
  const handleMinusQuantity = () => {
    setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
  };
  const handlePlusQuantity = () => {
    setQuantity(quantity + 1);
  };
  const handleAddToCart = (product) => {
    dispatch(addToCart({
      productId: product,
      quantity:quantity
    }))
    handleClose();
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyledModalBoxCard>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {selectedProduct?.fantasyName}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {selectedProduct?.description}
        </Typography>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="contained"
              size="small"
              onClick={handleMinusQuantity}
            >
              -
            </Button>
            <span style={{ padding: "5px", fontWeight: "bold", minWidth: '30px', textAlign: 'center' }}>
              {quantity}
            </span>
            <Button variant="contained" size="small" onClick={handlePlusQuantity}>
              +
            </Button>
          </div>
          <Button 
            variant="outlined" 
            size="small" 
            onClick={() => handleAddToCart(selectedProduct?.productUuid)}
          >
            Add To Cart
          </Button>
        </div>
      </StyledModalBoxCard>
    </Modal>
  );
}

export default ModalCard;
