import axios from 'axios';

export const updateRole = async (roleId, nombreRole) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`https://reservuelos.onrender.com/api/roles/${roleId}`, 
        { nombreRole },
        {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw error?.response?.data?.error || "Error al actualizar el rol";
    }
};
