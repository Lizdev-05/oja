import React, { useEffect, useState } from "react";
import styles from "./ProductFilter.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../../../redux/slice/productSlice";
import {
  FILTER_BY_CATEGORY,
  FILTER_BY_BRAND,
} from "../../../redux/slice/filterSlice";

const ProductFilter = () => {
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");

  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  const allCategories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  useEffect(() => {
    dispatch(FILTER_BY_CATEGORY({ products, category }));
  }, [dispatch, products, category]);

  const allBrands = [
    "All",
    ...new Set(products.map((product) => product.brand)),
  ];

  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products, brand }));
  }, [dispatch, products, brand]);

  const filterProduct = (cat) => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({ products, category: cat }));
  };
  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        {allCategories.map((cat, index) => (
          <button
            key={index}
            className={`${category}` === cat ? `${styles.active}` : null}
            onClick={() => filterProduct(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <h4>Brand</h4>
      <div className={styles.brand}>
        <select
          name="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        >
          {allBrands.map((brand, index) => (
            <option key={index} value={brand}>
              {brand}
            </option>
          ))}
          {/* <option value="all">All</option> */}
        </select>
      </div>
      <h4>Price</h4>
      15000
      <div className={styles.price}>
        <input type="range" name="price" min="100" max="1000" />
      </div>
      <br />
      <button className="--btn --btn-danger">Clear Filter</button>
    </div>
  );
};

export default ProductFilter;
