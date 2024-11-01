// UpdateContra.js
import axios from 'axios';

export const updatePassword = async (token, currentPassword, newPassword, confirmPassword) => {
  try {
    const response = await axios.put(
      'https://reservuelos.onrender.com/api/users/me/password',
      { currentPassword, newPassword, confirmPassword },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error?.response?.data?.message || "Error al actualizar la contraseña";
  }
};
