import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Rating, Typography, Button } from "@mui/material";
import { addToCart } from "../../store/slices/cart/cartSlice";
import { useDispatch } from "react-redux";

const ProductDetails = () => {
  const [isLoadData, setIsLoadData] = useState(true);
  const [product, setProduct] = useState();
  const { product_id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const productData = axios
      .get(`https://fakestoreapi.com/products/${product_id}`)
      .then((data) => {
        setProduct(data?.data);
 
        setIsLoadData(false);
      });
  }, []);
  return (
    <div className="container d-flex row mt-4">
      <div className="col-5 text-center">
        <img width="400px" src={product?.image} alt="" />
      </div>
      <div className="col-7">
        <span>{product?.category}</span>
        <h1>{product?.title}</h1>
        <span>{product?.description}</span>
        <br />
        <Rating
          size="small"
          name="read-only"
          value={product?.rating.rate}
          readOnly
        />
        <Box className="d-flex justify-content-between align-items-center">
          <Typography>$: {product?.price}</Typography>
          <Box>
            <Button
              size="small"
              variant="contained"
              onClick={() => dispatch(addToCart(product))}
            >
              <AddIcon /> Add
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default ProductDetails;
