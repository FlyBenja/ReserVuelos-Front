import React, { useState } from "react";
import Swal from "sweetalert2";
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const Settings = () => {
  const [username, setUsername] = useState("devidjond45");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSaveUserInfo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username) {
      Swal.fire({
        icon: "warning",
        title: "Campo Requerido",
        text: "El campo 'Usuario' no puede estar vacío.",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Guardado",
      text: "La información del usuario ha sido actualizada.",
    });
  };

  const handlePasswordChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !repeatPassword) {
      Swal.fire({
        icon: "warning",
        title: "Campo Requerido",
        text: "Todos los campos de contraseña son obligatorios.",
      });
      return;
    }

    if (newPassword !== repeatPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Las contraseñas no coinciden.",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Contraseña Actualizada",
      text: "La contraseña ha sido cambiada exitosamente.",
    });

    // Limpiar campos después de guardar
    setCurrentPassword("");
    setNewPassword("");
    setRepeatPassword("");
  };

  return (
    <>
      <Breadcrumb pageName="Settings" />
      <div className="mx-auto max-w-5xl px-4 py-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Información Personal */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark self-start">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Información Personal</h3>
            </div>
            <div className="p-4">
              <form onSubmit={handleSaveUserInfo}>
                <div className="mb-3">
                  <label htmlFor="username" className="block text-sm font-medium text-black dark:text-white">Usuario</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded border border-stroke bg-gray py-2 px-4 text-black focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    placeholder="Ingresa tu usuario"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="role" className="block text-sm font-medium text-black dark:text-white">Rol</label>
                  <input
                    type="text"
                    id="role"
                    value="Admin"
                    disabled
                    className="w-full rounded border border-stroke bg-gray-200 py-2 px-4 text-black dark:border-strokedark dark:bg-gray-600 dark:text-black"
                    style={{ backgroundColor: '#f3f4f6' }}
                  />
                </div>
                <div className="flex justify-center mt-4">
                  <button type="submit" className="rounded bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-90">
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Cambiar Contraseña */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark self-start">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Cambiar Contraseña</h3>
            </div>
            <div className="p-4">
              <form onSubmit={handlePasswordChange}>
                <div className="mb-3">
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-black dark:text-white">Contraseña Actual</label>
                  <input
                    type="password"
                    id="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full rounded border border-stroke bg-gray py-2 px-4 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    placeholder="********"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="newPassword" className="block text-sm font-medium text-black dark:text-white">Nueva Contraseña</label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full rounded border border-stroke bg-gray py-2 px-4 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    placeholder="********"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="repeatPassword" className="block text-sm font-medium text-black dark:text-white">Repetir Contraseña</label>
                  <input
                    type="password"
                    id="repeatPassword"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    className="w-full rounded border border-stroke bg-gray py-2 px-4 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    placeholder="********"
                  />
                </div>
                <div className="flex justify-center mt-4">
                  <button type="submit" className="rounded bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-90">
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
