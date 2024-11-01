import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import Swal from "sweetalert2";
// @ts-ignore
import { login } from './Service/LoginService.js'; // Importando función de login
// @ts-ignore
import { getUserProfile } from './Service/getUserProfile.js'; // Importando función de perfil de usuario
import umgLogo from './images/Login/Avion.png';
import ofiLogo from './images/Login/Aeropuerto.jpg';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Obtener los valores de los campos
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    // Validaciones con SweetAlert2
    if (!username) {
      Swal.fire({
        icon: "warning",
        title: "Campo Requerido",
        text: "Por favor, ingresa tu usuario.",
        confirmButtonColor: "#10B981" // Color verde de TailAdmin
      });
      return;
    }

    if (!password) {
      Swal.fire({
        icon: "warning",
        title: "Campo Requerido",
        text: "Por favor, ingresa tu contraseña.",
        confirmButtonColor: "#10B981" // Color verde de TailAdmin
      });
      return;
    }

    try {
      // Llama a la función login de LoginService.js
      const token = await login(username, password);
      localStorage.setItem('token', token); // Guarda el token en el localStorage

      // Obtiene el perfil de usuario para conocer el rol
      const profile = await getUserProfile(token);
      const role = profile.roleId;

      // Redirige según el rol obtenido
      Swal.fire({
        icon: "success",
        title: "Inicio de Sesión Exitoso",
        text: `Bienvenido, ${profile.username}.`,
        confirmButtonColor: "#10B981" // Color verde de TailAdmin
      }).then(() => {
        if (role === 1) {
          navigate("/admin/roles");
        } else if (role === 2) {
          navigate("/pasajeros/reservas");
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Rol no reconocido.",
            confirmButtonColor: "#10B981" // Color verde de TailAdmin
          });
        }
      });
    } catch (error: any) {
      const errorMessage = typeof error === 'string' ? error : "Error de autenticación";
      Swal.fire({
        icon: "error",
        title: "Error de Autenticación",
        text: errorMessage,
        confirmButtonColor: "#10B981" // Color verde de TailAdmin
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-no-repeat bg-cover" style={{ backgroundImage: `url(${ofiLogo})` }}>
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="mb-4 text-center">
          <img src={umgLogo} alt="UMG Logo" className="w-24 mx-auto" />
          <h1 className="my-3 text-xl font-semibold text-gray-700">Inicio de Sesión</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Usuario</label>
            <div className="relative">
              <input 
                id="username"
                type="text" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                placeholder="Usuario" 
              />
              <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">
                <FaUser />
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <div className="relative">
              <input 
                id="password"
                type="password" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                placeholder="Contraseña"
              />
              <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">
                <FaLock />
              </span>
            </div>
          </div>
          <button type="submit" className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">Ingresar</button>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-500">¿No tienes cuenta? </span>
          <Link to="/register" className="text-blue-600 hover:underline">Regístrate aquí</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
