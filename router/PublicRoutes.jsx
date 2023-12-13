import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = ({ isAuthenticate, redirectPath = "/home", children }) => {
  if (isAuthenticate) return <Navigate to={redirectPath} />;
  return <div>{children ? children : <Outlet />}</div>;
};

export default PublicRoutes;
