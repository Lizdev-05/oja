import React, { useEffect } from "react";
import "./Home.module.scss";
import Slider from "../../components/slider/Slider";
import Product from "../../components/product/Product";

const Home = () => {
  const url = window.location.href;

  useEffect(() => {
    const scrollToProduct = () => {
      if (url.includes("#product")) {
        window.scrollTo({
          top: 700,
          behavior: "smooth",
        });
        return;
      }
    };

    scrollToProduct();
  }, [url]);

  return (
    <div>
      <Slider />
      <Product />
    </div>
  );
};

export default Home;
