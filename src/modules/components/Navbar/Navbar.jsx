import React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import { StyledBoxNav, StyledIconButton, StyledMenu, StyledBoxPageNav, StyledBoxUser, StyledBoxNavImg } from "./Navbar.style";
import StyledIconButtonCart from './NavbarCar'
function Navbar() {
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
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <StyledBoxNavImg component='img' src="src\assets\GFD.webp" alt="Logo" />
          <StyledBoxNav>
            <StyledIconButton onClick={handleOpenNavMenu}></StyledIconButton>
            <StyledMenu anchorEl={anchorElNav}
            open={Boolean(anchorElNav)}
            onClose={handleOpenNavMenu}/>
          </StyledBoxNav>
          <StyledBoxPageNav onClick={handleCloseNavMenu}/>
          <StyledIconButtonCart/>
          <StyledBoxUser onClickO={handleOpenUserMenu} anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClickC={handleCloseUserMenu}/>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
