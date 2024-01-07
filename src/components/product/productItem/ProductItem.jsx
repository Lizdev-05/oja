import React from "react";
import styles from "./ProductItem.module.scss";
import Card from "../../card/Card";
import { Link } from "react-router-dom";

const ProductItem = ({
  product,
  grid,
  id,
  name,
  price,
  description,
  imageURL,
}) => {
  const shortenText = (text, maxLength) => {
    if (text.length > maxLength) {
      const shortenedText = text.substr(0, maxLength).concat("...");
      return shortenedText;
    }
    return text;
  };

  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
      <Link to={"/product-details"}>
        <div className={styles.img}>
          <img src={imageURL} alt={name} />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          <p> {`$${price}`}</p>
          <h4>{shortenText(name, 18)}</h4>
        </div>
      </div>
    </Card>
  );
};

export default ProductItem;
