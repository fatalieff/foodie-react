import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    isOpen: false,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find((item) => item.idMeal === action.payload.idMeal);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.idMeal !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { idMeal, quantity } = action.payload;
      const item = state.items.find((item) => item.idMeal === idMeal);
      if (item) {
        item.quantity = Math.max(1, quantity);
      }
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, toggleCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
