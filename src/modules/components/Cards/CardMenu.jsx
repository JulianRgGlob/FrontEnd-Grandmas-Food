import React,{ useEffect, useState, useMemo } from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Modal from "@mui/material/Modal";
import ProductsApi from "../../api/ProductsApi";

function CardMenu() {
  const [products, setProducts] = useState([]);
  const productsApi = useMemo(() => ProductsApi(), []);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await productsApi.getProducts();
      console.log("data 2 " + data);
      console.log("Tipo de data:", typeof data);
      if (Array.isArray(data) && data.length > 0) {
        setProducts(data);
      } else {
        console.error("No se obtuvieron productos válidos.");
      }
  };

    fetchProducts();
  }, [productsApi]);
  const handleOpen = (product) => {
    setOpen(true);
    setSelectedProduct(product);
    console.log("i am here" + setSelectedProduct(product));
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Box
        sx={{
          padding: 2,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {products.length > 0 ? (
          products.map((product) => (
            <Card key={product.productUuid} sx={{ maxWidth: 345, margin: 1 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="src/assets/OIP.jpg"
                  alt="product"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.fantasyName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Precio: ${product.price.toFixed(2)}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <div>
                  <Button onClick={() => handleOpen(product)} size="small" color="primary">
                    More info...
                  </Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{opacity:0.2}}
                  >
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        {selectedProduct?.fantasyName}
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {selectedProduct?.description}
                      </Typography>
                    </Box>
                  </Modal>
                </div>
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Cargando...
          </Typography>
        )}
      </Box>
  )
}

export default CardMenu