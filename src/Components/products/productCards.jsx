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
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import { addToCart } from "../../store/slices/cart/cartSlice";
import { useDispatch } from "react-redux";


const ProductCard = () => {
  const [isLoadData, setIsLoadData] = useState(true);
  const [products, setProducts] = useState();
  const [catagoryArr, setCatagoryArr] = useState([]);
  const [updatedProduct, setUpdatedProduct] = useState();
const dispatch = useDispatch()

  const filterProduct = (catagoryProduct) => {
    const filterByCategory = products?.filter(
      (item) => item.category === catagoryProduct.value && catagoryProduct.value !== null
    );
    setUpdatedProduct(filterByCategory);
  };
  useEffect(() => {
    const productData = axios
      .get("https://fakestoreapi.com/products")
      .then((data) => {

        
      

        const productCatagory = data?.data.map((item) => {
          return {
            label: item.category,
            value: item.category,
          };
        });
        const uniqueData = productCatagory.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.value === item.value)  
        );
        setCatagoryArr(uniqueData || null || "" );

        setProducts(data?.data);
        setUpdatedProduct(data?.data);

        setIsLoadData(false);
      });
  }, []);

  return (
    <>
      <Autocomplete
        disablePortal
        options={catagoryArr}
        onChange={(e, newValue) => {
          filterProduct(newValue); 
         } }
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Catogries" />}
      />
      <Grid container>
        {isLoadData ? (
          <Box className="text-center mt-3 w-100">
            <CircularProgress size={40} />
          </Box>
        ) : (
          updatedProduct?.map((porduct) => {
            return (
              <Grid item sm={3}>
                <Card className="p-2">
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
                          <img width="200px" height="300px" src={porduct?.image} alt="" />
                        </SwiperSlide>
                   
                        <SwiperSlide className="text-center">
                          <img width="200px" height="300px" src={porduct?.image} alt="" />
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
                    <Typography>{porduct?.price}</Typography>
                    <Box>

                      <Tooltip title="view details" placement="top">
                        <Link to={`/product-Details/${porduct?.id}`}>
                        <Button>
                          <VisibilityIcon />
                        </Button>
                        </Link>
                      </Tooltip>
                      <Button size="small" variant="contained" onClick={()=>dispatch(addToCart(porduct))}>
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
    </>
  );
};

export default ProductCard;
