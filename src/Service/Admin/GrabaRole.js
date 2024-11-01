import axios from 'axios';

export const createRole = async (nombreRole) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post('https://reservuelos.onrender.com/api/roles', 
        { nombreRole },
        {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw error?.response?.data?.error || "Error al crear el rol";
    }
};
