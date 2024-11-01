import axios from 'axios';

export const getUserProfile = async (token) => {
    try {
        const response = await axios.get('https://reservuelos.onrender.com/api/users/me', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': '*/*',
            }
        });

        // Retorna la información del perfil del usuario
        return response.data;
    } catch (error) {
        throw error?.response?.data?.message || "Error al obtener el perfil del usuario";
    }
};
