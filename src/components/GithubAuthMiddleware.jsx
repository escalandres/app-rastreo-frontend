import { useEffect } from 'react';
import { alerta, showLoader, hideLoader } from '../pages/js/general';

const GithubAuthorize = () => {
    
        useEffect(() => {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const code = urlParams.get('code');
            const fakeEvent = { preventDefault: () => console.log("preventDefault called") };
            console.log(code);
            alert("code: "+code);
            handleSignUp(fakeEvent, code);
            
        }, []);
    
        const handleSignUp = async (e,code) => {
            e.preventDefault();
            try{
                showLoader();
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/auth/github`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ code: code }),
                });
                hideLoader();
                if (!response.ok) {
                    alerta.error('Error al iniciar sesión');
                }
    
                const data = await response.json();
    
                // Guardar el token o información del usuario en el almacenamiento local o en el estado
                localStorage.setItem('token', data.token);
    
                // Redireccionar o actualizar el estado de la aplicación
                window.location.href = '/app';
            } catch (error) {
                hideLoader();
                alerta.error('Error al iniciar sesión. Intente de nuevo');
                window.location.href = '/login';
                // setError(error.message);
            }
        };
}

export default GithubAuthorize;