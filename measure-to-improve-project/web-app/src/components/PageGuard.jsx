import React from "react";
import { Navigate } from "react-router-dom";

const PageGuard = ({ children, auth = true }) => {
  if (auth) return children;
  else {
    return <Navigate to="/" replace />;
  }
};

export default PageGuard;
