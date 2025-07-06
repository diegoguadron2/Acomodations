// services/authService.js
export const login = async (email, password) => {
  try {
    const response = await fetch("https://apibookingsaccomodations-production.up.railway.app/api/V1/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error("Credenciales incorrectas");

    const data = await response.json();
    return {
      token: data.token,
      user: data.user,
    };
  } catch (error) {
    console.error("Error en authService:", error);
    throw error; // Re-lanzamos el error para manejarlo en el componente
  }
};
