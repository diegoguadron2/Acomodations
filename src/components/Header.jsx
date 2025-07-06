// components/Header.jsx
import { useAuth } from "../auth/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    setIsAuthenticated(false);
    console.log("Sesión cerrada");
    navigate("/");
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <nav className="flex space-x-4">
          <Link to="/dashboard" className="hover:text-gray-300">
            Dashboard
          </Link>
          <Link to="/create" className="hover:text-gray-300">
            Create
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}
