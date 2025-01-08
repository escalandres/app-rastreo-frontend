import React from 'react';
import PropTypes from 'prop-types';
import { alerta, showLoader, hideLoader } from '../../js/general';

import MarkerContainer from "./MarkerContainer";
import MapItem from "./MapItem";
import ShowTimeline from './ShowTimeline';

const RightSection = ({ container, token }) => {
    const [center, setCenter] = React.useState();
    const [zoom, setZoom] = React.useState();
    const [isConsultingShipment, setIsConsultingShipment] = React.useState(false);
    const [showAllMarkers, setShowAllMarkers] = React.useState(false);
    // const [shipment, setShipment] = React.useState({
    //     id: 1,
    //     container_id: 1,
    //     start_date: "24/10/23,09:16:59-24",
    //     delivery_date: null,
    //     shipment_data: {
    //         company: "DHL",
    //         service_id: "express",
    //         service: "Express",
    //         tracking_number: "2989923510",
    //     },
    //     locations: [],
    //     shipment_status: [{
    //         timestamp: "24/10/23,09:16:59-24",
    //         description: "En tránsito | El envío ha salido para su entrega",
    //         location: "Ciudad de México, CDMX"
    //     }]
    // });
    const [shipment, setShipment] = React.useState({
        id: 0,
        container_id: 0,
        start_date: "",
        delivery_date: null,
        shipment_data: {
            company: "",
            service_id: "",
            service: "",
            tracking_number: "",
        },
        locations: [],
        shipment_status: []
    });
    const items = [];
    // const itemsTest = [
    //     { coordenadas: { lat: 19.378348, lng: -99.194816 }, date: "24/10/23,09:16:59-24", status: "En camino" },
    //     { coordenadas: { lat: 19.371597, lng: -99.203664 }, date: "24/10/23,09:51:53-24", status: "En camino" },
    //     { coordenadas: { lat: 19.336248, lng: -99.176434 }, date: "24/10/23,09:56:05-24", status: "En camino" },
    //     { coordenadas: { lat: 19.335635, lng: -99.157027 }, date: "24/10/23,09:58:05-24", status: "En camino" },
    //     { coordenadas: { lat: 19.357984, lng: -99.160291 }, date: "24/10/23,10:05:05-24", status: "En camino" },
    //     { coordenadas: { lat: 19.367132, lng: -99.126199 }, date: "24/10/23,10:16:05-24", status: "En camino" },
    //     { coordenadas: { lat: 19.382153, lng: -99.085371 }, date: "24/10/23,10:56:05-24", status: "En camino" },
    //     { coordenadas: { lat: 19.1495247, lng: -99.0237388 }, date: "24/10/23,10:56:05-24", status: "En camino" },
    //     { coordenadas: { lat: 18.9270946, lng: -99.2514939 }, date: "24/10/23,11:56:05-24", status: "En camino" },
    //     { coordenadas: { lat: 18.912246, lng: -99.2865554 }, date: "24/10/23,12:56:05-24", status: "En camino" },
    // ];
    const [markers, setMarkers] = React.useState(items);
    const containerRef = React.useRef(container);

    React.useEffect(() => { 
        const getContainerCurrentShipment = async (trackerID) => {
            try {
                showLoader();
                const queryParams = new URLSearchParams({ trackerID: trackerID }).toString();
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/app/get-shipment-data?${queryParams}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                hideLoader();
                if (!response.ok) {
                    alerta.error('No se pudo obtener la información de envío de este rastreador. Inténtelo nuevamente.');
                } else {
                    const data = await response.json();
                    console.log(response);
                    console.log(data);
                    setShipment(data.result);
                    setIsConsultingShipment(false);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (container !== '' && containerRef.current !== container) {
            containerRef.current = container;
            if (!isConsultingShipment) {
                setIsConsultingShipment(true);
                getContainerCurrentShipment(container);
            }
        } 
    }, [container, isConsultingShipment, token]);

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
                <ShowTimeline shipment_status={shipment.shipment_status} />
            </div>
            
            <div className="flex flex-grow overflow-hidden">
                <div className="w-1/2 h-full no-padding flex flex-col">
                    <MapItem zoom={zoom} center={center} showMarkers={showAllMarkers} markers={markers} />
                </div>
                <div className="w-1/2 h-full no-padding flex flex-col">
                    <MarkerContainer shipment={shipment} width={40} height={40} onItemClick={handleItemClick} />
                </div>
            </div>
            </div>
        
    );
}

RightSection.propTypes = {
    token: PropTypes.string,
    container: PropTypes.string
};

export default RightSection;
