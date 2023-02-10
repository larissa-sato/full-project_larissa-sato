import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/LoginContext";
import { RegisterContext } from "../../Context/RegisterContext";

export const ProtectedRoutes = () => {
  const { user } = useContext(RegisterContext);
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};