import axios from 'axios';

export const deleteRole = async (roleId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`https://reservuelos.onrender.com/api/roles/${roleId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error?.response?.data?.error || "Error al eliminar el rol";
    }
};
