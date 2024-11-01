import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import umgLogo from './images/Login/Avion.png';
import ofiLogo from './images/Login/Aeropuerto.jpg';
import { registerUser } from './Service/RegisterService'; // Asegúrate de que la ruta sea correcta

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validaciones con SweetAlert2
    if (!username) {
      Swal.fire({
        icon: "warning",
        title: "Campo Requerido",
        text: "Por favor, ingresa un nombre de usuario.",
        confirmButtonColor: "#10B981" // Color verde para el botón OK
      });
      return;
    }

    if (!password) {
      Swal.fire({
        icon: "warning",
        title: "Campo Requerido",
        text: "Por favor, ingresa una contraseña.",
        confirmButtonColor: "#10B981" // Color verde para el botón OK
      });
      return;
    }

    if (!confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Campo Requerido",
        text: "Por favor, confirma tu contraseña.",
        confirmButtonColor: "#10B981" // Color verde para el botón OK
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Las contraseñas no coinciden.",
        confirmButtonColor: "#10B981" // Color verde para el botón OK
      });
      return;
    }

    // Lógica de registro usando RegisterService
    try {
      await registerUser(username, password);
      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: `Bienvenido, ${username}!`,
        confirmButtonColor: "#10B981" // Color verde para el botón OK
      }).then(() => {
        navigate(-1); // Retrocede una página en lugar de redirigir
      });
    } catch (error) {
      console.error("Error al registrar:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-no-repeat bg-cover" style={{ backgroundImage: `url(${ofiLogo})` }}>
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="mb-4 text-center">
          <img src={umgLogo} alt="UMG Logo" className="w-24 mx-auto" />
          <h1 className="my-3 text-xl font-semibold text-gray-700">Registro</h1>
        </div>
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-1">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Usuario</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Usuario"
              required
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Contraseña"
              required
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Confirmar Contraseña"
              required
            />
          </div>
          <button type="submit" className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">Registrar</button>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-500">¿Ya tienes cuenta? </span>
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:underline"
          >
            Inicia sesión aquí
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
