import React from "react";
import loaderImg from "../../assets/loader.gif";
import style from "./Loader.module.scss";
import ReactDOM from "react-dom";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className={style.wrapper}>
      <div className={style.loader}>
        <img src={loaderImg} alt="loading..." />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;
