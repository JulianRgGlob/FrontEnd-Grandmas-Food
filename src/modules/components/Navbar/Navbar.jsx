import React from 'react'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import { useNavigate } from 'react-router-dom'
import {
  StyledBoxNav,
  StyledIconButton,
  StyledMenu,
  StyledBoxPageNav,
  StyledBoxUser,
  StyledBoxNavImg,
} from './Navbar.style'
import StyledIconButtonCart from './NavbarCar'
import { setAnchorElNav, setAnchorElUser } from '../../../stores/navbarSlice'
import { useSelector, useDispatch } from 'react-redux'
import CarT from '../CarT/CarT'

function Navbar() {
  const dispatch = useDispatch()
  const anchorElNav = useSelector((store) => store.navbar.anchorElNav)
  const anchorElUser = useSelector((store) => store.navbar.anchorElUser)
  const navigation = useNavigate()
  const handleOpenNavMenu = (event) => {
    dispatch(setAnchorElNav(event.currentTarget))
  }
  const handleOpenUserMenu = (event) => {
    dispatch(setAnchorElUser(event.currentTarget))
  }

  const handleCloseNavMenu = () => {
    dispatch(setAnchorElNav(null))
  }

  const handleCloseUserMenu = () => {
    localStorage.removeItem('loggedin')
    navigation('/login')
    dispatch(setAnchorElUser(null))
  }
  return (
    <AppBar position="static">
      <Container maxWidth="x1">
        <Toolbar disableGutters>
          <StyledBoxNavImg
            component="img"
            src="src\assets\GFD.webp"
            alt="Logo"
          />
          <StyledBoxNav>
            <StyledIconButton onClick={handleOpenNavMenu}></StyledIconButton>
            <StyledMenu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            />
          </StyledBoxNav>
          <StyledBoxPageNav onClick={handleCloseNavMenu} />
          <StyledIconButtonCart />
          <StyledBoxUser
            onClickO={handleOpenUserMenu}
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClickC={handleCloseUserMenu}
          />
        </Toolbar>
      </Container>
      <CarT />
    </AppBar>
  )
}

export default Navbar
