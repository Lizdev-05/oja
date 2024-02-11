import React, { useEffect } from "react";
import style from "./Home.module.scss";
import InfoBox from "../../infoBox/InfoBox";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  STORE_PRODUCTS,
  selectProducts,
} from "../../../redux/slice/productSlice";
import {
  CAL_TOTAL_ORDER_AMOUNT,
  STORE_ORDERS,
  selectOrderHistory,
  selectTotalOrderAmount,
} from "../../../redux/slice/orderSlice";
import useFetchCollection from "../../../customHooks/useFetchCollection";

const Home = () => {
  const product = useSelector(selectProducts);
  const orders = useSelector(selectOrderHistory);
  const totalOrderAmount = useSelector(selectTotalOrderAmount);

  const fireBaseProducts = useFetchCollection("products");
  const { data } = useFetchCollection("orders");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(STORE_PRODUCTS({ products: fireBaseProducts.data }));
    dispatch(STORE_ORDERS(data));
    dispatch(CAL_TOTAL_ORDER_AMOUNT());
  }, [fireBaseProducts.data, data, dispatch]);

  const earningIcons = <AiFillDollarCircle size={30} color="#b624ff" />;
  const productIcons = <BsCart4 size={30} color="#1f93ff" />;
  const orderIcons = <FaCartArrowDown size={30} color="orangered" />;

  return (
    <div className={style.home}>
      <h2>Admin Home</h2>
      <div className={style["info-box"]}>
        <InfoBox
          cardClass={`${style.card} ${style.card1}`}
          title={"Earnings"}
          count={`$${totalOrderAmount} `}
          icon={earningIcons}
        />

        <InfoBox
          cardClass={`${style.card} ${style.card2}`}
          title={"Products"}
          count={product.length}
          icon={productIcons}
        />

        <InfoBox
          cardClass={`${style.card} ${style.card3}`}
          title={"Orders"}
          count={orders.length}
          icon={orderIcons}
        />
      </div>
    </div>
  );
};

export default Home;
