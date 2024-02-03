import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  // Check if there is any cartItems in localStorage, if yes, let the declared cartItems = that but if not set it to an empty array
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART: (state, action) => {
      console.log(action.payload);
      //I created a productIndex variable to identify specific product and check the cart if it already exists... comparing the item id to the action.payload.id which is the product id received from the dispatch(frontend)

      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      //If the product already exists in the cart, I get the specific product and update the quantity and amount  by multiplying the quantity by the price and adding the quantity to the existing quantity in the cart
      if (productIndex >= 0) {
      } else {
        //item does not exist in the cart, so I add the item to the cart
        const tempProduct = { ...action.payload, quantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(`${tempProduct.title} added to cart`);
      }
    },
  },
});

export const { ADD_TO_CART } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;

export default cartSlice.reducer;
