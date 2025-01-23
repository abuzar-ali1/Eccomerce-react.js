import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Rating, Typography, Button, Skeleton } from "@mui/material";
import { addToCart } from "../../store/slices/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import SkeltonProductDetails from "./SkeltonProductDetails";
import useGetProductDetails from "../../hooks/useGetProductDetails";

const ProductDetails = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { product_id } = useParams();
  const dispatch = useDispatch();
  const [productDetails, setProductDetails] = useState({});
  const {isLoadData,product} = useGetProductDetails(product_id)
  useEffect(() => {
    const renderProduct = cartItems?.filter((item) => item.id == product_id)[0];
    setProductDetails(renderProduct);
  }, [cartItems]);
  const isExist = cartItems?.find((item) => item.id == product_id);
  return (
    <>
      {isLoadData ? (
        <SkeltonProductDetails />
      ) : (
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
              {isExist && <Typography className="">
                Qnt: {productDetails?.quantity}
              </Typography>}
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
      )}
    </>
  );
};

export default ProductDetails;
