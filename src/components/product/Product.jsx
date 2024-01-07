import React, { useEffect } from "react";
import styles from "./Product.module.scss";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";
import { useDispatch, useSelector } from "react-redux";
import { STORE_PRODUCTS, selectProducts } from "../../redux/slice/productSlice";
import useFetchCollection from "../../customHooks/useFetchCollection";
import spinnerImg from "../../assets/spinner.jpg";

const Product = () => {
  const { data, isLoading } = useFetchCollection("products");

  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  console.log(products);

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);
  return (
    <section className={`container ${styles.product}`}>
      <aside className={styles.filter}>
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
      </div>
    </section>
  );
};

export default Product;
