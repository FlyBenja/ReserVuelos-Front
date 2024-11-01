import axios from 'axios';

export const getFlightClassDescription = async (clasevuelo_id, token) => {
  try {
    const response = await axios.get(`https://reservuelos.onrender.com/api/clases-vuelo/${clasevuelo_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': '*/*'
      }
    });
    return response.data.nombreClase; // Devuelve solo el nombreClase
  } catch (error) {
    console.error("Error al obtener la descripción de la clase de vuelo:", error);
    throw error;
  }
};
