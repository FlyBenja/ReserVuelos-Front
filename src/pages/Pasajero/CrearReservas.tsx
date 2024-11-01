import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { useNavigate } from 'react-router-dom';
import { fetchReservationsByUserId } from '../../Service/Pasajeros/TraeReserUser';
import { fetchReservations } from '../../Service/Admin/TraeReservas';
import { getFlightClasses } from '../../Service/Admin/TraeVuelos';
import { saveReservation } from '../../Service/Pasajeros/GrabaReservJun';
import { getUserProfile } from '../../Service/getUserProfile';
import { getFlightClassDescription } from '../../Service/Pasajeros/TraeDescriVuelos';
import { toggleReservationStatus as toggleStatusAPI } from '../../Service/Pasajeros/CambEstatResv';

interface Reservation {
  id: number;
  code: string;
  passport: string;
  seat: string;
  flightClass: string;
  isActive: boolean;
}

const CrearReservación: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [availableCodes, setAvailableCodes] = useState<{ id: number; code: string }[]>([]);
  const [flightClasses, setFlightClasses] = useState<{ id: number; name: string }[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCode, setSelectedCode] = useState('');
  const [newPassport, setNewPassport] = useState('');
  const [newSeat, setNewSeat] = useState('');
  const [selectedFlightClass, setSelectedFlightClass] = useState('');
  const [selectedFlightNumber, setSelectedFlightNumber] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const navigate = useNavigate();

  const flightNumbers = [
    'UX1234', 'AA5678', 'BA4321', 'LH8765', 'DL7890', 'AF5432', 'IB1234', 'KL9876', 'AZ5678', 'NH2345',
    'CA8765', 'QR6789', 'EK4567', 'SU9876', 'SQ3456'
  ];

  // Carga de datos de reservas y clases de vuelo
  const loadData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userProfile = await getUserProfile(token);
        setUserId(userProfile.id);

        // Obtener reservas del usuario específico
        const userReservations = await fetchReservationsByUserId(userProfile.id);
        const allReservationsData = await fetchReservations(token);

        const mappedReservations = await Promise.all(
          userReservations.map(async (res: any) => {
            const flightClassDescription = await getFlightClassDescription(res.clasevuelo_id, token);

            const reservationMatch = allReservationsData.find(
              (reservation: any) => reservation.id === res.reserva_id
            );

            const reservationCode = reservationMatch ? reservationMatch.codigoReserva : "Reserva no disponible";

            return {
              id: res.id,
              code: reservationCode,
              passport: res.pasaporte || "No disponible",
              seat: res.asiento || "No disponible",
              flightClass: flightClassDescription || "Clase no disponible",
              isActive: res.status || false,
            };
          })
        );
        setReservations(mappedReservations);

        // Obtener códigos de reserva para seleccionar en el modal
        setAvailableCodes(allReservationsData.map((res: any) => ({ id: res.id, code: res.codigoReserva })));

        // Obtener clases de vuelo
        const flightClassData = await getFlightClasses();
        setFlightClasses(flightClassData.map((flightClass: any) => ({ id: flightClass.id, name: flightClass.nombreClase })));
      }
    } catch (error) {
      console.error("Error al cargar los datos:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error al cargar datos',
        text: 'No se pudo cargar la información de usuario, reservaciones y clases de vuelo.',
        confirmButtonColor: '#10B981',
      });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async () => {
    if (selectedCode && newPassport.trim() && newSeat.trim() && selectedFlightClass && selectedFlightNumber && userId) {
      try {
        const token = localStorage.getItem('token');
        const reservationData = {
          user_id: userId,
          reserva_id: availableCodes.find(code => code.code === selectedCode)?.id,
          clasevuelo_id: flightClasses.find(flightClass => flightClass.name === selectedFlightClass)?.id,
          pasaporte: newPassport,
          asiento: newSeat,
          numero_vuelo: selectedFlightNumber, // Campo ajustado a 'numero_vuelo'
          status: true,
        };
  
        await saveReservation(token, reservationData);
  
        Swal.fire({
          icon: 'success',
          title: 'Reservación creada',
          text: `La reservación ha sido creada exitosamente`,
          timer: 2000,
          showConfirmButton: false,
        });
  
        // Limpiar campos del modal y cerrar
        setSelectedCode('');
        setNewPassport('');
        setNewSeat('');
        setSelectedFlightClass('');
        setSelectedFlightNumber('');
        setShowCreateModal(false);
  
        // Volver a cargar las reservas para que aparezca la nueva
        loadData();
      } catch (error) {
        console.error("Error al crear la reservación:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error al crear reservación',
          text: 'No se pudo crear la reservación.',
          confirmButtonColor: '#10B981',
        });
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: 'Todos los campos son obligatorios',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };  

  const toggleReservationStatus = async (id: number, currentStatus: boolean) => {
    try {
      // Llamada a la API para cambiar el estado de la reserva
      await toggleStatusAPI(id, !currentStatus);

      // Actualiza el estado de la reserva en la interfaz
      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation.id === id ? { ...reservation, isActive: !currentStatus } : reservation
        )
      );

      Swal.fire({
        icon: 'success',
        title: 'Estado actualizado',
        text: 'El estado de la reservación ha sido actualizado con éxito.',
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error al actualizar el estado de la reservación:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar el estado de la reservación.',
        confirmButtonColor: '#10B981',
      });
    }
  };

  const handleDelete = (id: number) => {
    setReservations((prevReservations) => prevReservations.filter((reservation) => reservation.id !== id));
    Swal.fire({
      icon: 'success',
      title: 'Reservación eliminada',
      text: `La reservación ha sido eliminada correctamente`,
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <>
      <Breadcrumb pageName="Crear Reservación" />

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          + Crear Reservación
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 p-4">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold text-gray-800">Pasaporte: {reservation.passport}</h3>
              <button
                onClick={() => navigate('/pasajeros/info-reservas', { state: { reservation: { ...reservation, flightDataId: reservation.id } } })}
                className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold py-1 px-2 rounded-lg shadow-md"
              >
                Ver
              </button>
            </div>
            <p className="text-gray-600 mb-2">Asiento: {reservation.seat}</p>
            <p className="text-gray-600 mb-2">Clase de Vuelo: {reservation.flightClass}</p>
            <p className="text-gray-600 mb-4">Código de Reserva: {reservation.code}</p>
            <p className="text-gray-600 mb-4">Estado: {reservation.isActive ? 'Activa' : 'Inactiva'}</p>
            <div className="flex justify-between">
              <button
                onClick={() => toggleReservationStatus(reservation.id, reservation.isActive)}
                className={`font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 ${reservation.isActive ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'
                  } text-white`}
              >
                {reservation.isActive ? 'Desactivar' : 'Activar'}
              </button>
              <button
                onClick={() => handleDelete(reservation.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96 border border-gray-300">
            <h2 className="text-2xl font-semibold mb-4">Crear Nueva Reservación</h2>

            <select
              value={selectedCode}
              onChange={(e) => setSelectedCode(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Seleccione un Código de Reserva</option>
              {availableCodes.map((code) => (
                <option key={code.id} value={code.code}>{code.code}</option>
              ))}
            </select>

            <select
              value={selectedFlightClass}
              onChange={(e) => setSelectedFlightClass(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Seleccione Clase de Vuelo</option>
              {flightClasses.map((flightClass) => (
                <option key={flightClass.id} value={flightClass.name}>{flightClass.name}</option>
              ))}
            </select>

            <select
              value={selectedFlightNumber}
              onChange={(e) => setSelectedFlightNumber(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Seleccione Número de Vuelo</option>
              {flightNumbers.map((number) => (
                <option key={number} value={number}>{number}</option>
              ))}
            </select>

            <input
              type="text"
              value={newPassport}
              onChange={(e) => setNewPassport(e.target.value)}
              placeholder="Pasaporte"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={newSeat}
              onChange={(e) => setNewSeat(e.target.value)}
              placeholder="Asiento"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowCreateModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreate}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CrearReservación;
