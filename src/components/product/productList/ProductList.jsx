import React, { useState } from "react";
import styles from "./ProductList.module.scss";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import Search from "../../search/Search";
import ProductItem from "../productItem/ProductItem";

const ProductList = ({ products }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");

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
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
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

      {/* Product List */}

      <div className={grid ? `${styles.grid}` : `${styles.list}`}>
        {products.length === 0 ? (
          <p>No product found</p>
        ) : (
          <>
            {products.map((product) => {
              return (
                <div key={product.id}>
                  <ProductItem {...product} grid={grid} product={product} />
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
