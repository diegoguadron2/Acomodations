import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import Header from "./Header";

export function ProtectedLayout({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">{children}</main>
    </div>
  );
}
