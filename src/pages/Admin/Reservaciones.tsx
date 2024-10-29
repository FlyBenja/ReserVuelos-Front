import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

interface Reservation {
  id: number;
  code: string;
  startDate: string;
  endDate: string;
}

const Reservaciones: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([
    { id: 1, code: 'ABC123', startDate: '2024-11-01', endDate: '2024-11-05' },
    { id: 2, code: 'DEF456', startDate: '2024-12-01', endDate: '2024-12-05' },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [newStartDate, setNewStartDate] = useState('');
  const [newEndDate, setNewEndDate] = useState('');
  const [currentReservationId, setCurrentReservationId] = useState<number | null>(null);

  // Función para eliminar una reservación
  const handleDelete = (id: number) => {
    const reservationCode = reservations.find((reservation) => reservation.id === id)?.code || 'Reservación';
    setReservations((prevReservations) => prevReservations.filter((reservation) => reservation.id !== id));
    Swal.fire({
      icon: 'success',
      title: 'Eliminada',
      text: `La reservación "${reservationCode}" ha sido eliminada correctamente`,
      timer: 2000,
      showConfirmButton: false,
    });
  };

  // Función para crear una nueva reservación
  const handleCreate = () => {
    if (newCode.trim() && newStartDate && newEndDate) {
      const newReservation = {
        id: reservations.length + 1,
        code: newCode,
        startDate: newStartDate,
        endDate: newEndDate,
      };
      setReservations((prevReservations) => [...prevReservations, newReservation]);
      Swal.fire({
        icon: 'success',
        title: 'Creada',
        text: `La reservación "${newCode}" ha sido creada exitosamente`,
        timer: 2000,
        showConfirmButton: false,
      });
      setNewCode('');
      setNewStartDate('');
      setNewEndDate('');
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

  // Función para abrir el modal de actualización
  const openUpdateModal = (id: number) => {
    const reservation = reservations.find((reservation) => reservation.id === id);
    if (reservation) {
      setCurrentReservationId(id);
      setNewCode(reservation.code);
      setNewStartDate(reservation.startDate);
      setNewEndDate(reservation.endDate);
      setShowUpdateModal(true);
    }
  };

  // Función para actualizar una reservación
  const handleUpdate = () => {
    if (currentReservationId !== null && newCode.trim() && newStartDate && newEndDate) {
      const updatedReservations = reservations.map((reservation) =>
        reservation.id === currentReservationId
          ? { ...reservation, code: newCode, startDate: newStartDate, endDate: newEndDate }
          : reservation
      );
      setReservations(updatedReservations);
      Swal.fire({
        icon: 'success',
        title: 'Actualizada',
        text: `La reservación "${newCode}" ha sido actualizada correctamente`,
        timer: 2000,
        showConfirmButton: false,
      });
      setShowUpdateModal(false);
      setNewCode('');
      setNewStartDate('');
      setNewEndDate('');
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

  return (
    <>
      <Breadcrumb pageName="Reservaciones" />

      {/* Botón para abrir el modal de crear */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          + Crear Reservación
        </button>
      </div>

      {/* Listado de reservaciones en cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 p-4">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Código: {reservation.code}</h3>
            <p className="text-gray-600">Inicio: {reservation.startDate}</p>
            <p className="text-gray-600">Final: {reservation.endDate}</p>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => openUpdateModal(reservation.id)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                Actualizar
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

      {/* Modal para crear y actualizar */}
      {(showCreateModal || showUpdateModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96 border border-gray-300">
            <h2 className="text-2xl font-semibold mb-4">
              {showCreateModal ? 'Crear Nueva Reservación' : 'Actualizar Reservación'}
            </h2>
            <input
              type="text"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              placeholder="Código de Reservación"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* Contenedor para las fechas en la misma línea */}
            <div className="flex space-x-4">
              <input
                type="date"
                value={newStartDate}
                onChange={(e) => setNewStartDate(e.target.value)}
                placeholder="Fecha de Inicio"
                className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                value={newEndDate}
                onChange={(e) => setNewEndDate(e.target.value)}
                placeholder="Fecha de Finalización"
                className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setShowUpdateModal(false);
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={showCreateModal ? handleCreate : handleUpdate}
                className={`${
                  showCreateModal ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
                } text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105`}
              >
                {showCreateModal ? 'Crear' : 'Actualizar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Reservaciones;
