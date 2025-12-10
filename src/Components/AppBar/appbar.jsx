import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Badge,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  alpha,
  Fade,
  Slide,
  Zoom,
  Container,
  Avatar,
  Chip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import CartList from "../cart-list/CartList";
import { styled } from "@mui/material/styles";

// Styled Components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  borderBottom: `1px solid ${alpha("#fff", 0.2)}`,
  transition: "all 0.3s ease",
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: "white",
  position: "relative",
  overflow: "hidden",
  borderRadius: "8px",
  margin: "0 8px",
  padding: "8px 20px",
  transition: "all 0.3s ease",
  fontWeight: 600,
  textTransform: "none",
  fontSize: "1rem",
  "&:hover": {
    backgroundColor: alpha("#fff", 0.15),
    transform: "translateY(-3px)",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
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
    height: "3px",
    background: "linear-gradient(90deg, #ffde59 0%, #ff9052 100%)",
    transform: "translateX(-100%)",
    transition: "transform 0.3s ease",
  },
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

const MobileDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: "300px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    backdropFilter: "blur(10px)",
    borderRight: `1px solid ${alpha("#fff", 0.2)}`,
  },
}));

const navItems = [
  { id: 1, navItem: "Home", navLink: "/", icon: <HomeIcon /> },
  { id: 2, navItem: "About", navLink: "/about", icon: <InfoIcon /> },
  { id: 3, navItem: "Contact", navLink: "/contact", icon: <ContactMailIcon /> },
];

function Appbar(props) {
  const [openCartList, setOpenCartList] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const toggleCartList = (newOpen) => () => {
    setOpenCartList(newOpen);
  };

  const { cartItems } = useSelector((state) => state.cart);
  const { window } = props;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Fade in timeout={500}>
        <Box sx={{ p: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              background: "linear-gradient(45deg, #fff 30%, #e0e0e0 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            FreshCart
          </Typography>
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ color: "white", "&:hover": { transform: "rotate(90deg)" } }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Fade>

      <Divider sx={{ backgroundColor: alpha("#fff", 0.2), mx: 2 }} />

      <Box sx={{ flex: 1, overflowY: "auto", mt: 2 }}>
        <List>
          {navItems.map((item, index) => (
            <Slide key={item.id} direction="right" in timeout={(index + 1) * 200}>
              <ListItem disablePadding sx={{ my: 1, px: 2 }}>
                <Link
                  to={item.navLink}
                  style={{ textDecoration: "none", color: "inherit", width: "100%" }}
                  onClick={handleDrawerToggle}
                >
                  <ListItemButton
                    sx={{
                      borderRadius: "12px",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: alpha("#fff", 0.15),
                        transform: "translateX(8px)",
                        "& .nav-icon": {
                          transform: "scale(1.2) rotate(10deg)",
                        },
                      },
                    }}
                  >
                    <Box className="nav-icon" sx={{ mr: 2, transition: "all 0.3s ease" }}>
                      {item.icon}
                    </Box>
                    <ListItemText
                      primary={item.navItem}
                      primaryTypographyProps={{
                        fontWeight: 600,
                        fontSize: "1.1rem",
                      }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            </Slide>
          ))}
        </List>

        <Box sx={{ p: 3, mt: 4 }}>
          <Divider sx={{ backgroundColor: alpha("#fff", 0.2), mb: 2 }} />
          <Typography variant="body2" sx={{ opacity: 0.8, fontStyle: "italic" }}>
            Fresh groceries delivered to your door
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <StyledAppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: { xs: 60, sm: 70 } }}>
            {/* Mobile Menu Button */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            {/* Logo */}
            <Zoom in timeout={600}>
              <Typography
                variant="h5"
                component={Link}
                to="/"
                sx={{
                  flexGrow: { xs: 1, sm: 0 },
                  textDecoration: "none",
                  color: "white",
                  fontWeight: 800,
                  fontSize: { xs: "1.4rem", sm: "1.8rem" },
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

            {/* Desktop Navigation */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "flex" },
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {navItems.map((item) => (
                <Fade key={item.id} in timeout={800}>
                  <Link to={item.navLink} style={{ textDecoration: "none" }}>
                    <NavButton startIcon={item.icon}>{item.navItem}</NavButton>
                  </Link>
                </Fade>
              ))}
            </Box>

            {/* Cart and Profile Icons */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                onClick={toggleCartList(true)}
                sx={{
                  color: "white",
                  position: "relative",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: alpha("#fff", 0.15),
                    transform: "scale(1.1) rotate(-5deg)",
                  },
                }}
              >
                <StyledBadge badgeContent={cartItems.length} color="secondary">
                  <ShoppingCartIcon fontSize="medium" />
                </StyledBadge>
                {cartItems.length > 0 && (
                  <Chip
                    label={`$${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}`}
                    size="small"
                    sx={{
                      position: "absolute",
                      top: -5,
                      right: -5,
                      fontSize: "0.6rem",
                      height: "16px",
                      fontWeight: 700,
                      background: "linear-gradient(45deg, #ffde59 30%, #ff9052 90%)",
                      color: "#333",
                    }}
                  />
                )}
              </IconButton>

              <IconButton
                onClick={handleClick}
                sx={{
                  color: "white",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: alpha("#fff", 0.15),
                    transform: "scale(1.1)",
                  },
                }}
              >
                <AccountCircleIcon fontSize="medium" />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  elevation: 8,
                  sx: {
                    mt: 1.5,
                    borderRadius: "16px",
                    minWidth: 180,
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    overflow: "visible",
                    "& .MuiMenuItem-root": {
                      py: 1.5,
                      px: 2,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: alpha("#667eea", 0.1),
                        transform: "translateX(4px)",
                        borderRadius: "8px",
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
                <MenuItem onClick={handleClose} sx={{ fontWeight: 600, color: "#667eea" }}>
                  <AccountCircleIcon sx={{ mr: 1, fontSize: 20 }} />
                  Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link
                    to="/Sign-In"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      width: "100%",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: "#667eea", fontSize: 14 }}>
                      A
                    </Avatar>
                    My Account
                  </Link>
                </MenuItem>
                <Divider sx={{ my: 1, opacity: 0.3 }} />
                <MenuItem
                  onClick={handleClose}
                  sx={{
                    color: "#f44336",
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: alpha("#f44336", 0.1),
                    },
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </StyledAppBar>

      {/* Mobile Drawer */}
      <MobileDrawer
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
      </MobileDrawer>

      {/* Cart Drawer */}
      <CartList openCartList={openCartList} toggleCartList={toggleCartList} />
    </>
  );
}

export default Appbar;