import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import userSix from '../../images/user/user-06.png'; // Imagen de perfil proporcionada
import ofiLogo from '../../images/Login/Aeropuerto.jpg';
import { getUserProfile } from '../../Service/getUserProfile';
import { getRoleById } from '../../Service/GetRoleId';

const Profile = () => {
  const [username, setUsername] = useState('');
  const [roleName, setRoleName] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Llama a getUserProfile para obtener los datos del perfil
          const profileData = await getUserProfile(token);
          setUsername(profileData.username);

          // Llama a getRoleById usando el roleId obtenido
          const userRole = await getRoleById(profileData.roleId, token);
          setRoleName(userRole);
        } else {
          console.error("Token no disponible");
        }
      } catch (error) {
        console.error("Error al obtener el perfil o rol del usuario:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      <Breadcrumb pageName="Profile" />
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-32 md:h-48">
          <img
            src={ofiLogo}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          />
        </div>
        <div className="px-4 pb-1 text-center lg:pb-3 xl:pb-4">
          <div className="relative z-30 mx-auto -mt-16 h-24 w-24 sm:h-36 sm:w-36 sm:-mt-20 rounded-full bg-white/20 p-1 backdrop-blur sm:p-2">
            <img src={userSix} alt="profile" className="w-full h-full rounded-full" />
          </div>
          <div className="mt-1">
            <h3 className="mb-1 text-xl font-semibold text-black dark:text-white">
              {username || 'Nombre de Usuario'}
            </h3>
            <div className="mx-auto mt-2 grid max-w-lg rounded-md border border-stroke py-2 dark:border-strokedark dark:bg-[#37404F]">
              <div className="flex flex-col items-center justify-center px-2">
                <span className="font-semibold text-black dark:text-white">
                  {roleName || 'Rol Desconocido'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
