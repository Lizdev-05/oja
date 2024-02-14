/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import style from "./Orders.module.scss";
import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import { useNavigate } from "react-router-dom";
import {
  STORE_ORDERS,
  selectOrderHistory,
} from "../../../redux/slice/orderSlice";
import { selectUserID } from "../../../redux/slice/authSlice";
import Loader from "../../loader/Loader";

const Orders = () => {
  const { data, isLoading } = useFetchCollection("orders");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector(selectOrderHistory);
  const userID = useSelector(selectUserID);

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [data, dispatch]);

  const handleClick = (id) => () => {
    navigate(`/admin/order-details/${id}`);
  };

  return (
    <>
      <div className={style.order}>
        <h2>Your Order History</h2>
        <p>
          Open an order to <b>change order status</b>{" "}
        </p>
        <br />
        <>
          {isLoading && <Loader />}
          <div className={style.table}>
            {orders.length === 0 ? (
              <p>No order found</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Date</th>
                    <th>Order ID</th>
                    <th>Order Amount</th>
                    <th>Order Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => {
                    const {
                      id,
                      orderDate,
                      orderTime,
                      orderAmount,
                      orderStatus,
                    } = order;
                    return (
                      <tr key={id} onClick={handleClick(id)}>
                        <td>{index + 1}</td>
                        <td>
                          {orderDate} {orderTime}
                        </td>
                        <td>{id}</td>
                        <td>${orderAmount}</td>
                        <td>
                          <p
                            className={
                              orderStatus !== "Delivered"
                                ? `${style.pending}`
                                : `${style.delivered}`
                            }
                          >
                            {orderStatus}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      </div>
    </>
  );
};

export default Orders;
