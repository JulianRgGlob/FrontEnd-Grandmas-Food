import React, { useEffect, useState, useMemo } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import ProductsApi from "../Products/ProductsApi";

const pages = ["Products", "Carrito"];
const settings = ["Profile", "Logout"];
function Home() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigation = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    localStorage.removeItem("loggedin");
    navigation("/login");
    setAnchorElUser(null);
  };
  const [products, setProducts] = useState([]);
  const productsApi = useMemo(() => ProductsApi(), []);
  
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
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const handleOpen = (product) => {
    setOpen(true);
    setSelectedProduct(product);
    console.log("i am here" + setSelectedProduct(product));
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  console.log("products api" + productsApi.getProducts());
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
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              component="img"
              sx={{
                display: { xs: "flex", md: "flex", height: 40, width: 40 },
                mr: 1,
              }}
              alt="Logo"
              src="src\assets\GFD.webp"
            />
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <IconButton>
              <AddShoppingCartIcon
                sx={{ display: { xs: "flex", md: "flex" }, mr: 1 }}
              />
            </IconButton>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="user" src="" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: "center" }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
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
    </>
  );
}

export default Home;
