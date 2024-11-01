// src/Service/Pasajeros/TraeDatVue.js
import axios from 'axios';

export const fetchFlightDataById = async (flightDataId) => {
  try {
    const response = await axios.get(`https://reservuelos.onrender.com/api/datos-vuelo/${flightDataId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los datos de vuelo:", error);
    throw error;
  }
};
