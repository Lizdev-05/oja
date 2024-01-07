import React, { useState } from "react";
import styles from "./ProductList.module.scss";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import Search from "../../search/Search";

const ProductList = () => {
  const [grid, setGrid] = useState(true);

  return (
    <div className={styles["product-list"]} id="product">
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill
            size={22}
            color="orangered"
            onClick={() => setGrid(true)}
          />
          <FaListAlt color="#0066d4" size={22} onClick={() => setGrid(false)} />
          <p>
            <b>14</b> products found
          </p>
        </div>
        {/* Search  */}
        <div>
          <Search />
        </div>

        {/* Sort */}
        <div className={styles.sort}>
          <label>Sort by:</label>
          <select>
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="higest-price">Higest Price</option>

            <option value="a-z"> A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
