import React from 'react';
import PropTypes from 'prop-types';
import { jwtDecode } from 'jwt-decode';
import { alerta, showLoader, hideLoader } from '../../js/general';

import MarkerContainer from "./MarkerContainer";
import MapItem from "./MapItem";

const RightSection = ({ container }) => {
    const [center, setCenter] = React.useState();
    const [zoom, setZoom] = React.useState();
    const [showAllMarkers, setShowAllMarkers] = React.useState(false);
    const items = [
        { coordenadas: { lat: 19.378348, lng: -99.194816 }, date: "24/10/23,09:16:59-24", status: "En camino" },
        { coordenadas: { lat: 19.371597, lng: -99.203664 }, date: "24/10/23,09:51:53-24", status: "En camino" },
        { coordenadas: { lat: 19.336248, lng: -99.176434 }, date: "24/10/23,09:56:05-24", status: "En camino" },
        { coordenadas: { lat: 19.335635, lng: -99.157027 }, date: "24/10/23,09:58:05-24", status: "En camino" },
        { coordenadas: { lat: 19.357984, lng: -99.160291 }, date: "24/10/23,10:05:05-24", status: "En camino" },
        { coordenadas: { lat: 19.367132, lng: -99.126199 }, date: "24/10/23,10:16:05-24", status: "En camino" },
        { coordenadas: { lat: 19.382153, lng: -99.085371 }, date: "24/10/23,10:56:05-24", status: "En camino" },
        { coordenadas: { lat: 19.1495247, lng: -99.0237388 }, date: "24/10/23,10:56:05-24", status: "En camino" },
        { coordenadas: { lat: 18.9270946, lng: -99.2514939 }, date: "24/10/23,11:56:05-24", status: "En camino" },
        { coordenadas: { lat: 18.912246, lng: -99.2865554 }, date: "24/10/23,12:56:05-24", status: "En camino" },
    ];
    const [markers, setMarkers] = React.useState(items);
    const containerRef = React.useRef(container);

    const getContainerCurrentShipment = async (e) => {
        e.preventDefault();
        try{
            const userToken = jwtDecode(localStorage.getItem('token'));

            showLoader();
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/app/get-user-shipments`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            });
            hideLoader();
            // console.log(response);
            if (!response.ok) {
                alerta.error('No se pudo obtener sus rastreadores. Inténtelo nuevamente.');
            }
            else{
                const data = await response.json();
                console.log(response);
                localStorage.setItem('token', data.token); // Ejemplo
                // Redireccionar o actualizar el estado de la aplicación
                window.location.href = '/app'; // Ejemplo
            }
        }catch(error){
            console.error('Error:', error);
        }
        

    };


    React.useEffect(() => { if (containerRef.current !== container) { containerRef.current = container; alert(`container: ${container}`)  } }, [container]);
    
    const handleItemClick = (coordenadas, aumento) => {
        setCenter(coordenadas);
        setZoom(aumento);
    };

    const handleShowAllMarkers = () => {
        setShowAllMarkers(true);
        setMarkers(items);
    };
    const handleHideAllMarkers = () => {
        setShowAllMarkers(true);
        setMarkers([]);
    };

    return (
        <div className="flex flex-col h-full">
            <h1 className="text-left text-lg font-bold mb-4">Ubicación del envío</h1>
            <div className="flex items-center gap-4 mb-2">
                <button className="px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150" onClick={handleShowAllMarkers}>
                    <i className="fa-solid fa-plus me-2"></i> Mostrar todos los marcadores
                </button>
                <button className="px-4 py-2 font-medium text-[#4f46e5] border-[#4f46e5] hover:bg-indigo-500 hover:text-white active:bg-indigo-600 rounded-lg duration-150" onClick={handleHideAllMarkers}>
                    <i className="fa-solid fa-plus me-2"></i> Quitar marcadores
                </button>
            </div>
            
            <div className="flex flex-grow overflow-hidden">
                <div className="w-1/2 h-full no-padding flex flex-col">
                    <MapItem zoom={zoom} center={center} showMarkers={showAllMarkers} markers={markers} />
                </div>
                <div className="w-1/2 h-full no-padding flex flex-col">
                    <MarkerContainer items={items} width={40} height={40} onItemClick={handleItemClick} />
                </div>
            </div>
            </div>
        
    );
}
RightSection.propTypes = {
    container: PropTypes.string  // Valida que children sea un nodo de React y sea requerido
};

export default RightSection;
