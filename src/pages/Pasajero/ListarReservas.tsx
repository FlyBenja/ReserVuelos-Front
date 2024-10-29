import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

interface Reservation {
  id: number;
  code: string;
  startDate: string;
  endDate: string;
}

const ListarReservas: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reservationsPerPage = 8; // Cantidad de reservas por página
  const [maxPageButtons] = useState(5); // Número máximo de botones de paginación a mostrar

  useEffect(() => {
    // Datos de ejemplo de reservas
    const exampleReservations: Reservation[] = [
      { id: 1, code: 'ABC123', startDate: '2024-11-01', endDate: '2024-11-05' },
      { id: 2, code: 'DEF456', startDate: '2024-12-01', endDate: '2024-12-05' },
      { id: 3, code: 'GHI789', startDate: '2025-01-15', endDate: '2025-01-20' },
      { id: 4, code: 'JKL012', startDate: '2025-02-10', endDate: '2025-02-15' },
      { id: 5, code: 'MNO345', startDate: '2025-03-05', endDate: '2025-03-10' },
      { id: 6, code: 'PQR678', startDate: '2025-04-15', endDate: '2025-04-20' },
      { id: 7, code: 'STU901', startDate: '2025-05-01', endDate: '2025-05-05' },
      // Agrega más reservas si es necesario
    ];

    setReservations(exampleReservations);
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
              </tr>
            </thead>
            <tbody>
              {currentReservations.length > 0 ? (
                currentReservations.map((reservation) => (
                  <tr key={reservation.id} className="border-t border-gray-200 dark:border-strokedark">
                    <td className="py-2 px-4 text-center text-gray-800 dark:text-white">{reservation.code}</td>
                    <td className="py-2 px-4 text-center text-gray-800 dark:text-white">{reservation.startDate}</td>
                    <td className="py-2 px-4 text-center text-gray-800 dark:text-white">{reservation.endDate}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-4 px-4 text-center text-gray-500 dark:text-white">
                    No tienes reservas registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
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
