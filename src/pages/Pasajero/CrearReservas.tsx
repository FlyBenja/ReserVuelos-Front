import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { useNavigate } from 'react-router-dom';

interface Reservation {
  id: number;
  code: string;
  passport: string;
  seat: string;
  flightNumber: string;
  flightClass: string;
  isActive: boolean;
}

const CrearReservación: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCode, setSelectedCode] = useState('');
  const [newPassport, setNewPassport] = useState('');
  const [newSeat, setNewSeat] = useState('');
  const [newFlightNumber, setNewFlightNumber] = useState('');
  const [selectedFlightClass, setSelectedFlightClass] = useState('');
  const navigate = useNavigate();

  const availableCodes = ['ABC123', 'DEF456', 'GHI789', 'JKL012', 'MNO345'];
  const flightClasses = ['Económica', 'Ejecutiva', 'Primera Clase'];

  // Función para crear una nueva reservación
  const handleCreate = () => {
    if (selectedCode && newPassport.trim() && newSeat.trim() && newFlightNumber.trim() && selectedFlightClass) {
      const newReservation = {
        id: reservations.length + 1,
        code: selectedCode,
        passport: newPassport,
        seat: newSeat,
        flightNumber: newFlightNumber,
        flightClass: selectedFlightClass,
        isActive: true,
      };
      setReservations((prevReservations) => [...prevReservations, newReservation]);

      Swal.fire({
        icon: 'success',
        title: 'Reservación creada',
        text: `La reservación para el vuelo ${newFlightNumber} ha sido creada exitosamente`,
        timer: 2000,
        showConfirmButton: false,
      });

      setSelectedCode('');
      setNewPassport('');
      setNewSeat('');
      setNewFlightNumber('');
      setSelectedFlightClass('');
      setShowCreateModal(false);
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

  // Función para eliminar una reservación
  const handleDelete = (id: number) => {
    setReservations((prevReservations) => prevReservations.filter((reservation) => reservation.id !== id));
    Swal.fire({
      icon: 'success',
      title: 'Eliminado',
      text: `La reservación ha sido eliminada correctamente`,
      timer: 2000,
      showConfirmButton: false,
    });
  };

  // Función para activar/desactivar una reservación
  const toggleReservationStatus = (id: number) => {
    setReservations((prevReservations) =>
      prevReservations.map((reservation) =>
        reservation.id === id ? { ...reservation, isActive: !reservation.isActive } : reservation
      )
    );
    const currentStatus = reservations.find((reservation) => reservation.id === id)?.isActive;
    Swal.fire({
      icon: currentStatus ? 'info' : 'success',
      title: currentStatus ? 'Desactivada' : 'Activada',
      text: `La reservación ha sido ${currentStatus ? 'desactivada' : 'activada'}`,
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
                onClick={() => navigate('/pasajeros/info-reservas', { state: { reservation } })}
                className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold py-1 px-2 rounded-lg shadow-md"
              >
                Ver
              </button>
            </div>
            <p className="text-gray-600 mb-2">Asiento: {reservation.seat}</p>
            <p className="text-gray-600 mb-2">Número de Vuelo: {reservation.flightNumber}</p>
            <p className="text-gray-600 mb-2">Clase de Vuelo: {reservation.flightClass}</p>
            <p className="text-gray-600 mb-4">Código de Reserva: {reservation.code}</p>
            <p className="text-gray-600 mb-4">Estado: {reservation.isActive ? 'Activa' : 'Inactiva'}</p>
            <div className="flex justify-between">
              <button
                onClick={() => toggleReservationStatus(reservation.id)}
                className={`font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 ${
                  reservation.isActive ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'
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

      {/* Modal para crear reservación */}
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
                <option key={code} value={code}>{code}</option>
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
            <input
              type="text"
              value={newFlightNumber}
              onChange={(e) => setNewFlightNumber(e.target.value)}
              placeholder="Número de Vuelo"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={selectedFlightClass}
              onChange={(e) => setSelectedFlightClass(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Seleccione Clase de Vuelo</option>
              {flightClasses.map((flightClass) => (
                <option key={flightClass} value={flightClass}>{flightClass}</option>
              ))}
            </select>
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
