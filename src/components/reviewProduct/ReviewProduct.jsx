import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectProducts } from "../../redux/slice/productSlice";

import { selectUserID, selectUserName } from "../../redux/slice/authSlice";
import style from "./ReviewProduct.module.scss";
import Product from "../product/Product";
import Card from "../card/Card";
import StarsRating from "react-star-rate";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../firebase/config";
import useFetchDocument from "../../customHooks/useFetchDocument";
import spinnerImg from "../../assets/spinner.jpg";

const ReviewProduct = () => {
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const { document } = useFetchDocument("products", id);

  const products = useSelector(selectProducts);
  console.log(products);

  const userID = useSelector(selectUserID);
  const userName = useSelector(selectUserName);

  // const product = products.find((item) => item.id === id);

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const submitReview = (e) => {
    e.preventDefault();
    const today = new Date();
    const date = today.toDateString();

    const reviewConfig = {
      userID,
      userName,
      productID: id,
      rate,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),
    };

    try {
      addDoc(collection(db, "reviews"), reviewConfig);

      toast.success("Review submitted successfully!");
      setRate(0);
      setReview("");
      // navigate("/checkout-success");
    } catch (error) {
      toast.error(error.message);
    }
    console.log("Order saved to the database");
  };

  return (
    <section>
      <div className={`container ${style.review}`}>
        <h2>Review Product</h2>
        {product === null ? (
          <img src={spinnerImg} alt="Loading..." style={{ width: "50px" }} />
        ) : (
          <>
            <p>
              <b>Product Name</b> {product.name}
            </p>
            <img src={product.imageURL} alt={Product.name} />
          </>
        )}

        <Card cardClass={style.card}>
          <form onSubmit={(e) => submitReview(e)}>
            <label>Rating:</label>
            <StarsRating
              value={rate}
              onChange={(rate) => {
                setRate(rate);
              }}
            />

            <label>Review:</label>
            <textarea
              cols={30}
              rows={10}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            ></textarea>
            <button type="submit" className="--btn --btn-primary">
              Submit Review
            </button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default ReviewProduct;
