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
      <div className="flex justify-end p-0">
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded shadow"
        >
          Crear Rol
        </button>
      </div>

      {/* Listado de roles en cards de TailAdmin */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 p-4">
        {roles.map((role) => (
          <div key={role.id} className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
            <h3 className="text-lg font-semibold">{role.name}</h3>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => openUpdateModal(role.id, role.name)}
                className="bg-blue-500 text-white px-4 py-2 rounded shadow"
              >
                Actualizar
              </button>
              <button
                onClick={() => handleDelete(role.id)}
                className="bg-red-500 text-white px-4 py-2 rounded shadow"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para crear nuevo rol */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Crear Nuevo Rol</h2>
            <input
              type="text"
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
              placeholder="Nombre del Rol"
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

      {/* Modal para actualizar rol */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Actualizar Rol</h2>
            <input
              type="text"
              value={currentRoleName}
              onChange={(e) => setCurrentRoleName(e.target.value)}
              placeholder="Nombre del Rol"
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

export default Roles;
