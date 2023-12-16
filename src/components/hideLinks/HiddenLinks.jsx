import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";

const ShowOnLogIn = ({ children }) => {
  //   const loggedIn = useSelector(selectIsLoggedIn);
  //   {
  //     return loggedIn ? <div>{children}</div> : null;
  //   }
  // };

  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return children;
  }
  return null;
};

export const ShowOnLogOut = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return children;
  }
  return null;
};

export default ShowOnLogIn;
