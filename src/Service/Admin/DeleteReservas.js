// /Service/Admin/DeleteReserva.js
export const deleteReservation = async (id, token) => {
    const url = `https://reservuelos.onrender.com/api/reservas/${id}`;
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error eliminando la reserva');
      return data;
    } catch (error) {
      throw error;
    }
  };
  