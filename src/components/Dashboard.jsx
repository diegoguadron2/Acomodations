import { GetAcc } from "../auth/GetAcc";
import { useState, useEffect, useRef } from "react";
import { GetBook } from "../auth/GetBook";

export default function Dashboard() {
  const [accommodations, setAccommodations] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const accRef = useRef(null);
  const bookRef = useRef(null);

  // Funcion para obtener los alojamientos y reservas
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [accData, bookData] = await Promise.all([GetAcc(), GetBook()]);

      setAccommodations(Array.isArray(accData) ? accData : [accData]);
      setBookings(Array.isArray(bookData) ? bookData : [bookData]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    console.log("Datos de alojamientos:", accommodations);
    console.log("Datos de reservas:", bookings);
  }, []);

  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="p-5 dark:bg-gray-900">
      {loading && (
        <div className="text-center py-8 dark:text-white">
          <p className="text-lg">Cargando datos...</p>
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mt-4"></div>
        </div>
      )}
      {error && (
        <p className="text-red-500 dark:text-red-400 mt-2">Error: {error}</p>
      )}
      <div className="max-w-7xl mx-auto">
        {!loading && accommodations.length > 0 && (
          <div className="mt-8 relative">
            <h1 className="text-2xl font-bold mb-4 dark:text-white">
              Alojamientos
            </h1>
            <div className="border-b-2 border-gray-200 dark:border-gray-700 mb-6"></div>
            <div className="relative">
              <button
                onClick={() => scroll(accRef, "left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-200 dark:bg-gray-700 rounded-full p-2 shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label="Desplazar izquierda"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div
                ref={accRef}
                className="flex overflow-x-auto pb-4 scrollbar-hide space-x-4"
              >
                {accommodations.map((item, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-64 dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name || "Alojamiento"}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h2
                        className="text-lg font-semibold mb-1 line-clamp-1 dark:text-white"
                        title={item.name || "Alojamiento sin nombre"}
                      >
                        {item.name || "Alojamiento sin nombre"}
                      </h2>
                      <p
                        className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2"
                        title={item.description || "Sin descripción"}
                      >
                        {item.description || "Sin descripción"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => scroll(accRef, "right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-200 dark:bg-gray-700 rounded-full p-2 shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label="Desplazar derecha"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {!loading && bookings.length > 0 && (
          <div className="mt-12 mb-8 relative">
            <h1 className="text-2xl font-bold mb-4 dark:text-white">
              Reservas
            </h1>
            <div className="border-b-2 border-gray-200 dark:border-gray-700 mb-6"></div>
            <div className="relative">
              <button
                onClick={() => scroll(bookRef, "left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-200 dark:bg-gray-700 rounded-full p-2 shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label="Desplazar izquierda"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div
                ref={bookRef}
                className="flex overflow-x-auto pb-4 scrollbar-hide space-x-4"
              >
                {bookings.map((item, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-72 dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="p-4">
                      <h2 className="text-lg font-semibold mb-2 dark:text-white">
                        Reserva #{item.id || index}
                      </h2>
                      <div className="space-y-2">
                        <p className="text-gray-600 dark:text-gray-300">
                          <span className="font-medium">Check-in:</span>{" "}
                          {item.check_in_date || "No especificado"}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          <span className="font-medium">Check-out:</span>{" "}
                          {item.check_out_date || "No especificado"}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          <span className="font-medium">Huéspedes:</span>{" "}
                          {item.total_amount || "N/A"}
                        </p>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => scroll(bookRef, "right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-200 dark:bg-gray-700 rounded-full p-2 shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label="Desplazar derecha"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
      {!loading &&
        accommodations.length === 0 &&
        bookings.length === 0 &&
        !error && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No hay datos disponibles
          </div>
        )}
    </div>
  );
}
