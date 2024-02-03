import React from "react";
import styles from "./Cart.module.scss";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const totalQuantity = useSelector(selectCartTotalQuantity);

  return (
    <div className={styles}>
      <h1>Cart</h1>
    </div>
  );
};

export default Cart;
