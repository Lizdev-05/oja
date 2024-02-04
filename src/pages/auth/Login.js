import { useState } from "react";
import style from "./Auth.module.scss";
import loginImage from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Card from "../../components/card/Card";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { useSelector } from "react-redux";
import { selectPreviousUrl } from "../../redux/slice/cartSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // I create  a function to redirect based on the saved previousUrl
  const previousUrl = useSelector(selectPreviousUrl);
  const redirectUser = () => {
    if (previousUrl.includes("cart")) {
      navigate("/cart");
    } else {
      navigate("/");
    }
  };
  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        setIsLoading(false);
        toast.success("Login successful...");
        redirectUser();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  const provider = new GoogleAuthProvider();
  const logInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        toast.success("Login successful...");
        redirectUser();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <>
      <ToastContainer />
      {isLoading && <Loader />}
      <section className={`container ${style.auth}`}>
        <div className={style.img}>
          <img src={loginImage} alt="Login Description" width="400" />
        </div>
        <Card>
          <div className={style.form}>
            <h2>Login</h2>
            <form onSubmit={loginUser}>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                name="password"
                type="password"
                placeholder="Enter password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="--btn --btn-primary --btn-block">Login</button>
              <div className={style.links}>
                <Link to="/reset">Forgot password?</Link>
              </div>
            </form>
            <button
              type="submit"
              className="--btn --btn-danger --btn-block"
              onClick={logInWithGoogle}
            >
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
    </>
  );
};

export default Login;
