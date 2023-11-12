import React from "react";
import "./Footer.module.scss";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div style={"footer"}>
      <h1>&copy; {year} All rights reserved</h1>
    </div>
  );
};

export default Footer;
