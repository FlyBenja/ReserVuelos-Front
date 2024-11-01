import axios from 'axios';

export const login = async (username, password) => {
    try {
        const response = await axios.post('https://reservuelos.onrender.com/api/users/login', {
            username,
            password,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            }
        });

        // Retorna el token en caso de éxito
        return response.data.token;
    } catch (error) {
        // Lanza el mensaje de error para que se maneje en el componente
        throw error?.response?.data?.message || "Error de autenticación";
    }
};
