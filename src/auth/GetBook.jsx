import axios from "axios";

export const GetBook = async () => {
  try {
    const token = sessionStorage.getItem("authToken");

    const response = await axios.get(
      "https://apibookingsaccomodations-production.up.railway.app/api/V1/bookings",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error en GetAcc:", error.response?.data || error.message);
    throw error;
  }
};
