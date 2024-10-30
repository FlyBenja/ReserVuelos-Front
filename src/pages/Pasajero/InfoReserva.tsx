import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Swal from 'sweetalert2';

interface ReservationInfo {
  code: string;
  passport: string;
  seat: string;
  flightNumber: string;
  flightClass: string;
}

const InfoReserva: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reservation = location.state?.reservation as ReservationInfo;

  const [reservationStatus, setReservationStatus] = useState('Confirmado');

  const handleCancelReservation = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción marcará la reservación como cancelada.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        setReservationStatus('Cancelada');
        Swal.fire({
          icon: 'success',
          title: 'Estado Actualizado',
          text: 'La reservación ha sido marcada como cancelada.',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'swal-confirm-button',
          },
        });
      }
    });
  };

  return (
    <>
      <Breadcrumb pageName="Información de la Reservación" />

      {/* Botón de Regresar con flecha "<--" */}
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center"
        >
          <span className="mr-2">&#8592;</span> {/* Flecha hacia la izquierda */}
          Regresar
        </button>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-6">
        <div className="bg-white dark:bg-boxdark shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            {/* Título y Código de Reservación */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Detalle de la Reservación</h2>
              <span className="text-sm bg-blue-500 text-white py-1 px-3 rounded-md shadow">
                Código de Reservación: {reservation.code}
              </span>
            </div>

            {/* Información Principal de la Reservación */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-gray-500 font-semibold">Pasaporte</h3>
                    <p className="text-gray-800 dark:text-white font-medium">{reservation.passport}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-500 font-semibold">Asiento</h3>
                    <p className="text-gray-800 dark:text-white font-medium">{reservation.seat}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-500 font-semibold">Número de Vuelo</h3>
                    <p className="text-gray-800 dark:text-white font-medium">{reservation.flightNumber}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-500 font-semibold">Clase de Vuelo</h3>
                    <p className="text-gray-800 dark:text-white font-medium">{reservation.flightClass}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Estado de la Reservación y Botón de Cancelar */}
          <div className="p-6 bg-gray-100 dark:bg-meta-4 border-t border-gray-200 dark:border-strokedark">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Estado de la Reservación</h3>
                <p className={`font-medium ${reservationStatus === 'Confirmado' ? 'text-green-500' : 'text-red-500'}`}>
                  {reservationStatus}
                </p>
              </div>
              {reservationStatus === 'Confirmado' && (
                <button
                  onClick={handleCancelReservation}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
                >
                  Cancelar Reservación
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Estilos personalizados para SweetAlert */}
      <style>{`
        .swal-confirm-button {
          background-color: #28a745 !important; /* Verde */
          color: white !important;
          font-weight: bold;
          border-radius: 5px;
          padding: 10px 20px;
        }
      `}</style>
    </>
  );
};

export default InfoReserva;
