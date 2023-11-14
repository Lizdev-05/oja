import { useState } from "react";
import { Link } from "react-router-dom";
import registerImg from "../../assets/register.png";
import Card from "../../components/card/Card";
import style from "./Auth.module.scss";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerUser = (e) => {
    e.preventDefault();
    console.log(email, password, confirmPassword);
  };

  return (
    <section className={`container ${style.auth}`}>
      <Card>
        <div className={style.form}>
          <h2>Login</h2>
          <form onSubmit={registerUser}>
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
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
