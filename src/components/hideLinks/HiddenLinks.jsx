import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";

const ShowOnLogIn = ({ children }) => {
  if (selectIsLoggedIn) {
    const loggedIn = useSelector(selectIsLoggedIn);
    if (loggedIn) {
      return <div>{children}</div>;
    } else {
      return null;
    }
  }
};

export const ShowOnLogOut = ({ children }) => {
  if (selectIsLoggedIn) {
    const loggedIn = useSelector(selectIsLoggedIn);
    if (!loggedIn) {
      return <div>{children}</div>;
    } else {
      return null;
    }
  }
};
export default ShowOnLogIn;
