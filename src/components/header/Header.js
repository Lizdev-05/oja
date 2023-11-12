import { useState } from "react";
import style from "./Header.module.scss";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
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

const activeLink = ({ isActive }) => (isActive ? `${style.active}` : "");
const cart = (
  <span className={style.cart}>
    <NavLink to="/cart" className={activeLink}>
      Cart
      <FaShoppingCart size={20} />
      <p>0</p>
    </NavLink>
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
          <ul onClick={hideMenu}>
            <li className={style["logo-mobile"]}>
              {logo}
              <FaTimes size={22} onClick={hideMenu} />
            </li>
            <li>
              <NavLink to="/" className={activeLink}>
                Home
              </NavLink>
            </li>
            <li>
              {" "}
              <NavLink to="/contact" className={activeLink}>
                Contact
              </NavLink>
            </li>
          </ul>
          <div className={style["header-right"]} onClick={hideMenu}>
            <span className={style.links}>
              <NavLink to="/login" className={activeLink}>
                Login
              </NavLink>
              <NavLink to="/register" className={activeLink}>
                Register
              </NavLink>
              <NavLink to="/order-history" className={activeLink}>
                Order
              </NavLink>
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
