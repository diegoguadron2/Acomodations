import { GetAcc } from "../auth/GetAcc";
import { useState } from "react";

export default function Dashboard() {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await GetAcc();
      // Traemos 5 resultados de la api
      const results = Array.isArray(data) ? data.slice(0, 5) : [data];
      setAccommodations(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={fetchData}
        disabled={loading}
        style={{
          padding: "10px 15px",
          backgroundColor: loading ? "#ccc" : "#0066cc",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        {loading ? "Cargando..." : "Obtener alojamientos"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>Error: {error}</p>
      )}

      {accommodations.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Resultados:</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {accommodations.map((item, index) => (
              <li
                key={index}
                style={{
                  margin: "10px 0",
                  padding: "10px",
                  border: "1px solid #eee",
                }}
              >
                <pre>{JSON.stringify(item, null, 2)}</pre>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
