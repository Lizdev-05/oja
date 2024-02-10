import React from "react";
import style from "./OrderHistory.module.scss";
import useFetchCollection from "../../customHooks/useFetchCollection";

const OrderHistory = () => {
  const { data, isLoading, error } = useFetchCollection("orders");

  console.log(data);

  return (
    <section>
      <div className="container">
        <h2>Order History</h2>
        <div className={style.orderHistory}>
          {data &&
            data.map((order) => {
              return (
                <div key={order.id} className={style.order}>
                  <h3>Order ID: {order.id}</h3>
                  <p>Amount: {order.amount}</p>
                  <p>
                    Created: {new Date(order.created * 1000).toLocaleString()}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default OrderHistory;
