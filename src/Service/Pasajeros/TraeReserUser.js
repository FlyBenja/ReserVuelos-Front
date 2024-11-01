// Service/TraeReserUser.js
import axios from 'axios';

const API_URL = 'https://reservuelos.onrender.com/api/datos-vuelo/usuario';

export const fetchReservationsByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las reservas:', error);
    throw error;
  }
};
