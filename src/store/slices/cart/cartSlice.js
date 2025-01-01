import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
    

      const isExist = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (isExist) {
        isExist.quantity +=1;
       
      }else{
      state.cartItems.push({ ...action.payload, quantity: 1 });

      }
    },
    increaseQuantity : (state, action) => {
      const isExist = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (isExist) {
        isExist.quantity +=1;
       
      }
    }
  },
});

export const { addToCart , increaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;
