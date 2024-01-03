import React from "react";
import "./Home.module.scss";
import Slider from "../../components/slider/Slider";
import AdminOnlyRoute from "../../components/adminOnlyRoute/AdminOnlyRoute";
import Product from "../../components/product/Product";

const Home = () => {
  // return <Slider />;
  return (
    <div>
      <Product />
    </div>
  );
};

export default Home;
