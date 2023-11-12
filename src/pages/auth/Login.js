import React from "react";
import style from "./Auth.module.scss";
import loginImage from "../../assets/login.png";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Card from "../../components/card/Card";

const Login = () => {
  return (
    <section className={`container ${style.auth}`}>
      <div className={style.img}>
        <img src={loginImage} alt="Login Description" width="400" />
      </div>
      <Card>
        <div className={style.form}>
          <h2>Login</h2>
          <form>
            <input type="email" placeholder="Enter your email" required />
            <input type="password" placeholder="Enter password" required />
            <button className="--btn --btn-primary --btn-block">Login</button>
            <div className={style.links}>
              <Link to="/reset">Forgot password?</Link>
            </div>
          </form>
          <button className="--btn --btn-danger --btn-block">
            {" "}
            <FaGoogle /> Login with google
          </button>
          <span className={style.register}>
            <p>Don't have an account?</p>
            <Link to="/register">Register</Link>
          </span>
        </div>
      </Card>
    </section>
  );
};

export default Login;
