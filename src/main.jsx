import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Protected from "./routes/protected.jsx";
import { Provider } from "./auth/AuthProvider.jsx";
import { ProtectedLayout } from "./components/ProtectedLayout.jsx";
import CreateAcc from "./components/Create.jsx";

//Creacion de rutas
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    //Estas son las rutas protegidas, solo se puede acceder si el usuario esta autenticado
    path: "/",
    element: (
      <ProtectedLayout>
        <Protected />,
      </ProtectedLayout>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/create",
        element: <CreateAcc />,
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
