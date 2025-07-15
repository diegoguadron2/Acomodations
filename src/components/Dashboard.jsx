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
  const [newAcc, setNewAcc] = useState({
    name: "",
    description: "",
    address: "",
  });

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

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
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400 py-3 tracking-tight drop-shadow-lg">
                Alojamientos
              </h1>
              <button
                onClick={handleNewAccommodation}
                className="flex items-center justify-center hover:bg-blue-700 bg-blue-600 p-2 sm:px-4 sm:py-1.5 rounded-md transition-colors"
                aria-label="Nuevo alojamiento"
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
                <span className="hidden sm:inline ml-2">Nuevo alojamiento</span>
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
                    className="flex-shrink-0 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 flex flex-col transform hover:-translate-y-1"
                  >
                    {item.image && (
                      <div className="relative overflow-hidden h-56">
                        <img
                          src={item.image}
                          alt={item.name || "Alojamiento"}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                    )}

                    <div className="p-5 flex flex-col flex-1">
                      <div className="mb-3">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white line-clamp-1">
                          {item.name || "Alojamiento sin nombre"}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                          {item.description || "Sin descripción"}
                        </p>
                      </div>

                      <div className="flex justify-end space-x-3 mt-auto">
                        <button
                          onClick={() => handleEditClick(item)}
                          className="bg-white dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 rounded-full p-2 shadow-sm border border-gray-200 dark:border-gray-600 transition-colors duration-200"
                          title="Editar"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-blue-600 dark:text-blue-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        </button>

                        <button
                          className="bg-white dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-gray-600 rounded-full p-2 shadow-sm border border-gray-200 dark:border-gray-600 transition-colors duration-200"
                          title="Eliminar"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-red-600 dark:text-red-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
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
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400 py-3 tracking-tight drop-shadow-lg">
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
                    className="flex-shrink-0 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                          Reserva #{item.id || index}
                        </h2>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center">
                          <svg
                            className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="text-gray-600 dark:text-gray-400">
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                              Check-in:
                            </span>{" "}
                            {item.check_in_date || "No especificado"}
                          </p>
                        </div>

                        <div className="flex items-center">
                          <svg
                            className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="text-gray-600 dark:text-gray-400">
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                              Check-out:
                            </span>{" "}
                            {item.check_out_date || "No especificado"}
                          </p>
                        </div>

                        <div className="flex items-center">
                          <svg
                            className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                          <p className="text-gray-600 dark:text-gray-400">
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                              Huéspedes:
                            </span>{" "}
                            {item.total_amount || "N/A"}
                          </p>
                        </div>
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
      ${
        toast.type === "success"
          ? "bg-green-600"
          : toast.type === "error"
          ? "bg-red-600"
          : "bg-blue-600"
      }`}
          style={{ minWidth: "250px", textAlign: "center" }}
        >
          {/* Icono de manito solo para éxito o info */}
          {(toast.type === "success" || toast.type === "info") && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 11V7a5 5 0 0110 0v4m-5 8v-8m0 8H7a2 2 0 01-2-2v-1.586a1 1 0 01.293-.707l9-9a1 1 0 011.414 0l1.586 1.586a1 1 0 010 1.414l-9 9A1 1 0 017 17z"
              />
            </svg>
          )}
          {toast.message}
        </div>
      )}
    </div>
  );
}
