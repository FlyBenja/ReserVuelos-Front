// TraeReservas.js
import axios from 'axios';

const API_URL = 'https://reservuelos.onrender.com/api/reservas';

export const fetchReservations = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': '*/*',
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener las reservaciones:", error);
    throw error;
  }
};
