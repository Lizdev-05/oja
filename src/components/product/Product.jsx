import React, { useEffect, useState } from "react";
import styles from "./Product.module.scss";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_PRICE_RANGE,
  STORE_PRODUCTS,
  selectProducts,
} from "../../redux/slice/productSlice";
import useFetchCollection from "../../customHooks/useFetchCollection";
import spinnerImg from "../../assets/spinner.jpg";
import { FaCog } from "react-icons/fa";

const Product = () => {
  const { data, isLoading } = useFetchCollection("products");
  const [showFilter, setShowFilter] = useState(false);

  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  useEffect(() => {
    if (data && data.length > 0) {
      dispatch(
        STORE_PRODUCTS({
          products: data,
        })
      );
      dispatch(
        GET_PRICE_RANGE({
          products: data,
        })
      );
    }
  }, [dispatch, data]);

  const showFilterFn = () => {
    setShowFilter(!showFilter);
  };

  return (
    <section className={`container ${styles.product}`}>
      <aside
        className={
          showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`
        }
      >
        {isLoading ? null : <ProductFilter />}
      </aside>
      <div className={styles.content}>
        {isLoading ? (
          <img
            src={spinnerImg}
            alt="loading..."
            className="--center-all"
            style={{ width: "50px" }}
          />
        ) : (
          <ProductList products={products} />
        )}

        <div className={styles.icon} onClick={showFilterFn}>
          <FaCog size={20} color="orangered" />
          <p>
            <b>{showFilter ? "Hide filter" : "Show filter"}</b>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Product;
