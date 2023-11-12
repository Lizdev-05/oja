import React from "react";
import { Link } from "react-router-dom";
import resetImg from "../../assets/forgot.png";
import style from "./Auth.module.scss";
import Card from "../../components/card/Card";

const Reset = () => {
  return (
    <section className={`container ${style.auth}`}>
      <div className={style.img}>
        <img src={resetImg} alt="Reset Description" width="400" />
      </div>
      <Card>
        <div className={style.form}>
          <h2>Reset</h2>
          <form>
            <input type="email" placeholder="Enter your email" required />

            <button className="--btn --btn-primary --btn-block">
              Reset Password
            </button>

            <div className={style.links}>
              <p>
                <Link to="/login">- Login</Link>
              </p>
              <p>
                <Link to="/register">- Register</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </section>
  );
};

export default Reset;
