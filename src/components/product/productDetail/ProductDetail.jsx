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

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  // I used the useSelector hook to get the cart items from the redux store
  const cartItems = useSelector(selectCartItems);

  // I used the find method to check if the product exists in the cart
  const cart = cartItems.find((cart) => cart.id === id);

  const isCartAdded = cartItems.findIndex((cart) => {
    return cart.id === id;
  });

  // I Usesd https://firebase.google.com/docs/firestore/query-data/get-data#get_a_document to get a product from the firestore database
  const getProduct = async () => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      const obj = {
        id: docSnap.id,
        ...docSnap.data(),
      };
      // setProduct(docSnap.data());
      setProduct(obj);
    } else {
      toast.error("No such product!");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

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

              <div className={styles.reviews}>
                <h3>Reviews</h3>
                <p>There are no reviews yet.</p>
                {/* <form>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="review">Review</label>
                  <textarea id="review"></textarea>
                </div>
                <button className="--btn --btn-primary">Submit</button>
              </form> */}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductDetail;
