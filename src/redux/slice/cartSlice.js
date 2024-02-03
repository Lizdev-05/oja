import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Check if there is any cartItems in localStorage, if yes, let the declared cartItems = that but if not set it to an empty array
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: second,
  initialState,
  reducers: {},
});

export const {} = cartSlice.actions;

export default cartSlice.reducer;
