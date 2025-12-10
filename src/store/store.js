import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cart/cartSlice";
export const store = configureStore({
    reducer: {
        cart: cartSlice,
    },
});