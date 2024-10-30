import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

interface Passenger {
  id: number;
  name: string;
  seat: string;
  profilePhoto: string;
}

const Pasajeros: React.FC = () => {
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [filteredPassengers, setFilteredPassengers] = useState<Passenger[]>([]);
  const [searchName, setSearchName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const passengersPerPage = 5;
  const [maxPageButtons] = useState(10);

  const navigate = useNavigate();

  useEffect(() => {
    const examplePassengers: Passenger[] = [
      { id: 1, name: 'Juan Pérez', seat: '12A', profilePhoto: 'https://randomuser.me/api/portraits/men/1.jpg' },
      { id: 2, name: 'María López', seat: '12B', profilePhoto: 'https://randomuser.me/api/portraits/women/1.jpg' },
      { id: 3, name: 'Carlos García', seat: '12C', profilePhoto: 'https://randomuser.me/api/portraits/men/2.jpg' },
      { id: 4, name: 'Ana Méndez', seat: '13A', profilePhoto: 'https://randomuser.me/api/portraits/women/2.jpg' },
      { id: 5, name: 'Luis Fernández', seat: '13B', profilePhoto: 'https://randomuser.me/api/portraits/men/3.jpg' },
      { id: 6, name: 'Claudia Ríos', seat: '13C', profilePhoto: 'https://randomuser.me/api/portraits/women/3.jpg' },
      { id: 7, name: 'Pedro Sánchez', seat: '14A', profilePhoto: 'https://randomuser.me/api/portraits/men/4.jpg' },
      { id: 8, name: 'Lucía Martínez', seat: '14B', profilePhoto: 'https://randomuser.me/api/portraits/women/4.jpg' },
      { id: 9, name: 'Jorge Gómez', seat: '14C', profilePhoto: 'https://randomuser.me/api/portraits/men/5.jpg' },
      { id: 10, name: 'Gabriela Ortiz', seat: '15A', profilePhoto: 'https://randomuser.me/api/portraits/women/5.jpg' },
      { id: 11, name: 'Manuel Torres', seat: '15B', profilePhoto: 'https://randomuser.me/api/portraits/men/6.jpg' },
      { id: 12, name: 'Isabel Castillo', seat: '15C', profilePhoto: 'https://randomuser.me/api/portraits/women/6.jpg' },
      { id: 13, name: 'Fernando Ramos', seat: '16A', profilePhoto: 'https://randomuser.me/api/portraits/men/7.jpg' },
      { id: 14, name: 'Carmen Vega', seat: '16B', profilePhoto: 'https://randomuser.me/api/portraits/women/7.jpg' },
      { id: 15, name: 'Raúl Domínguez', seat: '16C', profilePhoto: 'https://randomuser.me/api/portraits/men/8.jpg' },
      { id: 16, name: 'Laura Herrera', seat: '17A', profilePhoto: 'https://randomuser.me/api/portraits/women/8.jpg' },
      { id: 17, name: 'Enrique Navarro', seat: '17B', profilePhoto: 'https://randomuser.me/api/portraits/men/9.jpg' },
      { id: 18, name: 'Marta Cruz', seat: '17C', profilePhoto: 'https://randomuser.me/api/portraits/women/9.jpg' },
      { id: 19, name: 'Alberto Campos', seat: '18A', profilePhoto: 'https://randomuser.me/api/portraits/men/10.jpg' },
      { id: 20, name: 'Elena Reyes', seat: '18B', profilePhoto: 'https://randomuser.me/api/portraits/women/10.jpg' },
      { id: 21, name: 'Víctor Lozano', seat: '18C', profilePhoto: 'https://randomuser.me/api/portraits/men/11.jpg' },
      { id: 22, name: 'Patricia Salinas', seat: '19A', profilePhoto: 'https://randomuser.me/api/portraits/women/11.jpg' },
      { id: 23, name: 'Ricardo Peña', seat: '19B', profilePhoto: 'https://randomuser.me/api/portraits/men/12.jpg' },
      { id: 24, name: 'Rosa Muñoz', seat: '19C', profilePhoto: 'https://randomuser.me/api/portraits/women/12.jpg' },
      { id: 25, name: 'Andrés Serrano', seat: '20A', profilePhoto: 'https://randomuser.me/api/portraits/men/13.jpg' },
      { id: 26, name: 'Alejandra León', seat: '20B', profilePhoto: 'https://randomuser.me/api/portraits/women/13.jpg' },
      { id: 27, name: 'Roberto Aguilar', seat: '20C', profilePhoto: 'https://randomuser.me/api/portraits/men/14.jpg' },
      { id: 28, name: 'Natalia Correa', seat: '21A', profilePhoto: 'https://randomuser.me/api/portraits/women/14.jpg' },
      { id: 29, name: 'José Molina', seat: '21B', profilePhoto: 'https://randomuser.me/api/portraits/men/15.jpg' },
      { id: 30, name: 'Sara Vásquez', seat: '21C', profilePhoto: 'https://randomuser.me/api/portraits/women/15.jpg' },
    ];

    setPassengers(examplePassengers);
    setFilteredPassengers(examplePassengers);
  }, []);

  const handleSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  useEffect(() => {
    const filtered = passengers.filter((passenger) =>
      passenger.name.toLowerCase().includes(searchName.toLowerCase())
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
    navigate(`/admin/info-pasajero`, { state: { passenger } });
  };

  return (
    <>
      <Breadcrumb pageName="Listar Pasajeros" />

      {/* Botón de Regresar */}
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
        {/* Campo de búsqueda por nombre */}
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
                      <img src={passenger.profilePhoto} alt={passenger.name} className="w-10 h-10 rounded-full mx-auto" />
                    </td>
                    <td className="py-2 px-4 text-center relative group">
                      {passenger.name}
                      <div className="absolute hidden group-hover:block bg-black text-white text-xs rounded-lg px-1 py-1 -top-10 left-[50%] transform -translate-x-1/2 w-40 dark:bg-white dark:text-gray-800">
                        Ver Información Pasajero
                      </div>
                    </td>
                    <td className="py-2 px-4 text-center">{passenger.seat}</td>
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

export default Pasajeros;
