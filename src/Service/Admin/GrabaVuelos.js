import axios from 'axios';

export const createFlightClass = async (className) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post('https://reservuelos.onrender.com/api/clases-vuelo', 
            { nombreClase: className },
            { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || 'Error al crear la clase de vuelo';
    }
};
