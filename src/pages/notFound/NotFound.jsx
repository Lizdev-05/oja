import React from "react";
import style from "./NotFound.module.scss";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className={style["not-found"]}>
      <div>
        <h2>404</h2>
        <p>Oppppssss! Page not found</p>
        <button className="--btn">
          <Link to="/"> &larr; Back To Home</Link>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
