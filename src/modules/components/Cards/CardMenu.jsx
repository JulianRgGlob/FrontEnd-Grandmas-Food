import React, { useEffect, useState, useMemo } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import ProductsApi from "../../api/ProductsApi";
import { StyledBoxCard, StyledCardMediaImg } from "./CadMenu.style";
import ModalCard from "../Modal/ModalCard";
import ImagesApi from "../../api/ImagesApi";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IconButton from "@mui/material/IconButton";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../../stores/cart";
// import { store } from "../../../stores";
function CardMenu() {
  const carts = useSelector((store) => store.cart.items);
  // console.log(carts);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const productsApi = useMemo(() => ProductsApi(), []);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [images, setImages] = useState({});
  const imagesApi = useMemo(() => ImagesApi(), []);
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await productsApi.getProducts();
      // console.log("data 2:", JSON.stringify(data, null, 2));
      if (Array.isArray(data) && data.length > 0) {
        setProducts(data);
        console.log("local", data);
        dispatch(setProducts(data));
        console.log("redux", data);
      } else {
        console.error("No se obtuvieron productos válidos.");
      }
    };

    fetchProducts();
  }, [productsApi, dispatch]);

  useEffect(() => {
    const fetchImages = async () => {
      const imagePromises = products.map(async (product) => {
        const result = await imagesApi.getImage(product.fantasyName);
        return {
          [product.productUuid]: result.length > 0 ? result[0].urls.small : "",
        };
      });

      const resolvedImages = await Promise.all(imagePromises);
      const imagesMap = Object.assign({}, ...resolvedImages);
      setImages(imagesMap);
    };

    if (products.length > 0) {
      fetchImages();
    }
  }, [products, imagesApi]);

  const handleOpen = (product) => {
    setOpen(true);
    setSelectedProduct(product);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };
  const handleAddToCart = (product) => {
    // console.log("productid" + product.productUuid);

    dispatch(
      addToCart({
        productId: product.productUuid,
        quantity: 1,
      })
    );
  };
  return (
    <StyledBoxCard>
      {products.length > 0 ? (
        products.map((product) => (
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
        selectedProduct={selectedProduct}
      ></ModalCard>
    </StyledBoxCard>
  );
}

export default CardMenu;
