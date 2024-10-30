import { useState } from 'react';
import { alerta, showLoader, hideLoader } from './js/general';

const ChangePassword = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null); // Resetear errores previos

        try {
            showLoader();
            // Simulación de la solicitud de autenticación al servidor
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email:email.trim(), password:password.trim() }),
            });
            hideLoader();
            // console.log(response);
            if (!response.ok) {
                alerta.error('Error al iniciar sesión');
            }
            else{
                const data = await response.json();
                console.log(response);
                // Manejo de la respuesta exitosa
                // console.log(data);
                // console.log('Usuario autenticado:', data.token);

                // Guardar el token o información del usuario en el almacenamiento local o en el estado
                // Uso de la función para crear una cookie que expire en 7 días
                // Uso de la función para crear una cookie de autenticación que expire en 7 días
                // setAuthCookie(data.token, 1);
                localStorage.setItem('token', data.token); // Ejemplo
                // Redireccionar o actualizar el estado de la aplicación
                window.location.href = '/app'; // Ejemplo
            }
        } catch (error) {
            hideLoader();
            setError(error.message);
        }
    };

    return (
        <>
        <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-10 dark:bg-gray-50 sm:px-4 py-4">
            <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
                <div className="bg-white shadow p-4 py-6 space-y-8 sm:p-6 sm:rounded-lg">
                    <div className="text-center">
                        <a href="/">
                            <img src="/icons/dark-favicon.svg" width={100} className="mx-auto" />
                        </a>
                        <div className="mt-5 space-y-2">
                            <h3 className="text-gray-800 text-2xl font-bold sm:text-xl">Recupera tu cuenta</h3>
                        </div>
                    </div>
                    <div className="relative">
                        <span className="block w-full h-px bg-gray-300"></span>
                        <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">O continua con</p>
                    </div>
                    <form
                        onSubmit={handleLogin}
                        className="space-y-5"
                    >
                        <div className="text-left">
                            <label className="font-medium">
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                value={email}
                                placeholder='Escribe tu correo electrónico'
                                onChange={(e) => setEmail(e.target.value)} 
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                        </div>
                        <button
                            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                            type="submit"
                        >
                            Recuperar contraseña
                        </button>
                    </form>
                    <div className="relative">
                        <span className="block w-full h-px bg-gray-300"></span>
                        <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">O continua con</p>
                    </div>
                    <div className="text-center">
                        <a href="/registro" className="hover:text-indigo-600">¿No tienes cuenta en Cosmos?</a>
                    </div>
                    <div className="text-center">
                        <a href="/login" className="hover:text-indigo-600">También puedes iniciar sesión</a>
                    </div>
                </div>
            </div>
        </main>
        </>
    )
}

export default ChangePassword;