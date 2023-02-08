import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/LoginContext";

export const ProtectedRoutes = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};