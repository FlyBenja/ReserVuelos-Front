import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Roles from './pages/Admin/Roles';
import ClasesVuelo from './pages/Admin/ClasesVuelo';
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
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
