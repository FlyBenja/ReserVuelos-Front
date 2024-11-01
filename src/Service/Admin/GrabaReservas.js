// GrabaReservas.js
import axios from 'axios';
import Swal from 'sweetalert2';

const API_URL = 'https://reservuelos.onrender.com/api/reservas';

export const createReservation = async (codigoReserva, fechaInicio, fechaFinal) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      API_URL,
      {
        codigoReserva,
        fechaInicio,
        fechaFinal,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.response?.data?.message || 'No se pudo crear la reservación',
    });
    throw error;
  }
};
