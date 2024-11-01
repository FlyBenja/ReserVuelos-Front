import axios from 'axios';

export const updateFlightClass = async (id, newName) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`https://reservuelos.onrender.com/api/clases-vuelo/${id}`, 
            { nombreClase: newName },
            { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || 'Error al actualizar la clase de vuelo';
    }
};
