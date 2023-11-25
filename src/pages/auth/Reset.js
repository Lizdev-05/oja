import React, { useState } from "react";
import { Link } from "react-router-dom";
import resetImg from "../../assets/forgot.png";
import style from "./Auth.module.scss";
import Card from "../../components/card/Card";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false);
        toast.success("Password reset email sent successfully...");
      })
      .catch((error) => {
        setIsLoading(false);

        const errorMessage = error.message;
        toast.error(errorMessage);
        // ..
      });
  };
  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${style.auth}`}>
        <div className={style.img}>
          <img src={resetImg} alt="Reset Description" width="400" />
        </div>
        <Card>
          <div className={style.form}>
            <h2>Reset</h2>
            <form onSubmit={resetPassword}>
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button className="--btn --btn-primary --btn-block" type="submit">
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
    </>
  );
};

export default Reset;
