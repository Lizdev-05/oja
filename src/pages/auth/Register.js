import React from "react";
import { Link } from "react-router-dom";
import registerImg from "../../assets/register.png";
import Card from "../../components/card/Card";
import style from "./Auth.module.scss";

const Register = () => {
  return (
    <section className={`container ${style.auth}`}>
      <Card>
        <div className={style.form}>
          <h2>Login</h2>
          <form>
            <input type="email" placeholder="Enter your email" required />
            <input type="password" placeholder="Enter password" required />
            <input type="password" placeholder="Confirm password" required />
            <button className="--btn --btn-primary --btn-block">
              Register
            </button>
          </form>

          <span className={style.register}>
            <p>Already have an account?</p>
            <Link to="/login">Login</Link>
          </span>
        </div>
      </Card>
      <div className={style.img}>
        <img src={registerImg} alt="Register Description" width="400" />
      </div>
    </section>
  );
};

export default Register;
