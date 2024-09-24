import { Navigate, Outlet,  } from "react-router";

const PrivateRoute = () => {
  const username = localStorage.getItem("username");
  // const location = useLocation();
  // if (location.pathname === "/login") {
  //   return <Navigate to="/" />;
  // } else {
  return username ? <Outlet /> : <Navigate to="/login" />;
  // }
};

export default PrivateRoute;
