import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

//Administradores
import Roles from './pages/Admin/Roles';
import ClasesVuelo from './pages/Admin/ClasesVuelo';
import Reservaciones from './pages/Admin/Reservaciones';
import ListarPasajeros from './pages/Admin/ListaPasajeros';
import InfoPasajeros from './pages/Admin/InfoPasajeros';

//Pasajeros
import Reservas from './pages/Pasajero/ListarReservas';
import CrearReservas from './pages/Pasajero/CrearReservas';
import InfoReservas from './pages/Pasajero/InfoReserva';

//Datos Generales
import Profile from './pages/DatosPerfil/Profile';
import Settings from './pages/DatosPerfil/Settings';
import DefaultLayout from './layout/DefaultLayout';
function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    null
  ) : (
    <DefaultLayout>
      <Routes>
        <Route path="roles" element={<Roles />} />
        <Route path="Clase-de-Vuelo" element={<ClasesVuelo />} />
        <Route path="Reservaciones" element={<Reservaciones />} />
        <Route path="listar-Pasajeros" element={<ListarPasajeros />} />
        <Route path="info-Pasajero" element={<InfoPasajeros />} />

        <Route path="reservas" element={<Reservas />} />
        <Route path="crear-reservas" element={<CrearReservas />} />
        <Route path="info-reservas" element={<InfoReservas />} />


        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
