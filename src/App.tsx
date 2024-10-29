import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Graficas from './pages/Admin/Inicio/Graficas';
import Profile from './pages/Admin/DatosPerfil/Profile';
import Settings from './pages/Admin/DatosPerfil/Settings';
import DefaultLayout from './layout/DefaultLayout';
import Bitacora from './pages/Admin/Inicio/Bitacora';
import SubirEstudiantes from './pages/Admin/Estudiantes/SubirEstudiantes';
import ListarEstudiantes from './pages/Admin/Estudiantes/ListarEstudiantes';
import SubirCatedraticos from './pages/Admin/Catedraticos/SubirCatedraticos';
import ListarCatedraticos from './pages/Admin/Catedraticos/ListarCatedraticos';
import CrearCatedraticos from './pages/Admin/Catedraticos/CrearCatedraticos';
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
        <Route index element={<Graficas />} />
        <Route path="Bitacora" element={<Bitacora />} />
        <Route path="subir-estudiantes" element={<SubirEstudiantes />} />
        <Route path="listado-estudiantes" element={<ListarEstudiantes />} />
        <Route path="subir-catedraticos" element={<SubirCatedraticos />} />
        <Route path="listado-catedraticos" element={<ListarCatedraticos />} />
        <Route path="crear-catedraticos" element={<CrearCatedraticos />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
