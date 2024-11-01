import axios from 'axios';

export const deleteFlightClass = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`https://reservuelos.onrender.com/api/clases-vuelo/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || 'Error al eliminar la clase de vuelo';
    }
};
