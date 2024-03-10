import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ children, privateRole }) => {
  const { isUserLogged, userRole } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(isUserLogged, userRole);
    setLoading(true);
  }, [isUserLogged, userRole]);

  if (!loading) {
    // Render a loading placeholder, spinner, or any other UI element
    return <div>Loading...</div>;
  }

  if (!isUserLogged) {
    return <Navigate to="/" replace />;
  } else if (privateRole && privateRole !== userRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
