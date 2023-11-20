import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import registerImg from "../../assets/register.png";
import Card from "../../components/card/Card";
import style from "./Auth.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../components/loader/Loader";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        // once the user has signed up, set the loading state to false
        setIsLoading(false);
        toast.success("User registered successfully");
        // redirect the user to the login page
        navigate("/login");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        setIsLoading(false);
        // ..
      });

    console.log(email, password, confirmPassword);
  };

  return (
    <>
      <ToastContainer />
      {isLoading && <Loader />}
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
              <button type="submit" className="--btn --btn-primary --btn-block">
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
    </>
  );
};

export default Register;
