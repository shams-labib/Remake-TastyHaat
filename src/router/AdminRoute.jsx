import React from "react";
import useAuth from "../Context/useAuth/useAuth";
import useRole from "../hooks/useRole";
import { Link } from "react-router";
import Loader from "../Pages/Loader/Loader";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isLoading } = useRole(user);

  if (loading || isLoading || !user) {
    return <Loader />;
  }

  if (role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-primary text-3xl font-bold mb-4">
            Access Denied
          </h2>
          <p className="text-base mt-2">
            You do not have permission to view this page.
          </p>
          <p className="text-base mt-2">
            Please check your credentials and try again.
          </p>
          <div className="flex items-center gap-2 mt-6 justify-center">
            <Link
              to="/"
              className="btn text-white bg-primary/90 hover:bg-primary"
            >
              Go to Home
            </Link>
            <Link
              to="/dashboard"
              className="btn text-primary border border-primary hover:bg-primary hover:text-white"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default AdminRoute;
