import useAuth from "../Context/useAuth/useAuth";
import useRole from "../hooks/useRole";
import Loader from "../Pages/Loader/Loader";
import { Navigate } from "react-router";

const NotSellerAdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isLoading } = useRole(user);

  if (loading || isLoading) return <Loader />;

  if (!user || role === "seller" || role === "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default NotSellerAdminRoute;
