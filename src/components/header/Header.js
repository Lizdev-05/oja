import React from "react";
import style from "./Header.module.scss";

const Header = () => {
  return (
    <header>
      <div className={style.header}>
        <div className={style.logo}>
          <h2>
            Ọ <span>JÀ</span>.
          </h2>
        </div>
      </div>
    </header>
  );
};

export default Header;
