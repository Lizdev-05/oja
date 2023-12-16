import React from "react";
import style from "./SideBar.module.scss";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectUserName } from "../../../redux/slice/authSlice";
import { NavLink } from "react-router-dom";

const activeLink = ({ isActive }) => (isActive ? `${style.active}` : "");
const SideBar = () => {
  const userName = useSelector(selectUserName);
  return (
    <div className={style.navbar}>
      <div className={style.user}>
        <FaUserCircle size={40} color="#ffffff" />
        <h4>{userName}</h4>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/home" className={activeLink}>
              Home{" "}
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/add-product" className={activeLink}>
              {" "}
              Add Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-products" className={activeLink}>
              {" "}
              All Products{" "}
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className={activeLink}>
              {" "}
              View Orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
