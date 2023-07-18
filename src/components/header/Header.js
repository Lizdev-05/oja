import React from "react";
import style from "./Header.module.scss";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const logo = (
  <div className={style.logo}>
    <Link to="/">
      <h2>
        Ọ<span>JÀ</span>.
      </h2>
    </Link>
  </div>
);
const Header = () => {
  return (
    <header>
      <div className={style.header}>
        {logo}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              {" "}
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
          <div className={style["header-right"]}>
            <span className={style.links}>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
              <Link to="/order-history">Order</Link>
            </span>

            <span className={style.cart}>
              <Link to="/cart">
                <FaShoppingCart size={20} />
              </Link>
            </span>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
