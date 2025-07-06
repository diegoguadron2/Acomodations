import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

//Esta ruta solo valida si el usuario está autenticado
export default function Protected() {
  const Auth = useAuth();
  return Auth.isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}
