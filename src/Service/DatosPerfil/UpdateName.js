// UpdateName.js
import axios from 'axios';

export const updateUsername = async (token, newUsername) => {
  try {
    const response = await axios.put(
      'https://reservuelos.onrender.com/api/users/me/username',
      { newUsername },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error?.response?.data?.message || "Error al actualizar el nombre de usuario";
  }
};
