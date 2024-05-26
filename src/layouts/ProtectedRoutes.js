import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = () => {

  let location = useLocation();
  
  let isAuthenticated = sessionStorage.getItem("id");
  if(isAuthenticated && isAuthenticated?.length > 0) {
    sessionStorage.setItem("currentPath", location.pathname);
  }

  return isAuthenticated !== undefined && isAuthenticated?.length > 0 ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoutes;
