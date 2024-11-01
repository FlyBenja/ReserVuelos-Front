import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { useNavigate } from 'react-router-dom';
import { createReservation } from '../../Service/Admin/GrabaReservas';
import { updateReservation } from '../../Service/Admin/UpdateReservas';
import { fetchReservations } from '../../Service/Admin/TraeReservas';
import { deleteReservation } from '../../Service/Admin/DeleteReservas';

interface Reservation {
  id: number;
  codigoReserva: string;
  fechaInicio: string;
  fechaFinal: string;
}

const Reservaciones: React.FC = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [newStartDate, setNewStartDate] = useState('');
  const [newEndDate, setNewEndDate] = useState('');
  const [currentReservationId, setCurrentReservationId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchReservations(token)
        .then((data) => setReservations(data))
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron cargar las reservaciones.',
            confirmButtonColor: '#28a745'
          });
        });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Sin Autenticación',
        text: 'Por favor, inicia sesión.',
        confirmButtonColor: '#28a745'
      });
      navigate('/login');
    }
  }, [navigate]);

  const handleCreate = async () => {
    if (newCode.trim() && newStartDate && newEndDate) {
      try {
        const newReservation = await createReservation(newCode, newStartDate, newEndDate);
        setReservations((prevReservations) => [...prevReservations, newReservation]);
        Swal.fire({
          icon: 'success',
          title: 'Creada',
          text: `La reservación "${newCode}" ha sido creada exitosamente`,
          timer: 2000,
          showConfirmButton: false,
          confirmButtonColor: '#28a745'
        });
        // Limpiar los campos al cerrar el modal de creación
        setNewCode('');
        setNewStartDate('');
        setNewEndDate('');
        setShowCreateModal(false);
      } catch (error) {
        console.error('Error al crear la reservación:', error);
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: 'Todos los campos son obligatorios',
        timer: 2000,
        showConfirmButton: false,
        confirmButtonColor: '#28a745'
      });
    }
  };

  const openCreateModal = () => {
    // Limpiar los campos al abrir el modal en modo de creación
    setNewCode('');
    setNewStartDate('');
    setNewEndDate('');
    setShowCreateModal(true);
  };

  const openUpdateModal = (id: number) => {
    const reservation = reservations.find((reservation) => reservation.id === id);
    if (reservation) {
      setCurrentReservationId(id);
      setNewCode(reservation.codigoReserva);
      setNewStartDate(new Date(reservation.fechaInicio).toISOString().split('T')[0]);
      setNewEndDate(new Date(reservation.fechaFinal).toISOString().split('T')[0]);
      setShowUpdateModal(true);
    }
  };

  const handleUpdate = async () => {
    if (currentReservationId !== null && newCode.trim() && newStartDate && newEndDate) {
      try {
        await updateReservation(currentReservationId, newCode, newStartDate, newEndDate);
        const token = localStorage.getItem('token');
        if (token) {
          const updatedReservations = await fetchReservations(token);
          setReservations(updatedReservations);
        }
        Swal.fire({
          icon: 'success',
          title: 'Actualizada',
          text: `La reservación "${newCode}" ha sido actualizada correctamente`,
          timer: 2000,
          showConfirmButton: false,
          confirmButtonColor: '#28a745'
        });
        setShowUpdateModal(false);
        setNewCode('');
        setNewStartDate('');
        setNewEndDate('');
      } catch (error) {
        console.error('Error al actualizar la reservación:', error);
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: 'Todos los campos son obligatorios',
        timer: 2000,
        showConfirmButton: false,
        confirmButtonColor: '#28a745'
      });
    }
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const reservationCode = reservations.find((reservation) => reservation.id === id)?.codigoReserva || 'Reservación';

    try {
      await deleteReservation(id, token);
      setReservations((prevReservations) => prevReservations.filter((reservation) => reservation.id !== id));
      Swal.fire({
        icon: 'success',
        title: 'Eliminada',
        text: `La reservación "${reservationCode}" ha sido eliminada correctamente`,
        timer: 2000,
        showConfirmButton: false,
        confirmButtonColor: '#28a745'
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo eliminar la reservación',
        confirmButtonColor: '#28a745'
      });
    }
  };

  const formatDate = (date: string) => {
    const [dateOnly] = date.split('T');
    const [year, month, day] = dateOnly.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <Breadcrumb pageName="Reservaciones" />

      <div className="flex justify-end mb-4">
        <button
          onClick={openCreateModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          + Crear Reservación
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 p-4">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="bg-white dark:bg-gray-800 dark:text-white shadow-lg rounded-lg p-6 flex flex-col justify-between border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Código: {reservation.codigoReserva}</h3>
              <button
                onClick={() => navigate('/admin/listar-pasajeros', { state: { reservationId: reservation.id } })}
                className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold py-1 px-2 rounded-lg shadow-md"
              >
                Ver
              </button>
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <p className="text-gray-600 dark:text-gray-300 font-semibold mb-1">Fecha Inicio</p>
                <p className="text-gray-600 dark:text-gray-300">{formatDate(reservation.fechaInicio)}</p>
              </div>
              <div className="w-1/2">
                <p className="text-gray-600 dark:text-gray-300 font-semibold mb-1">Fecha Final</p>
                <p className="text-gray-600 dark:text-gray-300">{formatDate(reservation.fechaFinal)}</p>
              </div>
            </div>
            <div className="mt-4 flex space-x-4 justify-center">
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

      {(showCreateModal || showUpdateModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 dark:text-white p-8 rounded-lg shadow-lg w-96 border border-gray-300 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-4">
              {showCreateModal ? 'Crear Nueva Reservación' : 'Actualizar Reservación'}
            </h2>
            <input
              type="text"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              placeholder="Código de Reservación"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Fecha de Inicio</label>
                <input
                  type="date"
                  value={newStartDate}
                  onChange={(e) => setNewStartDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Fecha de Finalización</label>
                <input
                  type="date"
                  value={newEndDate}
                  onChange={(e) => setNewEndDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setShowUpdateModal(false);
                  setNewCode('');
                  setNewStartDate('');
                  setNewEndDate('');
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold px-4 py-2 rounded-lg transition-colors dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-white"
              >
                Cancelar
              </button>
              <button
                onClick={showCreateModal ? handleCreate : handleUpdate}
                className={`${showCreateModal ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
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
