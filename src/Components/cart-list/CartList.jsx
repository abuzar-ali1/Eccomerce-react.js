import React, { useState } from "react";
import {
  Box,
  Drawer,
  Typography,
  Tooltip,
  Button,
  IconButton,
  Divider,
  alpha,
  Fade,
  Card,
  CardContent,
  CardMedia,
  Chip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  decreaseQuantity,
  deletProduct,
  increaseQuantity,
} from "../../store/slices/cart/cartSlice";
import { styled } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";

// Styled Components
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: { xs: "100%", sm: "420px" },
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    backdropFilter: "blur(20px)",
    borderLeft: `1px solid ${alpha("#fff", 0.3)}`,
    boxShadow: "-10px 0 50px rgba(0, 0, 0, 0.15)",
  },
}));

const CartItemCard = styled(Card)(({ theme }) => ({
  display: "flex",
  borderRadius: "16px",
  marginBottom: theme.spacing(2),
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  border: `1px solid ${alpha("#fff", 0.3)}`,
  boxShadow: "0 8px 32px rgba(31, 38, 135, 0.1)",
  transition: "all 0.3s ease",
  overflow: "hidden",
  "&:hover": {
    transform: "translateX(-4px)",
    boxShadow: "0 15px 40px rgba(31, 38, 135, 0.2)",
    "& .cart-item-image": {
      transform: "scale(1.05)",
    },
  },
}));

const QuantityButton = styled(IconButton)(({ theme }) => ({
  width: 32,
  height: 32,
  borderRadius: "10px",
  background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.1)",
    boxShadow: "0 6px 20px rgba(102, 126, 234, 0.4)",
  },
  "&.Mui-disabled": {
    background: alpha("#667eea", 0.3),
    color: alpha("#fff", 0.5),
  },
}));

const DeleteButton = styled(IconButton)(({ theme }) => ({
  width: 32,
  height: 32,
  borderRadius: "10px",
  background: "linear-gradient(45deg, #ff6b6b 0%, #ff8e53 100%)",
  color: "white",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.1) rotate(90deg)",
    boxShadow: "0 6px 20px rgba(255, 107, 107, 0.4)",
  },
}));

const CheckoutButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  borderRadius: "14px",
  padding: "16px 32px",
  fontWeight: 700,
  fontSize: "1.1rem",
  textTransform: "none",
  boxShadow: "0 8px 30px rgba(102, 126, 234, 0.4)",
  transition: "all 0.4s ease",
  position: "relative",
  overflow: "hidden",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 15px 40px rgba(102, 126, 234, 0.6)",
    "&::after": {
      left: "100%",
    },
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
    transition: "left 0.7s ease",
  },
}));

const EmptyCartState = () => (
  <Fade in timeout={800}>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "60vh",
        textAlign: "center",
        p: 3,
      }}
    >
      <Box
        sx={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: alpha("#667eea", 0.1),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
          animation: "pulse 2s infinite",
          "@keyframes pulse": {
            "0%": { transform: "scale(1)" },
            "50%": { transform: "scale(1.05)" },
            "100%": { transform: "scale(1)" },
          },
        }}
      >
        <ShoppingCartIcon sx={{ fontSize: 60, color: "#667eea", opacity: 0.5 }} />
      </Box>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          mb: 2,
          background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Your Cart is Empty
      </Typography>
      <Typography variant="body1" sx={{ color: "text.secondary", mb: 4, maxWidth: "300px" }}>
        Add some delicious items from our menu to get started!
      </Typography>
      <Button
        variant="outlined"
        sx={{
          borderColor: "#667eea",
          color: "#667eea",
          borderRadius: "12px",
          px: 4,
          py: 1.5,
          fontWeight: 600,
          "&:hover": {
            borderColor: "#764ba2",
            background: alpha("#667eea", 0.05),
            transform: "translateY(-2px)",
          },
        }}
        onClick={(e) => e.currentTarget.closest('.MuiDrawer-root')?.querySelector('[aria-label="close"]')?.click()}
      >
        Continue Shopping
      </Button>
    </Box>
  </Fade>
);

export const CartList = (props) => {
  const { openCartList, toggleCartList } = props;
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [removingItem, setRemovingItem] = useState(null);

  const totalPrice = cartItems.reduce(
    (acc, item) => item.price * item.quantity + acc,
    0
  );

  const handleDeleteItem = (item) => {
    setRemovingItem(item.id);
    setTimeout(() => {
      dispatch(deletProduct(item));
      setRemovingItem(null);
    }, 300);
  };

  return (
    <StyledDrawer
      anchor="right"
      open={openCartList}
      onClose={toggleCartList(false)}
      transitionDuration={400}
    >
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <Box
          sx={{
            p: 3,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -50,
              right: -50,
              width: 150,
              height: 150,
              borderRadius: "50%",
              background: alpha("#fff", 0.1),
              animation: "float 20s infinite linear",
              "@keyframes float": {
                "0%": { transform: "rotate(0deg)" },
                "100%": { transform: "rotate(360deg)" },
              },
            }}
          />
          
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "12px",
                  background: alpha("#fff", 0.2),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(10px)",
                }}
              >
                <ShoppingCartIcon />
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  Your Cart
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
                </Typography>
              </Box>
            </Box>
            
            <IconButton
              onClick={toggleCartList(false)}
              sx={{
                color: "white",
                background: alpha("#fff", 0.2),
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: alpha("#fff", 0.3),
                  transform: "rotate(90deg)",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Cart Items */}
        <Box sx={{ flex: 1, overflowY: "auto", p: 3 }}>
          <AnimatePresence>
            {cartItems.length === 0 ? (
              <EmptyCartState />
            ) : (
              cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50, height: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  layout
                >
                  <CartItemCard
                    sx={{
                      opacity: removingItem === item.id ? 0.5 : 1,
                      transform: removingItem === item.id ? "scale(0.98)" : "scale(1)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        width: 100,
                        height: 100,
                        objectFit: "contain",
                        p: 2,
                        transition: "transform 0.5s ease",
                      }}
                      className="cart-item-image"
                      image={item.image}
                      alt={item.title}
                    />
                    
                    <CardContent sx={{ flex: 1, p: 2 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <Box sx={{ flex: 1 }}>
                          <Tooltip title={item.title} placement="top">
                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: 700,
                                mb: 0.5,
                                lineHeight: 1.3,
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              {item.title}
                            </Typography>
                          </Tooltip>
                          
                          <Chip
                            label={item.category}
                            size="small"
                            sx={{
                              mb: 1.5,
                              background: alpha("#667eea", 0.1),
                              color: "#667eea",
                              fontWeight: 600,
                              fontSize: "0.7rem",
                            }}
                          />
                          
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 800,
                              color: "#667eea",
                              mb: 2,
                            }}
                          >
                            ${item.price.toFixed(2)}
                          </Typography>
                        </Box>
                        
                        <DeleteButton
                          onClick={() => handleDeleteItem(item)}
                          size="small"
                          sx={{ ml: 1 }}
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </DeleteButton>
                      </Box>
                      
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <QuantityButton
                            size="small"
                            onClick={() => dispatch(decreaseQuantity(item))}
                            disabled={item.quantity <= 1}
                          >
                            <RemoveIcon fontSize="small" />
                          </QuantityButton>
                          
                          <Box
                            sx={{
                              minWidth: 40,
                              textAlign: "center",
                              p: 1,
                              background: alpha("#667eea", 0.1),
                              borderRadius: "8px",
                              fontWeight: 700,
                              color: "#667eea",
                            }}
                          >
                            {item.quantity}
                          </Box>
                          
                          <QuantityButton
                            size="small"
                            onClick={() => dispatch(increaseQuantity(item))}
                          >
                            <AddIcon fontSize="small" />
                          </QuantityButton>
                        </Box>
                        
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 700,
                            color: "text.primary",
                          }}
                        >
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </Box>
                    </CardContent>
                  </CartItemCard>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </Box>

        {/* Footer with Total and Checkout */}
        {cartItems.length > 0 && (
          <Fade in timeout={500}>
            <Box
              sx={{
                p: 3,
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                borderTop: `1px solid ${alpha("#667eea", 0.1)}`,
                boxShadow: "0 -10px 30px rgba(0, 0, 0, 0.05)",
              }}
            >
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    Subtotal
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    ${totalPrice.toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    Shipping
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: "success.main" }}>
                    ${totalPrice > 50 ? "0.00" : "5.99"}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    Tax
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    ${(totalPrice * 0.08).toFixed(2)}
                  </Typography>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>
                    Total
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 900,
                      background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    ${(totalPrice + (totalPrice > 50 ? 0 : 5.99) + (totalPrice * 0.08)).toFixed(2)}
                  </Typography>
                </Box>
                
                {totalPrice < 50 && (
                  <Typography
                    variant="caption"
                    sx={{
                      display: "block",
                      textAlign: "center",
                      mt: 1,
                      color: "warning.main",
                      fontWeight: 600,
                      animation: "pulse 2s infinite",
                      "@keyframes pulse": {
                        "0%, 100%": { opacity: 1 },
                        "50%": { opacity: 0.7 },
                      },
                    }}
                  >
                    Add ${(50 - totalPrice).toFixed(2)} more for free shipping!
                  </Typography>
                )}
              </Box>
              
              <CheckoutButton
                fullWidth
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={() => {
                  // Add checkout logic here
                  alert(`Processing order for $${(totalPrice + (totalPrice > 50 ? 0 : 5.99) + (totalPrice * 0.08)).toFixed(2)}`);
                }}
              >
                Proceed to Checkout
              </CheckoutButton>
              
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  textAlign: "center",
                  mt: 2,
                  color: "text.secondary",
                }}
              >
                Free shipping on orders over $50
              </Typography>
            </Box>
          </Fade>
        )}
      </Box>
    </StyledDrawer>
  );
};

export default CartList;