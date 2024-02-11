import React, { useEffect, useState } from "react";
import style from "./OrderDetails.module.scss";
import { Link, useParams } from "react-router-dom";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import spinnerImg from "../../../assets/spinner.jpg";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);

  const { id } = useParams();
  const { document } = useFetchDocument("orders", id);

  useEffect(() => {
    setOrder(document);
  }, [document]);

  return (
    <>
      <div className={style.table}>
        <h2>Order Details</h2>

        <div>
          <Link to="/admin/orders">&larr; Back To Orders</Link>
        </div>
        <br />
        {order === null ? (
          <img src={spinnerImg} alt="Loading..." style={{ width: "50px" }} />
        ) : (
          <>
            <p>
              <b>Order ID: </b>
              {order.id}{" "}
            </p>{" "}
            <p>
              <b>Order Amount: </b>
              {order.orderAmount}{" "}
            </p>{" "}
            <p>
              <b>Order Status: </b>
              {order.orderStatus}{" "}
            </p>
            <p>
              <b>Shipping Address: </b>
              <br />
              Address: {order.shippingAddress.line1},{" "}
              {order.shippingAddress.line2}
              <br />
              City: {order.shippingAddress.city}
              <br />
              State: {order.shippingAddress.state}
              <br />
              Country: {order.shippingAddress.country}
              <br />
            </p>
            <br />
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((cart, index) => {
                  const { id, name, imageURL, price, cartQuantity } = cart;
                  const total = price * cartQuantity.toFixed(2);
                  return (
                    <tr key={id}>
                      <b>
                        {" "}
                        <td>{index + 1}</td>
                      </b>
                      <td>
                        <p>{name}</p>
                        <img
                          src={imageURL}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>

                      <td>${price}</td>
                      <td>{cartQuantity}</td>
                      <td>${total}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
};

export default OrderDetails;
