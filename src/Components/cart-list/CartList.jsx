import { Box, Drawer, Typography, Tooltip, Button} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ClearIcon from '@mui/icons-material/Clear';
import { decreaseQuantity, deletProduct, increaseQuantity } from "../../store/slices/cart/cartSlice";
export const CartList = (props) => {
  const { openCartList } = props;
  const { toggleCartList } = props;
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  return (
    <>
      <Drawer open={openCartList} onClose={toggleCartList(false)}>
        <Box sx={{ width: "300px" }}>
          <Typography className="text-center fw-bold text-primary">Cart Items</Typography>

          {cartItems.map((item) => {
            return (
              <div className="row container my-2">
               <Box className="col-9 d-flex">
               <Box>
                  <img width={"60px"} src={item.image} alt="" />
                </Box>
                <Box className="">
                  <Tooltip className="" title={item?.title} placement="top">
                  <Typography className="fw-bold" variant="body2"> {item?.title?.length > 12
                      ? `${item?.title.slice(0, 12)}...`
                      : item?.title}</Typography>
                  </Tooltip>
                   <Typography variant="body2">{item.category}</Typography>   
                   <Typography variant="body2">{item.price}</Typography>   
                   <Typography variant="body2">Qnt: {item.quantity}</Typography>   
                </Box>

               </Box>
               <Box className=" col-3 w-25 d-flex flex-column">
                <Button onClick={()=>dispatch(increaseQuantity(item))} size="small" variant="outlined" color="success"><AddIcon className="fs-6"/></Button>
                <Button onClick={()=>dispatch(decreaseQuantity(item))} size="small" variant="outlined" color="error"><RemoveIcon className="fs-6"/></Button>
                <Button onClick={()=>dispatch(deletProduct(item))} size="small" variant="outlined" color="warning"><ClearIcon className="fs-6"/></Button>
               </Box>
              </div>
            );
          })}
        </Box>
      </Drawer>
    </>
  );
};
export default CartList;
