// auth.js
import jwt from 'jsonwebtoken';

export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    console.log(token);
    // Verifica si existe el token en el localStorage
    if (!token) {
        return false;
    }

    try {
        // Decodifica el token para obtener la fecha de expiración
        const decoded = jwt.decode(token);
        console.log(decoded);
        const now = Date.now() / 1000; // Tiempo actual en segundos

        // Verifica si el token ha expirado
        if (decoded.exp < now) {
            // Si el token ha expirado, lo eliminamos del localStorage
            localStorage.removeItem('token');
            return false;
        }

        // Si el token es válido y no ha expirado
        return true;

    } catch (error) {
        // En caso de que el token sea inválido o haya un error al decodificarlo
        localStorage.removeItem('token');
        return false;
    }
};
