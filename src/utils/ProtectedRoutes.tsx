import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext, type AuthContextProps } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { user, loading } = useContext(AuthContext) as AuthContextProps;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}
