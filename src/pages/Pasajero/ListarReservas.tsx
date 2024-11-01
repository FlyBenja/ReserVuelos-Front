import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { fetchReservationsByUserId } from '../../Service/Pasajeros/TraeReserUser';
import { fetchReservations } from '../../Service/Admin/TraeReservas';
import { getUserProfile } from '../../Service/getUserProfile';
import { getFlightClassDescription } from '../../Service/Pasajeros/TraeDescriVuelos';

interface Reservation {
  id: number;
  code: string; // Este será el nombre de reserva o código de reserva
  startDate: string;
  endDate: string;
  flightClass: string;
}

const ListarReservas: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reservationsPerPage = 8;
  const maxPageButtons = 5;

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userProfile = await getUserProfile(token);

          // Llamada para obtener las reservas del usuario específico
          const userReservationsData = await fetchReservationsByUserId(userProfile.id);
          console.log("fetchReservationsByUserId", userReservationsData);

          // Llamada para obtener todos los nombres de reserva
          const allReservationsData = await fetchReservations(token);
          console.log("fetchReservations", allReservationsData);
          
          if (Array.isArray(userReservationsData) && Array.isArray(allReservationsData)) {
            const mappedReservations = await Promise.all(
              userReservationsData.map(async (res) => {
                const formattedStartDate = new Date(res.createdAt).toLocaleDateString("es-ES");
                const formattedEndDate = new Date(res.updatedAt).toLocaleDateString("es-ES");

                // Obtener el nombre de la clase de vuelo
                const flightClass = await getFlightClassDescription(res.clasevuelo_id, token);

                // Buscar el código de reserva en allReservationsData usando reserva_id
                const reservationMatch = allReservationsData.find(
                  (reservation) => reservation.id === res.reserva_id
                );

                // Asignar `codigoReserva` si hay coincidencia, o "Reserva no disponible" si no la hay
                const reservationCode = reservationMatch ? reservationMatch.codigoReserva : "Reserva no disponible";

                return {
                  id: res.id,
                  code: reservationCode, // Usar `codigoReserva` como `code`
                  startDate: formattedStartDate || "Fecha no disponible",
                  endDate: formattedEndDate || "Fecha no disponible",
                  flightClass: flightClass || "Clase no disponible",
                };
              })
            );
            setReservations(mappedReservations);
          } else {
            console.error("Datos no válidos recibidos:", userReservationsData, allReservationsData);
          }
        }
      } catch (error) {
        console.error("Error al cargar las reservas:", error);
      }
    };

    loadUserData();
  }, []);

  const indexOfLastReservation = currentPage * reservationsPerPage;
  const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
  const currentReservations = reservations.slice(indexOfFirstReservation, indexOfLastReservation);
  const totalPages = Math.ceil(reservations.length / reservationsPerPage);

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`mx-1 px-3 py-1 rounded-md border ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-white dark:bg-boxdark text-blue-500 dark:text-white'}`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <>
      <Breadcrumb pageName="Mis Reservas" />
      <div className="mx-auto max-w-5xl px-4 py-6">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-white mb-6 text-center">Listado de Reservas</h2>

        <div className="max-w-full overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg dark:bg-boxdark dark:border-strokedark">
            <thead>
              <tr className="bg-gray-100 text-sm text-gray-600 dark:bg-meta-4 dark:text-white">
                <th className="py-2 px-4 text-center">Código de Reserva</th>
                <th className="py-2 px-4 text-center">Fecha de Inicio</th>
                <th className="py-2 px-4 text-center">Fecha Final</th>
                <th className="py-2 px-4 text-center">Clase de Vuelo</th>
              </tr>
            </thead>
            <tbody>
              {currentReservations.length > 0 ? (
                currentReservations.map((reservation) => (
                  <tr key={reservation.id} className="border-t border-gray-200 dark:border-strokedark">
                    <td className="py-2 px-4 text-center text-gray-800 dark:text-white">{reservation.code}</td>
                    <td className="py-2 px-4 text-center text-gray-800 dark:text-white">{reservation.startDate}</td>
                    <td className="py-2 px-4 text-center text-gray-800 dark:text-white">{reservation.endDate}</td>
                    <td className="py-2 px-4 text-center text-gray-800 dark:text-white">{reservation.flightClass}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-4 px-4 text-center text-gray-500 dark:text-white">
                    No tienes reservas registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            className="mx-1 px-3 py-1 rounded-md border bg-white dark:bg-boxdark text-blue-500 dark:text-white"
            disabled={currentPage === 1}
          >
            &#8592;
          </button>

          {renderPaginationButtons()}

          <button
            onClick={() => paginate(currentPage + 1)}
            className="mx-1 px-3 py-1 rounded-md border bg-white dark:bg-boxdark text-blue-500 dark:text-white"
            disabled={currentPage === totalPages}
          >
            &#8594;
          </button>
        </div>
      </div>
    </>
  );
};

export default ListarReservas;
