import React, { useState } from "react";
import style from "./StateOrderStatus.module.scss";

import Loader from "../../loader/Loader";
import Card from "../../card/Card";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ChangeOrderStatus = ({ order, id }) => {
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const editOrder = (e, id) => {
    e.preventDefault();
    setIsLoading(true);

    const orderConfig = {
      userID: order.userID,
      customerEmail: order.customerEmail,
      orderDate: order.orderDate,
      orderTime: order.orderTime,
      orderAmount: order.orderAmount,
      shippingAddress: order.shippingAddress,
      orderStatus: status,
      cartItems: order.cartItems,
      createdAt: order.createdAt,
      editedAt: Timestamp.now().toDate(),
    };

    try {
      setDoc(doc(db, "orders", id), orderConfig);
      setIsLoading(false);
      toast.success("Order status changed successfully");
      navigate("/admin/orders");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={style.status}>
        <Card cardClass={style.card}>
          <h3>Update Status</h3>

          <form onSubmit={(e) => editOrder(e, id)}>
            <span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="" disabled>
                  -- Choose One --
                </option>
                <option value="Order Placed">Order Placed...</option>
                <option value="Processing">Processing...</option>
                <option value="Shipped">Shipped...</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </span>
            <span>
              <button type="submit" className="--btn --btn-primary">
                {" "}
                Update Status
              </button>
            </span>
          </form>
        </Card>
      </div>
    </>
  );
};

export default ChangeOrderStatus;
