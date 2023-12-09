import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";

const ShowOnLogIn = ({ children }) => {
  const loggedIn = useSelector(selectIsLoggedIn);
  {
    return loggedIn ? <div>{children}</div> : null;
  }
};

export const ShowOnLogOut = ({ children }) => {
  const loggedIn = useSelector(selectIsLoggedIn);
  {
    return !loggedIn ? <div>{children}</div> : null;
  }
};
export default ShowOnLogIn;
