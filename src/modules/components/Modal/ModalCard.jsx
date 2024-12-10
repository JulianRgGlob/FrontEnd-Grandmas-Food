import React, { useEffect} from "react";
import StyledModalBoxCard from "./ModalCard.style";
import Button from "@mui/material/Button";
import { Modal, Typography } from "@mui/material";
import { useDispatch,useSelector } from "react-redux";
import { addToCart,setQuantity } from "../../../stores/cartSlice";

function ModalCard({ open, handleClose, selectedProduct }) {
  const quantity = useSelector((state) => state.cart.quantity)
  const userId = useSelector((state) => state.auth.userId)
  const dispatch = useDispatch()
  useEffect(() => {
    if (open) {
      dispatch(setQuantity(1)); 
    }
  }, [open, dispatch]);
  const handleMinusQuantity = () => {
    dispatch(setQuantity(quantity - 1 < 1 ? 1 : quantity - 1))
  };
  const handlePlusQuantity = () => {
    dispatch(setQuantity(quantity + 1))
  };
  const handleAddToCart = (product) => {
    if (!userId) {
      console.error("No userId provided");
      return;
    }
    dispatch(addToCart({
      productId: product,
      quantity:quantity,
      userId,
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
