import React from "react";
import style from "./Home.module.scss";
import InfoBox from "../../infoBox/InfoBox";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";

const Home = () => {
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
          count={"$ 1000"}
          icon={earningIcons}
        />

        <InfoBox
          cardClass={`${style.card} ${style.card2}`}
          title={"Products"}
          count={"78"}
          icon={productIcons}
        />

        <InfoBox
          cardClass={`${style.card} ${style.card3}`}
          title={"Orders"}
          count={"50"}
          icon={orderIcons}
        />
      </div>
    </div>
  );
};

export default Home;
