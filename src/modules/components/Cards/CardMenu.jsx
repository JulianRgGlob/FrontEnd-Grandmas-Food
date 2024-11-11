import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { StyledBoxCard, StyledCardMediaImg } from "./CadMenu.style";
import ModalCard from "../Modal/ModalCard";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IconButton from "@mui/material/IconButton";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../../stores/cartSlice";
import { fetchProducts, setSelectProduct , clearSelectProduct } from "../../../stores/productsSlice";
import {fetchImages} from "../../../stores/imagesSlice"
import { setOpen } from "../../../stores/modalSlice";

function CardMenu() {

  const dispatch = useDispatch();
  const productsRedux = useSelector((store) => store.products.products);
  const open = useSelector((store) => store.modal.open);
  const selectProduct = useSelector((store) => store.products.selectProduct);
  const images = useSelector((store) => store.images.images)
  const loading = useSelector((store) => store.images.loading);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(()=> {
    if(productsRedux.length > 0){
      dispatch(fetchImages())
    }
  },[dispatch,productsRedux])
  const handleOpen = (product) => {
    dispatch(setOpen(true))
    dispatch(setSelectProduct(product))
  };
  const handleClose = () => {
    dispatch(setOpen(false))
    dispatch(clearSelectProduct())
  };
  const handleAddToCart = (product) => {
    console.log("product en menucard ", product.productUuid);
    
    dispatch(
      addToCart({
        productId: product.productUuid,
        quantity: 1,
      })
    );
  };
  return (
    <StyledBoxCard id="">
      {productsRedux.length > 0 ? (
        productsRedux.map((product) => (
          <Card key={product.productUuid} sx={{ maxWidth: 345, margin: 1 }}>
            <CardActionArea>
              <CardContent>
                <StyledCardMediaImg
                  component="img"
                  image={images[product.productUuid] || ""}
                  alt={product.fantasyName}
                />
                <Typography gutterBottom variant="h5" component="div">
                  {product.fantasyName}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Precio: ${product.price.toFixed(2)}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                <Button
                  onClick={() => handleOpen(product)}
                  size="small"
                  color="primary"
                >
                  More info...
                </Button>
              </div>
              <IconButton
                color="primary"
                aria-label="add to shopping cart"
                onClick={() => handleAddToCart(product)}
              >
                <AddShoppingCartIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))
      ) : (
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Cargando...
        </Typography>
      )}
      <ModalCard
        open={open}
        handleClose={handleClose}
        selectedProduct={selectProduct}
      ></ModalCard>
    </StyledBoxCard>
  );
}

export default CardMenu;
