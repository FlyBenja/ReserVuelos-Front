import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import userSix from '../../images/user/user-06.png'; // Imagen de perfil proporcionada
import ofiLogo from '../../images/Login/Aeropuerto.jpg';

const Profile = () => {
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
              Danish Heilium
            </h3>
            <div className="mx-auto mt-2 grid max-w-lg rounded-md border border-stroke py-2 dark:border-strokedark dark:bg-[#37404F]">
              <div className="flex flex-col items-center justify-center px-2">
                <span className="font-semibold text-black dark:text-white">
                  Administrador
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
