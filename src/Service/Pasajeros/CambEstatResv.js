// Service/Pasajeros/CambEstatResv.js
import axios from 'axios';

const API_URL = 'https://reservuelos.onrender.com/api/datos-vuelo';

export const toggleReservationStatus = async (id, status) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error('Error al cambiar el estado de la reserva:', error);
    throw error;
  }
};
