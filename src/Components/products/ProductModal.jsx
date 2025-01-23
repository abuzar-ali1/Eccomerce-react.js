import { Box, Button, Modal, Rating, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from "@mui/icons-material/Add";
import useGetProductDetails from '../../hooks/useGetProductDetails';
import SkeltonProductDetails from '../product-details/SkeltonProductDetails';
import { addToCart } from '../../store/slices/cart/cartSlice';

const ProductModal = (props) => {
    const {open, handleClose, productId} = props
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 999,
      background: 'white',
      boxShadow: 24,
      padding: "40px",
    };
    const { cartItems } = useSelector((state) => state.cart);
 
    const dispatch = useDispatch();
    const [productDetails, setProductDetails] = useState({});
    const {isLoadData,product} = useGetProductDetails(productId)
    useEffect(() => {
      const renderProduct = cartItems?.filter((item) => item.id == productId)[0];
      setProductDetails(renderProduct);
    }, [cartItems]);
    const isExist = cartItems?.find((item) => item.id == productId);
  return (
    <>
     <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={style}>
        {isLoadData ? (
        <SkeltonProductDetails />
      ) : (
        <div className="container d-flex row mt-4">
          <div className="col-5 text-center">
            <img width="300px" src={product?.image} alt="" />
          </div>
          <div className="col-7">
            <span>{product?.category}</span>
            <h1>{product?.title}</h1>
            <span>{product?.description}</span>
            <br />
            <Rating 
              size="small"
              name="read-only"
              value={product?.rating?.rate}
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
        </Box>
      </Modal>
    </>
  )
}

export default ProductModal