import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { fetchUserReservationData } from '../../Service/Admin/TraeUserReser';
import { fetchAllUsers } from '../../Service/Admin/NomUser';

interface Passenger {
  id: number;
  nombre: string;
  pasaporte: string;
  asiento: string;
  id_user: number;
  profilePhoto: string;
  reservationCode: string;
  numero_vuelo: string;
  clasevuelo_id: string;
  status: string;
}

const Pasajeros: React.FC = () => {
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [filteredPassengers, setFilteredPassengers] = useState<Passenger[]>([]);
  const [searchName, setSearchName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const passengersPerPage = 5;
  const [maxPageButtons] = useState(10);

  const navigate = useNavigate();
  const location = useLocation();
  const { reservationId } = location.state || {};

  useEffect(() => {
    const loadPassengers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (reservationId && token) {
          const reservationData = await fetchUserReservationData(reservationId);
          const allUsers = await fetchAllUsers(token);

          const loadedPassengers = reservationData.map((data: any, index: number) => {
            const user = allUsers.find((user: any) => user.id === data.user_id);
            const username = user ? user.username : 'Usuario no encontrado';

            return {
              id: data.id,
              nombre: username,
              pasaporte: data.pasaporte,
              asiento: data.asiento,
              id_user: data.user_id,
              profilePhoto: `https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index + 1}.jpg`,
              reservationCode: reservationId,
              numero_vuelo: data.numero_vuelo,
              clasevuelo_id: data.clasevuelo_id,
              status: data.status,
            };
          });

          setPassengers(loadedPassengers);
          setFilteredPassengers(loadedPassengers);
        } else {
          console.error("reservationId o token no están disponibles");
        }
      } catch (error) {
        console.error("Error al cargar los datos de pasajeros:", error);
      }
    };

    loadPassengers();
  }, [reservationId]);

  const handleSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  useEffect(() => {
    const filtered = passengers.filter((passenger) =>
      passenger.nombre.toLowerCase().includes(searchName.toLowerCase())
    );
    setFilteredPassengers(filtered);
  }, [searchName, passengers]);

  const indexOfLastPassenger = currentPage * passengersPerPage;
  const indexOfFirstPassenger = indexOfLastPassenger - passengersPerPage;
  const currentPassengers = filteredPassengers.slice(indexOfFirstPassenger, indexOfLastPassenger);

  const totalPages = Math.ceil(filteredPassengers.length / passengersPerPage);

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

  const handlePassengerClick = (passenger: Passenger) => {
    console.log("Valor de passenger antes de navegar:", passenger); // Verificación del valor de status
    navigate(`/admin/info-pasajero`, { state: { passenger } });
  };

  return (
    <>
      <Breadcrumb pageName="Listar Pasajeros" />

      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center"
        >
          <span className="mr-2">&#8592;</span>
          Regresar
        </button>
      </div>

      <div className="mx-auto max-w-5xl px-1 py-1">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={searchName}
            onChange={handleSearchName}
            className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-boxdark dark:border-strokedark dark:text-white"
          />
        </div>

        <div className="max-w-full overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg dark:bg-boxdark dark:border-strokedark">
            <thead>
              <tr className="bg-gray-100 text-sm text-gray-600 dark:bg-meta-4 dark:text-white">
                <th className="py-2 px-4 text-center">Foto</th>
                <th className="py-2 px-4 text-center">Nombre</th>
                <th className="py-2 px-4 text-center">Asiento</th>
              </tr>
            </thead>
            <tbody>
              {currentPassengers.length > 0 ? (
                currentPassengers.map(passenger => (
                  <tr
                    key={passenger.id}
                    className="border-t border-gray-200 dark:border-strokedark cursor-pointer hover:bg-gray-100 dark:hover:bg-meta-4 relative group"
                    onClick={() => handlePassengerClick(passenger)}
                  >
                    <td className="py-2 px-4 text-center">
                      <img src={passenger.profilePhoto} alt={passenger.nombre} className="w-10 h-10 rounded-full mx-auto" />
                    </td>
                    <td className="py-2 px-4 text-center">{passenger.nombre}</td>
                    <td className="py-2 px-4 text-center">{passenger.asiento}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-2 px-4 text-center text-gray-500 dark:text-white">
                    No se encontraron pasajeros.
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

export default Pasajeros;
