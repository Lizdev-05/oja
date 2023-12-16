import { useSelector } from "react-redux";
import { selectUserEmail } from "../../redux/slice/authSlice";

const AdminOnlyRoute = ({ children }) => {
  const adminUserEmail = useSelector(selectUserEmail);

  if (adminUserEmail === "ojesanmioyinlade@gmail.com") {
    return children;
  }

  return null;
};
export default AdminOnlyRoute;
