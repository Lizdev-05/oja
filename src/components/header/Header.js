import { useState } from "react";
import style from "./Header.module.scss";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const logo = (
  <div className={style.logo}>
    <Link to="/">
      <h2>
        Ọ<span>JÀ</span>.
      </h2>
    </Link>
  </div>
);

const cart = (
  <span className={style.cart}>
    <Link to="/cart">
      Cart
      <FaShoppingCart size={20} />
      <p>0</p>
    </Link>
  </span>
);
const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  return (
    <header>
      <div className={style.header}>
        {logo}
        <nav
          className={showMenu ? `${style["show-nav"]}` : `${style["hide-nav"]}`}
        >
          {/* // wrapper for shadow */}
          <div
            className={
              showMenu
                ? `${style["nav-wrapper"]} ${style["show-nav-wrapper"]}`
                : `${style["nav-wrapper"]}`
            }
            onClick={hideMenu}
          ></div>
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

            {cart}
          </div>
        </nav>
        <div className={style["menu-icon"]}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
