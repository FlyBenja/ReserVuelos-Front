import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

interface PassengerInfo {
  nombre: string;
  pasaporte: string;
  asiento: string;
  id_user: number;
  profilePhoto: string;
  reservationCode: string;
}

const InfoPasajeros: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const passenger = location.state?.passenger as PassengerInfo;

  return (
    <>
      <Breadcrumb pageName="Información del Pasajero" />

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

      <div className="mx-auto max-w-5xl px-4 py-6">
        <div className="bg-white dark:bg-boxdark shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            {/* Sección del Título y Código de Reservación */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Detalle del Pasajero</h2>
              <span className="text-sm bg-blue-500 text-white py-1 px-3 rounded-md shadow">
                Código de Reservación: {passenger.reservationCode}
              </span>
            </div>

            {/* Información Principal del Pasajero */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
              {/* Foto de perfil */}
              <div className="flex-shrink-0">
                <img
                  src={passenger.profilePhoto}
                  alt={passenger.nombre}
                  className="w-32 h-32 rounded-full shadow-lg border-4 border-blue-500"
                />
              </div>

              {/* Información de Pasajero */}
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-gray-500 font-semibold">Nombre Completo</h3>
                    <p className="text-gray-800 dark:text-white font-medium">{passenger.nombre}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-500 font-semibold">Pasaporte</h3>
                    <p className="text-gray-800 dark:text-white font-medium">{passenger.pasaporte}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-500 font-semibold">Asiento</h3>
                    <p className="text-gray-800 dark:text-white font-medium">{passenger.asiento}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-500 font-semibold">ID de Usuario</h3>
                    <p className="text-gray-800 dark:text-white font-medium">{passenger.id_user}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Información de Vuelo */}
          <div className="p-6 bg-gray-100 dark:bg-meta-4 border-t border-gray-200 dark:border-strokedark">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Información del Vuelo</h3>
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500 font-semibold">Vuelo</p>
                <p className="text-gray-800 dark:text-white font-medium">UX1234</p>
              </div>
              <div>
                <p className="text-gray-500 font-semibold">Clase</p>
                <p className="text-gray-800 dark:text-white font-medium">Económica</p>
              </div>
              <div>
                <p className="text-gray-500 font-semibold">Estado</p>
                <p className="text-green-500 font-medium">Confirmado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoPasajeros;
