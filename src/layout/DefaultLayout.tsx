import React, { useState, useEffect, ReactNode } from 'react';
import Header from '../components/Header/index';
import SidebarAdmin from '../components/Sidebar/Admin';
import SidebarPasajero from '../components/Sidebar/Pasajero/index';
// @ts-ignore
import { getUserProfile } from '../Service/getUserProfile.js';

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [role, setRole] = useState<number | null>(null); // Guardamos el rol aquí

  useEffect(() => {
    const fetchRole = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const profile = await getUserProfile(token);
          setRole(profile.roleId);
        } catch (error) {
          console.error("Error al obtener el rol del usuario:", error);
        }
      }
    };
    fetchRole();
  }, []);

  if (role === null) {
    return <div>Cargando...</div>; // Muestra un mensaje de carga mientras obtenemos el rol
  }

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        {/* Mostrar el sidebar correspondiente al rol */}
        {role === 1 ? (
          <SidebarAdmin sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        ) : role === 2 ? (
          <SidebarPasajero sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        ) : null}
        
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
