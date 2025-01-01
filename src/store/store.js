import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice/counterSlice"
import cartSlice from "./slices/cart/cartSlice";
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        cart: cartSlice,
    },
});