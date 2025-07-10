import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import Header from "./Header";

export function ProtectedLayout({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="main-content flex-grow  dark:bg-gray-900" >
        {children}
      </main>
    </div>
  );
}
