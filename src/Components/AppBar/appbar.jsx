import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Badge, Menu, MenuItem, alpha, Slide, Fade, Zoom } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import CartList from "../cart-list/CartList";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";

const drawerWidth = 280;

const navItems = [
  { id: 1, navItem: "Home", navLink: "/" },
  { id: 2, navItem: "About", navLink: "/about" },
  { id: 3, navItem: "Contact", navLink: "/contact" },
];

// Styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  borderBottom: `1px solid ${alpha("#fff", 0.2)}`,
  transition: "all 0.3s ease",
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#ff4081",
    color: "white",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    animation: "pulse 2s infinite",
    "@keyframes pulse": {
      "0%": { transform: "scale(1)" },
      "50%": { transform: "scale(1.1)" },
      "100%": { transform: "scale(1)" },
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  position: "relative",
  overflow: "hidden",
  borderRadius: "8px",
  margin: "0 4px",
  padding: "6px 16px",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: alpha("#fff", 0.1),
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    "&::after": {
      transform: "translateX(0)",
    },
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "2px",
    backgroundColor: "#fff",
    transform: "translateX(-100%)",
    transition: "transform 0.3s ease",
  },
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: drawerWidth,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    backdropFilter: "blur(10px)",
    borderRight: `1px solid ${alpha("#fff", 0.2)}`,
  },
}));

function Appbar(props) {
  const [openCartList, setOpenCartList] = useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const toggleCartList = (newOpen) => () => {
    setOpenCartList(newOpen);
  };

  const { cartItems } = useSelector((state) => state.cart);
  const { window } = props;

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <Box
      sx={{
        textAlign: "center",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      onClick={handleDrawerToggle}
    >
      <Fade in timeout={600}>
        <Typography
          variant="h5"
          sx={{
            my: 3,
            fontWeight: 700,
            background: "linear-gradient(45deg, #fff 30%, #e0e0e0 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          FreshCart
        </Typography>
      </Fade>
      
      <Divider sx={{ backgroundColor: alpha("#fff", 0.2), mx: 2 }} />
      
      <Box sx={{ flex: 1, overflowY: "auto", mt: 2 }}>
        <List>
          {navItems.map((item, index) => (
            <Slide
              key={item?.id}
              direction="right"
              in
              timeout={(index + 1) * 200}
            >
              <ListItem disablePadding sx={{ my: 1, px: 2 }}>
                <Link
                  to={item?.navLink}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    width: "100%",
                  }}
                >
                  <ListItemButton
                    sx={{
                      textAlign: "center",
                      borderRadius: "8px",
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: alpha("#fff", 0.1),
                        transform: "translateX(8px)",
                        "&::after": {
                          transform: "translateX(0)",
                        },
                      },
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        top: 0,
                        height: "100%",
                        width: "4px",
                        backgroundColor: "#fff",
                        transform: "translateX(-100%)",
                        transition: "transform 0.3s ease",
                      },
                    }}
                  >
                    <ListItemText
                      primary={item?.navItem}
                      primaryTypographyProps={{
                        fontWeight: 500,
                        fontSize: "1.1rem",
                      }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            </Slide>
          ))}
        </List>
        
        <Box sx={{ mt: 4, px: 2 }}>
          <Divider sx={{ backgroundColor: alpha("#fff", 0.2), mb: 2 }} />
          <Typography
            variant="body2"
            sx={{ opacity: 0.8, fontStyle: "italic" }}
          >
            Fresh groceries delivered to your door
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <StyledAppBar position="fixed">
        <Toolbar
          sx={{
            justifyContent: "space-between",
            minHeight: { xs: 56, sm: 64 },
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { sm: "none" },
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "rotate(90deg)",
                backgroundColor: alpha("#fff", 0.1),
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          
          <Zoom in timeout={500}>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                flexGrow: { xs: 1, sm: 0 },
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
                fontWeight: 800,
                fontSize: { xs: "1.25rem", sm: "1.5rem" },
                background: "linear-gradient(45deg, #fff 30%, #e0e0e0 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              FreshCart
            </Typography>
          </Zoom>

          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 1,
            }}
          >
            {navItems.map((item) => (
              <Link
                key={item?.id}
                to={item?.navLink}
                style={{ textDecoration: "none" }}
              >
                <StyledButton>{item?.navItem}</StyledButton>
              </Link>
            ))}
            
            <IconButton
              onClick={toggleCartList(true)}
              sx={{
                color: "#fff",
                position: "relative",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: alpha("#fff", 0.1),
                  transform: "scale(1.1) rotate(-5deg)",
                },
              }}
            >
              <StyledBadge badgeContent={cartItems.length} color="secondary">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
            
            <IconButton
              className="text-white"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: alpha("#fff", 0.1),
                  transform: "scale(1.1)",
                },
              }}
            >
              <AccountCircleIcon fontSize="medium" />
            </IconButton>
            
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              PaperProps={{
                elevation: 8,
                sx: {
                  mt: 1.5,
                  borderRadius: "12px",
                  minWidth: 180,
                  overflow: "visible",
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  "& .MuiMenuItem-root": {
                    py: 1.5,
                    px: 2,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: alpha("#667eea", 0.1),
                      transform: "translateX(4px)",
                    },
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "rgba(255, 255, 255, 0.95)",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                    borderLeft: "1px solid rgba(255, 255, 255, 0.2)",
                    borderTop: "1px solid rgba(255, 255, 255, 0.2)",
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem
                onClick={handleClose}
                sx={{
                  fontWeight: 500,
                  color: "#667eea",
                }}
              >
                Profile
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link
                  to="/Sign-In"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    width: "100%",
                    fontWeight: 500,
                  }}
                >
                  My Account
                </Link>
              </MenuItem>
              <Divider sx={{ my: 1, opacity: 0.3 }} />
              <MenuItem
                onClick={handleClose}
                sx={{
                  color: "error.main",
                  fontWeight: 500,
                  "&:hover": {
                    backgroundColor: alpha("#f44336", 0.1),
                  },
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Box>
          
          <Box sx={{ display: { xs: "flex", sm: "none" }, gap: 1 }}>
            <IconButton
              onClick={toggleCartList(true)}
              sx={{
                color: "#fff",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: alpha("#fff", 0.1),
                  transform: "scale(1.1)",
                },
              }}
            >
              <StyledBadge badgeContent={cartItems.length} color="secondary">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
            
            <IconButton
              onClick={handleClick}
              sx={{
                color: "#fff",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: alpha("#fff", 0.1),
                  transform: "scale(1.1)",
                },
              }}
            >
              <AccountCircleIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </StyledAppBar>
      
      <nav>
        <StyledDrawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
          }}
        >
          {drawer}
        </StyledDrawer>
      </nav>
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 1, sm: 3 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}
      >
        <Toolbar />
        <Fade in timeout={800}>
          <Box sx={{ py: 2 }}>
            <Outlet />
          </Box>
        </Fade>
      </Box>
      
      <CartList openCartList={openCartList} toggleCartList={toggleCartList} />
    </Box>
  );
}

export default Appbar;