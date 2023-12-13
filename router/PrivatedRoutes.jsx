import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivatedRoutes = ({
  isAuthenticate,
  redirectPath = "/Register",
  children,
}) => {
  if (!isAuthenticate) return <Navigate to={redirectPath} />;
  return <div>{children ? children : <Outlet />}</div>;
};

export default PrivatedRoutes;
