import { useContext, createContext, useState, useEffect } from "react";

//Guarda el estado del usuario de manera global
const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export function Provider({ children }) {
  //Aqui cambiamos el estado entre autenticado o no
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true); // Si hay token, el usuario está autenticado
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
//con este Hook podemos acceder al contexto de autenticación osea si esta autenticado o no
export const useAuth = () => useContext(AuthContext);
