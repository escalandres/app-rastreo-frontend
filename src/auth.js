// auth.js
export const isAuthenticated = () => {
    // Verifica si existe el token en el localStorage
    return !!localStorage.getItem('token');
};