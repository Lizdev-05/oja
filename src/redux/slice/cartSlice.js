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
      //I created a productIndex variable to identify specific product and check the cart if it already exists... comparing the item id to the action.payload.id which is the product id received from the dispatch(frontend)

      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      //If the product already exists in the cart, I get the specific product and update the quantity
      if (productIndex >= 0) {
        // item already exists in the cart, so I update the quantity and amount
        state.cartItems[productIndex].cartQuantity += 1;
        toast.info(`${action.payload.name} increased by one`, {
          position: "top-left",
        });
      } else {
        //item does not exist in the cart, so I add the item to the cart
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name} added to cart`, {
          position: "top-left",
        });
      }
      //Save the cartItems to localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    DECREASE_CART: (state, action) => {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[productIndex].cartQuantity > 1) {
        state.cartItems[productIndex].cartQuantity -= 1;
        toast.warn(`${action.payload.name} decreased by one`, {
          position: "top-left",
        });
      } else if (state.cartItems[productIndex].cartQuantity === 1) {
        const newCartItem = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = newCartItem;
        toast.error(`${action.payload.name} removed from cart`, {
          position: "top-left",
        });
      }
      //Save the cartItems to localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    //     REMOVE from cart
    REMOVE_FROM_CART: (state, action) => {
      const newCartItem = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.cartItems = newCartItem;
      toast.error(`${action.payload.name} removed from cart`, {
        position: "top-left",
      });
      //Save the cartItems to localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    //     CLEAR_CART
    CLEAR_CART: (state) => {
      state.cartItems = [];
      toast.error(`Cart cleared`, {
        position: "top-left",
      });
      //Save the cartItems to localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    //     CALCULATE TOTALS
    CALCULATE_SUB_TOTAL: (state) => {
      const array = [];
      state.cartItems.map((item) => {
        const { cartQuantity, price } = item;
        const countItemAmount = cartQuantity * price;
        return array.push(countItemAmount);
      });
      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalAmount = totalAmount;
    },

    //     CALCULATE TOTAL QUANTITY
    CALCULATE_TOTAL_QUANTITY: (state) => {
      const array = [];
      state.cartItems.map((item) => {
        const { cartQuantity } = item;
        const quantity = cartQuantity;
        return array.push(quantity);
      });
      const totalQuantity = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalQuantity = totalQuantity;
    },
  },
});

export const {
  ADD_TO_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CALCULATE_SUB_TOTAL,
  CALCULATE_TOTAL_QUANTITY,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;

export default cartSlice.reducer;
