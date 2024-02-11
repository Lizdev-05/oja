import React, { useState } from "react";
import style from "./StateOrderStatus.module.scss";

import Loader from "../../loader/Loader";
import Card from "../../card/Card";

const ChangeOrderStatus = () => {
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const editOrder = (e) => {
    e.preventDefault();
    setIsLoading(true);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={style.status}>
        <Card cardClass={style.card}>
          <h3>Update Status</h3>

          <form onSubmit={editOrder}>
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
