import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const isLoggedIn = JSON.parse(localStorage.getItem("users"));
  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
