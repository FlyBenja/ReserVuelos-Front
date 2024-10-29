import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

const ClasesVuelo: React.FC = () => {
  const [classes, setClasses] = useState([
    { id: 1, name: 'Económica' },
    { id: 2, name: 'Ejecutiva' },
    { id: 3, name: 'Primera Clase' },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [currentClassId, setCurrentClassId] = useState<number | null>(null);
  const [currentClassName, setCurrentClassName] = useState('');

  // Función para eliminar una clase
  const handleDelete = (id: number) => {
    const className = classes.find((flightClass) => flightClass.id === id)?.name || 'Clase de Vuelo';
    setClasses((prevClasses) => prevClasses.filter((flightClass) => flightClass.id !== id));
    Swal.fire({
      icon: 'success',
      title: 'Eliminado',
      text: `La clase de vuelo "${className}" ha sido eliminada correctamente`,
      timer: 2000,
      showConfirmButton: false,
    });
  };

  // Función para crear una nueva clase
  const handleCreate = () => {
    if (newClassName.trim()) {
      const newClass = { id: classes.length + 1, name: newClassName };
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
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: 'El nombre de la clase de vuelo no puede estar vacío',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  // Función para abrir el modal de actualización
  const openUpdateModal = (id: number, name: string) => {
    setCurrentClassId(id);
    setCurrentClassName(name);
    setShowUpdateModal(true);
  };

  // Función para actualizar una clase
  const handleUpdate = () => {
    if (currentClassId !== null && currentClassName.trim()) {
      const updatedClasses = classes.map((flightClass) =>
        flightClass.id === currentClassId ? { ...flightClass, name: currentClassName } : flightClass
      );
      setClasses(updatedClasses);
      Swal.fire({
        icon: 'success',
        title: 'Actualizada',
        text: `La clase de vuelo ha sido actualizada a "${currentClassName}"`,
        timer: 2000,
        showConfirmButton: false,
      });
      setShowUpdateModal(false);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: 'El nombre de la clase de vuelo no puede estar vacío',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <>
      <Breadcrumb pageName="Clases de Vuelo" />

      {/* Botón para abrir el modal de crear */}
      <div className="flex justify-end p-0">
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded shadow"
        >
          Crear Clase
        </button>
      </div>

      {/* Listado de clases de vuelo en cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 p-4">
        {classes.map((flightClass) => (
          <div key={flightClass.id} className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
            <h3 className="text-lg font-semibold">{flightClass.name}</h3>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => openUpdateModal(flightClass.id, flightClass.name)}
                className="bg-blue-500 text-white px-4 py-2 rounded shadow"
              >
                Actualizar
              </button>
              <button
                onClick={() => handleDelete(flightClass.id)}
                className="bg-red-500 text-white px-4 py-2 rounded shadow"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para crear nueva clase */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Crear Nueva Clase de Vuelo</h2>
            <input
              type="text"
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
              placeholder="Nombre de la Clase"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowCreateModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreate}
                className="bg-green-500 text-white px-4 py-2 rounded shadow"
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para actualizar clase */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Actualizar Clase de Vuelo</h2>
            <input
              type="text"
              value={currentClassName}
              onChange={(e) => setCurrentClassName(e.target.value)}
              placeholder="Nombre de la Clase"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowUpdateModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded shadow"
              >
                Actualizar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ClasesVuelo;
