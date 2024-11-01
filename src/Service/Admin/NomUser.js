// src/Service/Pasajeros/NomUser.js
import axios from 'axios';

export const fetchAllUsers = async (token) => {
  try {
    const response = await axios.get('https://reservuelos.onrender.com/api/users', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: '*/*'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw error;
  }
};
