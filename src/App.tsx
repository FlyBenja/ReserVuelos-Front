import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Roles from './pages/Admin/Roles';
import Profile from './pages/Admin/DatosPerfil/Profile';
import Settings from './pages/Admin/DatosPerfil/Settings';
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
        <Route index element={<Roles />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
