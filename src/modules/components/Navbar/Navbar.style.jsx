import styled from "styled-components";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";

import { pagesNav, settingsNav } from "./NavabarConst";
const StyledBoxNavImg = styled(Box)`
  margin-right: 8px;
  @media (max-width: 600px) {
    display: flex;
    height: 40px;
    width: 40px;
  }

  @media (min-width: 600px) {
    display: flex;
    height: 40px;
    width: 40px;
  }
`;

const ImageLogoNav = ({ src, alt }) => {
  return <StyledBoxNavImg component="img" src={src} alt={alt} />;
};

const StyledBoxNav = styled(Box)`
  flex-grow: 1;
  display: flex;
  @media (max-width: 0px) {
    display: flex;
  }

  @media (min-width: 900px) {
    display: none;
  }
`;

const StyledIconButton = (props) => {
  return (
    <IconButton
      size="large"
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      color="inherit"
      {...props}
    >
      <MenuIcon />
    </IconButton>
  );
};

const StyledMenu = ({ anchorEl, open, onClose }) => {
  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={Boolean(open)}
      onClose={onClose}
      sx={{ display: { xs: "block", md: "none" } }}
    >
      {pagesNav.map((page) => (
        <MenuItem key={page} onClick={onClose}>
          <Typography sx={{ textAlign: "center" }}>{page}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );
};

const StyledBoxPageNav = ({ onClick }) => {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {pagesNav.map((page) => (
        <Button
          key={page}
          onClick={onClick}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          {page}
        </Button>
      ))}
    </Box>
  );
};

const StyledBoxUser = ({ onClickO, anchorEl, open, onClose, onClickC }) => {
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={onClickO} sx={{ p: 0 }}>
          <Avatar alt="user" src="" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(open)}
        onClose={onClose}
      >
        {settingsNav.map((setting) => (
          <MenuItem key={setting} onClick={onClickC}>
            <Typography sx={{ textAlign: "center" }}>{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
export {
  StyledBoxNav,
  ImageLogoNav,
  StyledIconButton,
  StyledMenu,
  StyledBoxPageNav,
  StyledBoxUser,
  StyledBoxNavImg,
};
