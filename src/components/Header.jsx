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
    <header className="bg-gray-800 text-white py-2 shadow-md">
      <div className="container mx-auto flex flex-row justify-between items-center px-4">
        <nav className="flex items-center space-x-2 sm:space-x-4">
          <Link
            to="/dashboard"
            className="flex items-center space-x-1 sm:space-x-2 hover:bg-gray-700 px-2 sm:px-3 py-1 rounded-md transition-colors text-sm sm:text-base"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
            <span>Inicio</span>
          </Link>
          <Link
            to="/calendar"
            className="flex items-center space-x-1 sm:space-x-2 hover:bg-gray-700 px-2 sm:px-3 py-1 rounded-md transition-colors text-sm sm:text-base"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <span>Calendario</span>
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center hover:bg-red-700 bg-red-600 p-2 sm:px-4 sm:py-1.5 rounded-md transition-colors"
          aria-label="Cerrar sesión"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
              clipRule="evenodd"
            />
          </svg>
          <span className="hidden sm:inline ml-2">Cerrar sesión</span>
        </button>
      </div>
    </header>
  );
}
