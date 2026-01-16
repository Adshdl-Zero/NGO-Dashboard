import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  role: "USER" | "ADMIN";
}

const ProtectedRoute = ({ children, role }: Props) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token || userRole !== role) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
