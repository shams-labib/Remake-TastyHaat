import React from "react";
import useAuth from "../Context/useAuth/useAuth";
import Loader from "../Pages/Loader/Loader";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default PrivateRoute;
