// GrabaReservJun.js
import axios from 'axios';

const API_URL = 'https://reservuelos.onrender.com/api/datos-vuelo';

export const saveReservation = async (token, reservationData) => {
  try {
    const response = await axios.post(API_URL, reservationData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear la reservación:", error);
    throw error;
  }
};
