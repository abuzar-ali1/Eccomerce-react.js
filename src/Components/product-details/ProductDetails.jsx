import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecurityIcon from "@mui/icons-material/Security";
import { useParams } from "react-router-dom";
import {
  Box,
  Rating,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Container,
  Fade,
  Zoom,
  Grow,
  alpha,
  Divider,
  Tooltip,
} from "@mui/material";
import { addToCart } from "../../store/slices/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import SkeltonProductDetails from "./SkeltonProductDetails";
import useGetProductDetails from "../../hooks/useGetProductDetails";
import { styled } from "@mui/material/styles";

// Styled components
const ProductImage = styled("img")(({ theme }) => ({
  width: "100%",
  maxWidth: "500px",
  height: "auto",
  borderRadius: "16px",
  transition: "all 0.5s ease",
  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: "0 30px 60px rgba(0,0,0,0.15)",
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: "300px",
  },
}));

const FeatureChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  padding: theme.spacing(1),
  fontWeight: 500,
  background: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  transition: "all 0.3s ease",
  "&:hover": {
    background: alpha(theme.palette.primary.main, 0.2),
    transform: "translateY(-2px)",
  },
}));

const AddToCartButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
  color: "white",
  padding: "12px 24px",
  borderRadius: "12px",
  fontWeight: 700,
  fontSize: "1rem",
  textTransform: "none",
  boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.6)",
    background: "linear-gradient(45deg, #5a6fd8 30%, #6a3f98 90%)",
  },
  "&:active": {
    transform: "translateY(-1px)",
  },
}));

const ProductDetails = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { product_id } = useParams();
  const dispatch = useDispatch();
  const [productDetails, setProductDetails] = useState({});
  const { isLoadData, product } = useGetProductDetails(product_id);
  
  const [imageLoaded, setImageLoaded] = useState(false);
  const [addButtonClicked, setAddButtonClicked] = useState(false);

  useEffect(() => {
    const renderProduct = cartItems?.filter((item) => item.id === product_id)[0];
    setProductDetails(renderProduct);
  }, [cartItems, product_id]);

  const isExist = cartItems?.find((item) => item.id === product_id);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setAddButtonClicked(true);
    setTimeout(() => setAddButtonClicked(false), 300);
  };

  if (isLoadData) {
    return <SkeltonProductDetails />;
  }

  return (
    <Fade in timeout={800}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={{ xs: 2, md: 4 }}>
          {/* Product Image Section */}
          <Grid item xs={12} md={6}>
            <Zoom in timeout={600}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  minHeight: { xs: "300px", md: "500px" },
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "20px",
                    "&:hover .image-overlay": {
                      opacity: 1,
                    },
                  }}
                >
                  <ProductImage
                    src={product?.image}
                    alt={product?.title}
                    onLoad={() => setImageLoaded(true)}
                    style={{
                      opacity: imageLoaded ? 1 : 0,
                      transition: "opacity 0.5s ease",
                    }}
                  />
                  <Box
                    className="image-overlay"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background:
                        "linear-gradient(0deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 100%)",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      borderRadius: "16px",
                    }}
                  />
                </Box>
              </Box>
            </Zoom>
          </Grid>

          {/* Product Details Section */}
          <Grid item xs={12} md={6}>
            <Grow in timeout={800}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: "20px",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                  p: 3,
                }}
              >
                <CardContent>
                  {/* Category Tag */}
                  <Fade in timeout={400}>
                    <Chip
                      label={product?.category}
                      sx={{
                        mb: 3,
                        px: 2,
                        py: 1,
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                        color: "white",
                      }}
                    />
                  </Fade>

                  {/* Product Title */}
                  <Fade in timeout={500}>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        fontSize: { xs: "1.8rem", md: "2.5rem" },
                        mb: 2,
                        lineHeight: 1.2,
                        background: "linear-gradient(45deg, #333 30%, #666 90%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {product?.title}
                    </Typography>
                  </Fade>

                  {/* Description */}
                  <Fade in timeout={600}>
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 3,
                        fontSize: "1.1rem",
                        lineHeight: 1.6,
                        color: "text.secondary",
                        opacity: 0.9,
                      }}
                    >
                      {product?.description}
                    </Typography>
                  </Fade>

                  {/* Rating Section */}
                  <Fade in timeout={700}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                      <Rating
                        size="large"
                        name="read-only"
                        value={product?.rating?.rate || 0}
                        precision={0.1}
                        readOnly
                        sx={{
                          "& .MuiRating-iconFilled": {
                            color: "#ffb400",
                          },
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ ml: 2, fontWeight: 600, color: "text.secondary" }}
                      >
                        ({product?.rating?.count} reviews)
                      </Typography>
                    </Box>
                  </Fade>

                  <Divider sx={{ my: 3, opacity: 0.2 }} />

                  {/* Price and Quantity Section */}
                  <Grow in timeout={800}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 4,
                        p: 2,
                        borderRadius: "12px",
                        background: alpha("#667eea", 0.05),
                        border: `1px solid ${alpha("#667eea", 0.1)}`,
                      }}
                    >
                      <Box>
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 800,
                            color: "#667eea",
                            fontSize: { xs: "2rem", md: "2.5rem" },
                          }}
                        >
                          ${product?.price?.toFixed(2)}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                          Inclusive of all taxes
                        </Typography>
                      </Box>

                      {isExist && (
                        <Zoom in>
                          <Chip
                            icon={<ShoppingCartIcon />}
                            label={`Quantity: ${productDetails?.quantity}`}
                            color="primary"
                            variant="outlined"
                            sx={{
                              fontWeight: 600,
                              px: 2,
                              py: 1,
                              animation: "bounce 1s infinite",
                              "@keyframes bounce": {
                                "0%, 100%": { transform: "translateY(0)" },
                                "50%": { transform: "translateY(-5px)" },
                              },
                            }}
                          />
                        </Zoom>
                      )}
                    </Box>
                  </Grow>

                  {/* Add to Cart Button */}
                  <Fade in timeout={900}>
                    <Box sx={{ textAlign: "center", mb: 4 }}>
                      <Tooltip title="Add to cart" placement="top">
                        <AddToCartButton
                          size="large"
                          variant="contained"
                          onClick={handleAddToCart}
                          startIcon={
                            <ShoppingCartIcon
                              sx={{
                                animation: addButtonClicked
                                  ? "rotate 0.3s ease"
                                  : "none",
                                "@keyframes rotate": {
                                  "0%": { transform: "rotate(0deg)" },
                                  "100%": { transform: "rotate(360deg)" },
                                },
                              }}
                            />
                          }
                          sx={{
                            transform: addButtonClicked ? "scale(0.95)" : "scale(1)",
                            transition: "transform 0.3s ease",
                          }}
                        >
                          Add to Cart
                        </AddToCartButton>
                      </Tooltip>
                    </Box>
                  </Fade>

                  <Divider sx={{ my: 3, opacity: 0.2 }} />

                  {/* Features Section */}
                  <Fade in timeout={1000}>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, mb: 2, color: "text.primary" }}
                      >
                        Features
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6} sm={4}>
                          <FeatureChip
                            icon={<LocalShippingIcon />}
                            label="Free Shipping"
                          />
                        </Grid>
                        <Grid item xs={6} sm={4}>
                          <FeatureChip
                            icon={<SecurityIcon />}
                            label="Secure Payment"
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <FeatureChip label="30-Day Returns" />
                        </Grid>
                      </Grid>
                    </Box>
                  </Fade>
                </CardContent>
              </Card>
            </Grow>
          </Grid>
        </Grid>

        {/* Additional Product Info */}
        <Fade in timeout={1200}>
          <Box sx={{ mt: 6 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 3,
                textAlign: "center",
                position: "relative",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  bottom: "-10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "100px",
                  height: "3px",
                  background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                  borderRadius: "2px",
                },
              }}
            >
              Product Details
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                maxWidth: "800px",
                margin: "0 auto",
                lineHeight: 1.8,
                color: "text.secondary",
              }}
            >
              This premium product comes with our standard warranty and exceptional
              customer support. For any inquiries about this product, please contact
              our support team.
            </Typography>
          </Box>
        </Fade>
      </Container>
    </Fade>
  );
};

export default ProductDetails;