import React from "react";
import loaderImg from "../../assets/loader.gif";
import style from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.loader}>
        <img src={loaderImg} alt="loader" />
      </div>
    </div>
  );
};

export default Loader;
