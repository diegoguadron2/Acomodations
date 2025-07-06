import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../auth/Login"; // Importar el servicio de autenticación



export default function Login() {
  // Estados para almacenar el usuario y la contraseña
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Hook para acceder al contexto de autenticación
  const { setIsAuthenticated } = useAuth();

  const Goto = useNavigate();
  //Envio de formulario a la API
  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Usuario:", username);
    console.log("Contraseña:", password);

    try {
      // Llamar al metodo de login
      const { token, user } = await login(username, password);

      // Guardar token y actualizar estado
      sessionStorage.setItem("authToken", token);
      setIsAuthenticated(true);
      console.log(token + " " + user);
      Goto("/dashboard");
    } catch (error) {
      console.error("Error en handleSubmit:", error.message);
    }


  }

  // Verificar si el usuario ya está autenticado
  const auth = useAuth();
  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Bienvenido</h1>
          <p className="text-gray-400 mt-2">Ingresa tus credenciales</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Usuario
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="tu@usuario.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
