import React from "react";
import styles from "./Admin.module.scss";
import SideBar from "../../components/admin/sideBar/SideBar";
import Home from "../../components/admin/home/Home";
import { Route, Routes } from "react-router-dom";

import ViewProducts from "../../components/admin/viewProducts/ViewProducts";
import Orders from "../../components/admin/orders/Orders";
import AddProducts from "../../components/admin/addProducts/AddProducts";

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <SideBar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="/addProducts" element={<AddProducts />} />
          <Route path="/viewProducts" element={<ViewProducts />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
