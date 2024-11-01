import axios from 'axios';

export const getFlightClasses = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://reservuelos.onrender.com/api/clases-vuelo', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || 'Error al obtener las clases de vuelo';
    }
};
