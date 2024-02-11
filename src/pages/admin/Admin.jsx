import React from "react";
import styles from "./Admin.module.scss";
import SideBar from "../../components/admin/sideBar/SideBar";
import Home from "../../components/admin/home/Home";
import { Route, Routes } from "react-router-dom";

import ViewProducts from "../../components/admin/viewProducts/ViewProducts";
import Orders from "../../components/admin/orders/Orders";
import AddProduct from "../../components/admin/addProduct/AddProduct";
import OrderDetails from "../../components/admin/orderDetails/OrderDetails";

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <SideBar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="/all-products" element={<ViewProducts />} />
          <Route path="/add-product/:id" element={<AddProduct />} />

          <Route path="/view-orders" element={<Orders />} />
          <Route path="/order-details/:id" element={<OrderDetails />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
