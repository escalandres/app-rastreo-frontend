import { useState, useEffect, useCallback } from 'react';
import Header from './App/components/Header';
import LeftSection from './App/components/LeftSection';
import './App/css/app.css';
import { alerta, showLoader, hideLoader } from './js/general';
import { jwtDecode } from 'jwt-decode';

import RightSection from './App/components/RightSection';

const App = () => {
    const [container, setContainer] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Estado de carga
    const [containers, setContainers] = useState([]);
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);

    const getUserContainers = useCallback(async () => {
        console.log('Obteniendo contenedores de usuario'); 
        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/app/get-user-tracker`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                alerta.error('No se pudo obtener sus rastreadores. Inténtelo nuevamente.');
                return [];
            } else {
                const data = await response.json();
                return data.message;
            }
        } catch (error) {
            console.error('Error:', error);
            return [];
        } finally {
            setIsLoading(false);
        }
    }, [token]);

    useEffect(() => {
        const fetchData = async () => {
            showLoader();
            const results = await getUserContainers();
            setContainers(results);
            hideLoader();
        };

        fetchData();
    }, [getUserContainers]);

    return (
        <div className='bg-gray-10 dark:bg-gray-50 flex flex-col h-screen'>
            <Header token={decoded}/>
            <div className="flex-grow app__container text-black px-4 py-4 overflow-auto">
                <div className="column-40">
                    <LeftSection setContainer={setContainer} containers={containers} isLoading={isLoading} />
                </div>
                <div className="column-60">
                    <RightSection token={token} container={container} />
                </div>
            </div>
        </div>
    );
};

export default App;
