// src/Service/GetRoleId.js
import axios from 'axios';

export const getRoleById = async (role_id, token) => {
  try {
    const response = await axios.get(`https://reservuelos.onrender.com/api/roles/${role_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: '*/*',
      },
    });
    return response.data.nombreRole; // Retorna solo el nombre del rol
  } catch (error) {
    console.error("Error al obtener el rol del usuario:", error);
    throw error;
  }
};
