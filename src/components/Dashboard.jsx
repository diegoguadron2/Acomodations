import { GetAcc } from "../auth/GetAcc";
import { useState, useEffect, useRef } from "react";
import { GetBook } from "../auth/GetBook";

export default function Dashboard() {
  const [accommodations, setAccommodations] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [editMode, setEditMode] = useState(false);
  const [editAcc, setEditAcc] = useState(null);
  const [createMode, setCreateMode] = useState(false);
  const [newAcc, setNewAcc] = useState({ name: "", description: "", address: "" });

  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

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

  const handleEditClick = (acc) => {
    setEditAcc(acc);
    setEditMode(true);
  };

  const handleNewAccommodation = () => {
    setNewAcc({ name: "", description: "", address: "" });
    setCreateMode(true);
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type }), 2500);
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
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold dark:text-white">
                Alojamientos
              </h1>
              <button
                onClick={handleNewAccommodation}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Nuevo alojamiento
              </button>
            </div>
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
                    className="flex-shrink-0 w-64 dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-200 flex flex-col"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name || "Alojamiento"}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-4 flex flex-col flex-1">
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
                      <div className="flex justify-end space-x-2 mt-auto pt-4">
                        {/* Icono Editar */}
                        <button
                          className="bg-blue-600 hover:bg-blue-700 rounded-full p-2 flex items-center justify-center"
                          title="Editar"
                          onClick={() => handleEditClick(item)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m-2 2H7a2 2 0 01-2-2v-1.586a1 1 0 01.293-.707l9-9a1 1 0 011.414 0l1.586 1.586a1 1 0 010 1.414l-9 9A1 1 0 017 17z"
                            />
                          </svg>
                        </button>
                        {/* Icono Eliminar */}
                        <button
                          className="bg-red-600 hover:bg-red-700 rounded-full p-2 flex items-center justify-center"
                          title="Eliminar"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
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
      {editMode && editAcc && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <form
            className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-200 dark:border-gray-700"
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const token = sessionStorage.getItem("authToken");
                const response = await fetch(
                  `https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodation/${editAcc.id}`,
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                      name: editAcc.name,
                      description: editAcc.description,
                      address: editAcc.address,
                    }),
                  }
                );
                if (!response.ok) throw new Error("Error al actualizar");
                setEditMode(false);
                setEditAcc(null);
                showToast("¡Alojamiento actualizado correctamente!", "success");
                fetchData();
              } catch (err) {
                showToast("Error al actualizar: " + err.message, "error");
              }
            }}
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
              Editar alojamiento
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nombre
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                  value={editAcc.name || ""}
                  onChange={(e) =>
                    setEditAcc({ ...editAcc, name: e.target.value })
                  }
                  placeholder="Nombre del alojamiento"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Descripción
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white resize-none"
                  rows={3}
                  value={editAcc.description || ""}
                  onChange={(e) =>
                    setEditAcc({ ...editAcc, description: e.target.value })
                  }
                  placeholder="Descripción breve"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Dirección
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                  value={editAcc.address || ""}
                  onChange={(e) =>
                    setEditAcc({ ...editAcc, address: e.target.value })
                  }
                  placeholder="Dirección"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-8">
              <button
                type="button"
                className="px-5 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600 transition cursor-pointer"
                onClick={() => {
                  setEditMode(false);
                  setEditAcc(null);
                  showToast("Edición cancelada", "info");
                }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition cursor-pointer"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      )}
      {createMode && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <form
            className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-200 dark:border-gray-700"
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const token = sessionStorage.getItem("authToken");
                const response = await fetch(
                  `https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodation`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                      name: newAcc.name,
                      description: newAcc.description,
                      address: newAcc.address,
                    }),
                  }
                );
                if (!response.ok) throw new Error("Error al crear alojamiento");
                setCreateMode(false);
                setNewAcc({ name: "", description: "", address: "" });
                showToast("¡Alojamiento creado correctamente!", "success");
                fetchData(); // Refrescar la lista de alojamientos
              } catch (err) {
                showToast("Error al crear: " + err.message, "error");
              }
            }}
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
              Nuevo alojamiento
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nombre
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                  value={newAcc.name}
                  onChange={(e) =>
                    setNewAcc({ ...newAcc, name: e.target.value })
                  }
                  placeholder="Nombre del alojamiento"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Descripción
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white resize-none"
                  rows={3}
                  value={newAcc.description}
                  onChange={(e) =>
                    setNewAcc({ ...newAcc, description: e.target.value })
                  }
                  placeholder="Descripción breve"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Dirección
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                  value={newAcc.address}
                  onChange={(e) =>
                    setNewAcc({ ...newAcc, address: e.target.value })
                  }
                  placeholder="Dirección"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-8">
              <button
                type="button"
                className="px-5 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600 transition cursor-pointer"
                onClick={() => {
                  setCreateMode(false);
                  setNewAcc({ name: "", description: "", address: "" });
                  showToast("Creación cancelada", "info");
                }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition cursor-pointer"
              >
                Crear
              </button>
            </div>
          </form>
        </div>
      )}
      {toast.show && (
        <div
          className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-[9999] px-6 py-3 rounded-lg shadow-lg text-white font-semibold flex items-center gap-2 transition-all
      ${toast.type === "success" ? "bg-green-600" : toast.type === "error" ? "bg-red-600" : "bg-blue-600"}`}
          style={{ minWidth: "250px", textAlign: "center" }}
        >
          {/* Icono de manito solo para éxito o info */}
          {(toast.type === "success" || toast.type === "info") && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11V7a5 5 0 0110 0v4m-5 8v-8m0 8H7a2 2 0 01-2-2v-1.586a1 1 0 01.293-.707l9-9a1 1 0 011.414 0l1.586 1.586a1 1 0 010 1.414l-9 9A1 1 0 017 17z" />
            </svg>
          )}
          {toast.message}
        </div>
      )}
    </div>
  );
}