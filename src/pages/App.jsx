import React from 'react';
import Header from './App/components/Header';
import LeftSection from './App/components/LeftSection';
import './App/css/app.css';
import { alerta, showLoader, hideLoader } from './js/general';
import { jwtDecode } from 'jwt-decode';

import RightSection from './App/components/RightSection';

const App = () => {
    const [container, setContainer] = React.useState("Estado inicial");
    const token = jwtDecode(localStorage.getItem('token'));
    console.log(token);

    const getUserContainers = React.useCallback(async () => { // Tu lógica aquí 
        console.log('Obteniendo contenedores de usuario'); 
        try{
            showLoader();
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/app/get-user-shipments`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token.user.id}`
                }
            });
            hideLoader();
            // console.log(response);
            if (!response.ok) {
                alerta.error('No se pudo obtener sus rastreadores. Inténtelo nuevamente.');
                return {};
            }
            else{
                const data = await response.json();
                console.log(response);
                console.log(data);
                return data;
            }
        }catch(error){
            console.error('Error:', error);
            return {};
        }
    }, [token.user.id]); // Dependencias vacías para que no se vuelva a crear la función
    return (
        <div className='bg-gray-10 dark:bg-gray-50 flex flex-col h-screen'>
            <Header token={token}/>
            <div className="flex-grow app__container text-black px-4 py-4 overflow-auto">
                <div className="column-40">
                    <LeftSection setContainer={setContainer} getUserContainers={getUserContainers} />
                </div>
                <div className="column-60">
                    <RightSection container={container} />
                </div>
            </div>
        </div>
    )
}

export default App;
