import { configureStore } from "@reduxjs/toolkit";
import foodReducer from "./foodSlice"
import cartReducer from "./cartSlice"

export const store = configureStore({
  reducer: {
    foods: foodReducer,
    cart: cartReducer,
  },
});
