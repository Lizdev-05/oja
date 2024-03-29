import { useEffect, useState } from "react";
import style from "./Header.module.scss";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import ShowOnLogIn, { ShowOnLogOut } from "../hideLinks/HiddenLinks";
import { AdminOnlyLink } from "../adminOnlyRoute/AdminOnlyRoute";
import {
  CALCULATE_TOTAL_QUANTITY,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";

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

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayUsername, setDisplayUsername] = useState("");
  const [scrollPage, setScrollPage] = useState(false);
  const dispatch = useDispatch();
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  // check if user is logged in and who the user is...
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setDisplayUsername(user.displayName);

        if (user.displayName == null) {
          // const userDisplayName = user.email.slice(0, -10);
          const userDisplayName = user.email.split("@")[0];

          const capitalizeUserDisplayName =
            userDisplayName.charAt(0).toUpperCase() + userDisplayName.slice(1);

          setDisplayUsername(capitalizeUserDisplayName);
        } else {
          setDisplayUsername(user.displayName);
        }

        // dispatch user to redux store

        dispatch(
          SET_ACTIVE_USER({
            id: user.uid,
            email: user.email,
            displayName: user.displayName ? user.displayName : displayUsername,
          })
        );
      } else {
        setDisplayUsername("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayUsername]);

  // scroll event
  const fixNavBar = () => {
    if (window.scrollY > 50) {
      setScrollPage(true);
    } else {
      setScrollPage(false);
    }
  };
  window.addEventListener("scroll", fixNavBar);

  const logOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout successful...");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const cart = (
    <span className={style.cart}>
      <NavLink to="/cart" className={activeLink}>
        Cart
        <FaShoppingCart size={20} />
        <p>{cartTotalQuantity}</p>
      </NavLink>
    </span>
  );

  return (
    <header className={scrollPage ? `${style.fixed}` : null}>
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
              <AdminOnlyLink>
                <Link to="/admin/home">
                  <button className="--btn --btn-secondary">Admin</button>
                </Link>
              </AdminOnlyLink>
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
              <ShowOnLogOut>
                <NavLink to="/login" className={activeLink}>
                  Login
                </NavLink>
              </ShowOnLogOut>
              <ShowOnLogIn>
                <a href="#home" style={{ color: "#ff4500" }}>
                  <FaUserCircle size={16} />
                  Hi, {displayUsername}
                </a>
              </ShowOnLogIn>
              <ShowOnLogIn>
                <NavLink to="/order-history" className={activeLink}>
                  My Orders
                </NavLink>
              </ShowOnLogIn>
              <ShowOnLogIn>
                <NavLink to="/" onClick={logOut}>
                  Logout
                </NavLink>
              </ShowOnLogIn>
              {/* <ShowOnLogIn>
                <a href="#Home" style={{ color: "#ff4500" }}>
                  <FaUserCircle size={16} />
                  Hello, {displayUsername}
                </a>

                <NavLink to="/order-history" className={activeLink}>
                  Order
                </NavLink>
                <NavLink to="/" onClick={logOut}>
                  Logout
                </NavLink>
              </ShowOnLogIn> */}
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
