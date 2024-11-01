import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

// Importar las APIs de clases de vuelo
import { getFlightClasses } from '../../Service/Admin/TraeVuelos';
import { createFlightClass } from '../../Service/Admin/GrabaVuelos';
import { updateFlightClass } from '../../Service/Admin/UpdateVuelos';
import { deleteFlightClass } from '../../Service/Admin/DeleteVuelos';

const ClasesVuelo: React.FC = () => {
  const [classes, setClasses] = useState<{ id: number; nombreClase: string }[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [currentClassId, setCurrentClassId] = useState<number | null>(null);
  const [currentClassName, setCurrentClassName] = useState('');

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await getFlightClasses();
        setClasses(data);
      } catch (error) {
        Swal.fire('Error', error as string, 'error');
      }
    };
    fetchClasses();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const className = classes.find((flightClass) => flightClass.id === id)?.nombreClase || 'Clase de Vuelo';
      await deleteFlightClass(id);
      setClasses((prevClasses) => prevClasses.filter((flightClass) => flightClass.id !== id));
      Swal.fire({
        icon: 'success',
        title: 'Eliminado',
        text: `La clase de vuelo "${className}" ha sido eliminada correctamente`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire('Error', error as string, 'error');
    }
  };

  const handleCreate = async () => {
    if (newClassName.trim()) {
      try {
        const newClass = await createFlightClass(newClassName);
        setClasses((prevClasses) => [...prevClasses, newClass]);
        Swal.fire({
          icon: 'success',
          title: 'Creada',
          text: `La clase de vuelo "${newClassName}" ha sido creada exitosamente`,
          timer: 2000,
          showConfirmButton: false,
        });
        setNewClassName('');
        setShowCreateModal(false);
      } catch (error) {
        Swal.fire('Error', error as string, 'error');
      }
    } else {
      Swal.fire('Error', 'El nombre de la clase de vuelo no puede estar vacío', 'warning');
    }
  };

  const openUpdateModal = (id: number, name: string) => {
    setCurrentClassId(id);
    setCurrentClassName(name);
    setShowUpdateModal(true);
  };

  const handleUpdate = async () => {
    if (currentClassId !== null && currentClassName.trim()) {
      try {
        await updateFlightClass(currentClassId, currentClassName);
        setClasses((prevClasses) =>
          prevClasses.map((flightClass) =>
            flightClass.id === currentClassId ? { ...flightClass, nombreClase: currentClassName } : flightClass
          )
        );
        Swal.fire({
          icon: 'success',
          title: 'Actualizada',
          text: `La clase de vuelo ha sido actualizada a "${currentClassName}"`,
          timer: 2000,
          showConfirmButton: false,
        });
        setShowUpdateModal(false);
      } catch (error) {
        Swal.fire('Error', error as string, 'error');
      }
    } else {
      Swal.fire('Error', 'El nombre de la clase de vuelo no puede estar vacío', 'warning');
    }
  };

  return (
    <>
      <Breadcrumb pageName="Clases de Vuelo" />

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          + Crear Clase
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 p-4">
        {classes.map((flightClass) => (
          <div key={flightClass.id} className="bg-white dark:bg-gray-800 dark:text-white shadow-lg rounded-lg p-6 flex flex-col justify-between border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">{flightClass.nombreClase}</h3>
            <div className="flex space-x-4">
              <button
                onClick={() => openUpdateModal(flightClass.id, flightClass.nombreClase)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                Actualizar
              </button>
              <button
                onClick={() => handleDelete(flightClass.id)}
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
              {showCreateModal ? 'Crear Nueva Clase de Vuelo' : 'Actualizar Clase de Vuelo'}
            </h2>
            <input
              type="text"
              value={showCreateModal ? newClassName : currentClassName}
              onChange={(e) =>
                showCreateModal
                  ? setNewClassName(e.target.value)
                  : setCurrentClassName(e.target.value)
              }
              placeholder="Nombre de la Clase"
              className="w-full p-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setShowUpdateModal(false);
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold px-4 py-2 rounded-lg transition-colors dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-white"
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

export default ClasesVuelo;
