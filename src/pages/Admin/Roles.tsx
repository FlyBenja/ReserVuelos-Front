import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

const Roles: React.FC = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Administrador' },
    { id: 2, name: 'Editor' },
    { id: 3, name: 'Usuario' },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [currentRoleId, setCurrentRoleId] = useState<number | null>(null);
  const [currentRoleName, setCurrentRoleName] = useState('');

  // Función para eliminar un rol
  const handleDelete = (id: number) => {
    const roleName = roles.find((role) => role.id === id)?.name || 'Rol';
    setRoles((prevRoles) => prevRoles.filter((role) => role.id !== id));
    Swal.fire({
      icon: 'success',
      title: 'Eliminado',
      text: `El rol "${roleName}" ha sido eliminado correctamente`,
      timer: 2000,
      showConfirmButton: false,
    });
  };

  // Función para crear un nuevo rol
  const handleCreate = () => {
    if (newRoleName.trim()) {
      const newRole = { id: roles.length + 1, name: newRoleName };
      setRoles((prevRoles) => [...prevRoles, newRole]);
      Swal.fire({
        icon: 'success',
        title: 'Creado',
        text: `El rol "${newRoleName}" ha sido creado exitosamente`,
        timer: 2000,
        showConfirmButton: false,
      });
      setNewRoleName('');
      setShowCreateModal(false);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: 'El nombre del rol no puede estar vacío',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  // Función para abrir el modal de actualización
  const openUpdateModal = (id: number, name: string) => {
    setCurrentRoleId(id);
    setCurrentRoleName(name);
    setShowUpdateModal(true);
  };

  // Función para actualizar un rol
  const handleUpdate = () => {
    if (currentRoleId !== null && currentRoleName.trim()) {
      const updatedRoles = roles.map((role) =>
        role.id === currentRoleId ? { ...role, name: currentRoleName } : role
      );
      setRoles(updatedRoles);
      Swal.fire({
        icon: 'success',
        title: 'Actualizado',
        text: `El rol ha sido actualizado a "${currentRoleName}"`,
        timer: 2000,
        showConfirmButton: false,
      });
      setShowUpdateModal(false);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: 'El nombre del rol no puede estar vacío',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <>
      <Breadcrumb pageName="Roles" />

      {/* Botón para abrir el modal de crear */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          + Crear Rol
        </button>
      </div>

      {/* Listado de roles en cards con mejoras UI/UX */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 p-4">
        {roles.map((role) => (
          <div key={role.id} className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{role.name}</h3>
            <div className="flex space-x-4">
              <button
                onClick={() => openUpdateModal(role.id, role.name)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                Actualizar
              </button>
              <button
                onClick={() => handleDelete(role.id)}
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
              {showCreateModal ? 'Crear Nuevo Rol' : 'Actualizar Rol'}
            </h2>
            <input
              type="text"
              value={showCreateModal ? newRoleName : currentRoleName}
              onChange={(e) =>
                showCreateModal
                  ? setNewRoleName(e.target.value)
                  : setCurrentRoleName(e.target.value)
              }
              placeholder="Nombre del Rol"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end space-x-2">
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

export default Roles;
