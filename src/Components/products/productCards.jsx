import {
  Autocomplete,
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  Rating,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from '@mui/icons-material/Delete';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import { addToCart } from "../../store/slices/cart/cartSlice";
import PaginationMui from "@mui/material/Pagination";
import useProductCards from "./useProductCards";
import ProductModal from "./ProductModal";
import { ToastContainer } from "react-toastify";

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
    open,
    handleOpen,
    handleClose,
    productId,
    deletProduct
  } = useProductCards();
  return (
    <>
    <ToastContainer position="top-right" />
     <Box className="d-flex justify-content-between align-items-center animate__zoomIn">
     <Typography className="" variant="h4">Products</Typography>
     <Autocomplete
     disablePortal
     options={catagoryArr}
     onChange={(e, newValue) => {
       filterProduct(newValue);
     }}
     sx={{ width: 300 }}
     renderInput={(params) => <TextField {...params} label="Catogries" />}
   />
     </Box>
      <Grid container>
        {isLoadData ? (
          <Box className="text-center mt-3 w-100">
            <CircularProgress size={40} />
          </Box>
        ) : (
          updatedProduct
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            ?.map((porduct) => {
              return (
                <Grid item sm={3}>
                  <Card className="p-2 m-2">
                    <Swiper
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
                      className="mySwiper"
                    >
                      <SwiperSlide className="text-center">
                        <img
                          width="200px"
                          height="300px"
                          src={porduct?.image}
                          alt=""
                        />
                      </SwiperSlide>

                      <SwiperSlide className="text-center">
                        <img
                          width="200px"
                          height="300px"
                          src={porduct?.image}
                          alt=""
                        />
                      </SwiperSlide>
                    </Swiper>
                    <Typography variant="body2">
                      {porduct?.category?.name}
                    </Typography>

                    <Tooltip title={porduct?.title} placement="top">
                      <h6>
                        {porduct?.title?.length > 30
                          ? `${porduct?.title.slice(0, 30)}...`
                          : porduct?.title}
                      </h6>
                    </Tooltip>
                    <Rating
                      size="small"
                      name="read-only"
                      value={porduct?.rating.rate}
                      readOnly
                    />
                    <Box className="d-flex justify-content-between align-items-center">
                      <Typography>$: {porduct?.price}</Typography>
                      <Box>
                        <Tooltip title="Delete" placement="top">
                         
                          <Button onClick={()=>deletProduct(porduct?.id)}>
                            <DeleteIcon />
                          </Button>
                        </Tooltip>
                        <Tooltip title="view details" placement="top">
                         
                          <Button onClick={() => handleOpen(porduct?.id)}>
                            <VisibilityIcon />
                          </Button>
                        </Tooltip>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => dispatch(addToCart(porduct))}
                        >
                          <AddIcon /> Add
                        </Button>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              );
            })
        )}
      </Grid>
      <Box className="d-flex justify-content-center my-4">
        <PaginationMui
          onChange={(e, value) => {
            setCurrentPage(value);
          }}
          count={totalPages}
          shape="rounded"
        />
      </Box>

      <ProductModal open={open} handleClose={handleClose} productId={productId}/>
    </>
  );
};

export default ProductCard;
