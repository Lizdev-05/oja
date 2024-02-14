/* eslint-disable no-unused-vars */
import { doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../../firebase/config";
import { useEffect } from "react";
import { toast } from "react-toastify";
import styles from "./ProductDetail.module.scss";
import spinnerImg from "../../../assets/spinner.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  DECREASE_CART,
  selectCartItems,
} from "../../../redux/slice/cartSlice";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import Card from "../../card/Card";
import StarsRating from "react-star-rate";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  // I used the useSelector hook to get the cart items from the redux store
  const cartItems = useSelector(selectCartItems);

  // I used the useFetchDocument custom hook to get a product from the firestore database
  const { document } = useFetchDocument("products", id);

  // I used the find method to check if the product exists in the cart
  const cart = cartItems.find((cart) => cart.id === id);

  const isCartAdded = cartItems.findIndex((cart) => {
    return cart.id === id;
  });

  // I used the useFetchCollection custom hook to get the reviews from the firestore database
  const { data } = useFetchCollection("reviews");
  const filteredReviews = data.filter((review) => review.productID === id);

  //***************** I moved this logic to the  custsomss hooks specifically, useFetchDocument ************************ */
  // I Usesd https://firebase.google.com/docs/firestore/query-data/get-data#get_a_document to get a product from the firestore database
  // const getProduct = async () => {
  //   const docRef = doc(db, "products", id);
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     // console.log("Document data:", docSnap.data());
  //     const obj = {
  //       id: docSnap.id,
  //       ...docSnap.data(),
  //     };
  //     // setProduct(docSnap.data());
  //     setProduct(obj);
  //   } else {
  //     toast.error("No such product!");
  //   }
  // };

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Product Details</h2>
        <div>
          <Link to="/#products">&larr; Back to products</Link>
        </div>
        {product === null ? (
          <img src={spinnerImg} alt="loading..." style={{ width: "50px" }} />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className={styles.content}>
                <h3>{product.name}</h3>
                <p className={styles.price}>{`$${product.price}`}</p>
                <p>{product.description}</p>
                <p>
                  <b>SKU</b> {product.id}
                </p>
                <p>
                  <b>BRAND</b> {product.brand}
                </p>
                <div className={styles.count}>
                  {isCartAdded < 0 ? null : (
                    <>
                      <button
                        className="--btn"
                        onClick={() => decreaseCart(product)}
                      >
                        -
                      </button>
                      <p>{cart.cartQuantity}</p>
                      <button
                        className="--btn"
                        onClick={() => addToCart(product)}
                      >
                        +
                      </button>
                    </>
                  )}
                </div>
                <button
                  className="--btn --btn-danger"
                  onClick={() => addToCart(product)}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </>
        )}
        <Card cardClass={styles.card}>
          <h3>Product Review</h3>
          <div>
            {filteredReviews.length === 0 ? (
              <p>No review for this product yet</p>
            ) : (
              <>
                {filteredReviews.map((item, index) => {
                  const { rate, review, reviewDate, userName } = item;
                  return (
                    <div className="style.review" key={index}>
                      <StarsRating value={rate} />
                      <p>{review}</p>
                      <span>{reviewDate}</span>
                      <br />
                      <span>By: {userName}</span>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ProductDetail;
