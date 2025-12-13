import React from "react";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  Rating,
  TextField,
  Tooltip,
  Typography,
  alpha,
  Zoom,
  Grow,
  Fade,
  Container,
  Pagination as MuiPagination,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { addToCart } from "../../store/slices/cart/cartSlice";
import useProductCards from "./useProductCards";
import { ToastContainer } from "react-toastify";
import { styled } from "@mui/material/styles";

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  borderRadius: "16px",
  overflow: "hidden",
  transition: "all 0.4s ease",
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
  position: "relative",
  "&:hover": {
    transform: "translateY(-12px)",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
    "& .product-image": {
      transform: "scale(1.05)",
    },
    "& .product-actions": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
}));

const StyledSwiper = styled(Swiper)(({ theme }) => ({
  borderRadius: "16px 16px 0 0",
  overflow: "hidden",
  "& .swiper-pagination-bullet": {
    width: "8px",
    height: "8px",
    background: theme.palette.primary.main,
    opacity: 0.5,
  },
  "& .swiper-pagination-bullet-active": {
    opacity: 1,
    transform: "scale(1.2)",
  },
}));

const AddToCartButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
  color: "white",
  borderRadius: "10px",
  fontWeight: 600,
  fontSize: "0.875rem",
  textTransform: "none",
  padding: "8px 16px",
  boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(102, 126, 234, 0.4)",
    background: "linear-gradient(45deg, #5a6fd8 30%, #6a3f98 90%)",
  },
}));

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(102, 126, 234, 0.2)",
    transition: "all 0.3s ease",
    "&:hover": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused": {
      borderColor: theme.palette.primary.main,
      boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
    },
  },
}));

const ProductCard = () => {
  const {
    isLoadData,
    catagoryArr,
    updatedProduct,
    dispatch,
    currentPage,
    totalPages,
    filterProduct,
    setCurrentPage,
    itemsPerPage,
    handleViewDetails
  } = useProductCards();



  return (
    <Fade in timeout={800}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <ToastContainer position="top-right" />

        {/* Header Section */}
        <Zoom in timeout={500}>
          <Box sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            mb: 4,
            gap: 3
          }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2rem", md: "2.5rem" },
                background: "linear-gradient(45deg, #333 30%, #666 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Our Products
            </Typography>

            <StyledAutocomplete
              disablePortal
              options={catagoryArr}
              onChange={(e, newValue) => filterProduct(newValue)}
              sx={{ width: { xs: "100%", md: 300 } }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Filter by Category"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <LocalOfferIcon
                        sx={{
                          mr: 1,
                          color: "primary.main",
                          opacity: 0.7
                        }}
                      />
                    ),
                  }}
                />
              )}
            />
          </Box>
        </Zoom>

        {/* Products Grid */}
        {isLoadData ? (
          <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "400px"
          }}>
            <CircularProgress
              size={60}
              thickness={4}
              sx={{
                color: "primary.main",
                animation: "pulse 2s infinite",
                "@keyframes pulse": {
                  "0%": { opacity: 0.7 },
                  "50%": { opacity: 1 },
                  "100%": { opacity: 0.7 },
                },
              }}
            />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {updatedProduct
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              ?.map((product, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product?.id}>
                  <Grow in timeout={index * 100 + 500}>
                    <StyledCard>
                      {/* Product Image Swiper */}
                      <Box sx={{ position: "relative", overflow: "hidden" }}>
                        <StyledSwiper
                          spaceBetween={30}
                          centeredSlides={true}
                          autoplay={{
                            delay: 4500,
                            disableOnInteraction: false,
                          }}
                          pagination={{
                            clickable: true,
                          }}
                          navigation={false}
                          modules={[Autoplay, Pagination, Navigation]}
                          className="product-image"
                        >
                          <SwiperSlide>
                            <Box sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "250px",
                              overflow: "hidden"
                            }}>
                              <img
                                src={product?.image}
                                alt={product?.title}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "contain",
                                  transition: "transform 0.5s ease",
                                }}
                              />
                            </Box>
                          </SwiperSlide>
                          <SwiperSlide>
                            <Box sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "250px",
                              overflow: "hidden"
                            }}>
                              <img
                                src={product?.image}
                                alt={product?.title}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "contain",
                                  transition: "transform 0.5s ease",
                                }}
                              />
                            </Box>
                          </SwiperSlide>
                        </StyledSwiper>

                        {/* Category Chip */}
                        <Chip
                          label={product?.category?.name || product?.category}
                          size="small"
                          sx={{
                            position: "absolute",
                            top: 12,
                            left: 12,
                            fontWeight: 600,
                            background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                            color: "white",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                          }}
                        />

                        {/* Action Buttons Overlay */}
                        <Box
                          className="product-actions"
                          sx={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            opacity: 0,
                            transform: "translateY(-10px)",
                            transition: "all 0.3s ease",
                          }}
                        >

                        </Box>
                      </Box>

                      {/* Product Details */}
                      <CardContent sx={{ p: 2 }}>
                        {/* Product Title */}
                        <Tooltip title={product?.title} placement="top">
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              fontSize: "1rem",
                              mb: 1,
                              lineHeight: 1.4,
                              height: "40px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {product?.title}
                          </Typography>
                        </Tooltip>

                        {/* Rating */}
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                          <Rating
                            size="small"
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
                            variant="caption"
                            sx={{ ml: 1, color: "text.secondary", fontWeight: 500 }}
                          >
                            ({product?.rating?.count})
                          </Typography>
                        </Box>

                        {/* Price and Action Buttons */}
                        <Box sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mt: 2,
                          gap: 1 // Adds a small gap between the buttons
                        }}>
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 800,
                              color: "primary.main",
                              fontSize: "1.5rem",
                            }}
                          >
                            ${product?.price?.toFixed(2)}
                          </Typography>

                          <Box sx={{ display: 'flex', gap: 1 }}>
                            {/* New VIEW Button */}
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => handleViewDetails(product?.id)}
                              sx={{
                                borderRadius: "10px",
                                fontWeight: 600,
                                fontSize: "0.875rem",
                                textTransform: "none",
                                padding: "8px 16px",
                                borderColor: alpha("#667eea", 0.5),
                                color: "#667eea",
                                background: "transparent",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  borderColor: "#667eea",
                                  background: alpha("#667eea", 0.05),
                                  transform: "translateY(-2px)",
                                  boxShadow: "0 4px 12px rgba(102, 126, 234, 0.2)",
                                },
                              }}
                            >
                              VIEW →
                            </Button>

                            {/* Existing ADD Button */}
                            <AddToCartButton
                              size="small"
                              variant="contained"
                              onClick={() => dispatch(addToCart(product))}
                              startIcon={<AddIcon />}
                            >
                              Add
                            </AddToCartButton>
                          </Box>
                        </Box>
                      </CardContent>
                    </StyledCard>
                  </Grow>
                </Grid>
              ))}
          </Grid>
        )}

        {/* Pagination */}
        {!isLoadData && updatedProduct.length > 0 && (
          <Fade in timeout={1000}>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
              <MuiPagination
                onChange={(e, value) => setCurrentPage(value)}
                count={totalPages}
                page={currentPage}
                shape="rounded"
                color="primary"
                size="large"
                sx={{
                  "& .MuiPaginationItem-root": {
                    fontWeight: 600,
                    borderRadius: "10px",
                    mx: 0.5,
                    "&.Mui-selected": {
                      background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                      color: "white",
                      boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
                      transform: "scale(1.05)",
                      "&:hover": {
                        background: "linear-gradient(45deg, #5a6fd8 30%, #6a3f98 90%)",
                      },
                    },
                    "&:hover": {
                      background: alpha("#667eea", 0.1),
                      transform: "translateY(-2px)",
                    },
                  },
                }}
              />
            </Box>
          </Fade>
        )}

        {/* Empty State */}
        {!isLoadData && updatedProduct.length === 0 && (
          <Zoom in timeout={800}>
            <Box sx={{
              textAlign: "center",
              py: 10,
              borderRadius: "20px",
              background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
              mt: 4
            }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                No products found
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Try adjusting your filters or check back later for new arrivals
              </Typography>
            </Box>
          </Zoom>
        )}
      </Container>
    </Fade>
  );
};

export default ProductCard;