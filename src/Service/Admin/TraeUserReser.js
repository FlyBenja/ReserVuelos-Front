// src/Service/Pasajeros/TraeUserReser.js
import axios from 'axios';

export const fetchUserReservationData = async (reservationId) => {
  try {
    const response = await axios.get(`https://reservuelos.onrender.com/api/datos-vuelo/reserva/${reservationId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los datos de la reserva:", error);
    throw error;
  }
};
