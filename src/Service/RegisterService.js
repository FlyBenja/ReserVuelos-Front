// RegisterService.js
import axios from 'axios';
import Swal from 'sweetalert2';

const API_URL = 'https://reservuelos.onrender.com/api/users';

export const registerUser = async (username, password) => {
  try {
    const response = await axios.post(API_URL, {
      username,
      password,
      roleId: 2, // El rol predeterminado para el registro
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response.data.error || 'Usuario ya registrado',
      });
    } else if (error.response && error.response.status === 500) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al crear el usuario',
      });
    } else if (error.response && error.response.data.error === "role inexistente") {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Role inexistente',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo conectar con el servidor',
      });
    }
    throw error;
  }
};
