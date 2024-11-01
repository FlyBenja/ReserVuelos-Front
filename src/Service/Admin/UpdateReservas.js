// UpdateReservas.js
import axios from 'axios';
import Swal from 'sweetalert2';

const API_URL = 'https://reservuelos.onrender.com/api/reservas';

export const updateReservation = async (id, codigoReserva, fechaInicio, fechaFinal) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(
      `${API_URL}/${id}`,
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
      text: error.response?.data?.message || 'No se pudo actualizar la reservación',
    });
    throw error;
  }
};
