import React from 'react';
import PropTypes from 'prop-types';
import { alerta, showLoader, hideLoader } from '../../js/general';

import MarkerContainer from "./MarkerContainer";
import MapItem from "./MapItem";
import ShowTimeline from './ShowTimeline';
import GenerateReport from './GenerateReport';

const RightSection = ({ container, token }) => {
    const [center, setCenter] = React.useState();
    const [zoom, setZoom] = React.useState();
    const [isCellTower, setIsCellTower] = React.useState();
    const [radius, setRadius] = React.useState();
    const [isConsultingShipment, setIsConsultingShipment] = React.useState(false);
    const [showAllMarkers, setShowAllMarkers] = React.useState(false);

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

    const [markers, setMarkers] = React.useState(shipment);
    const containerRef = React.useRef(container.id);
    // console.log('containerRef', containerRef.current);
    // console.log('container', container);
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
                    // console.log(response);
                    // console.log(data);
                    setShipment(data.result);
                    setIsConsultingShipment(false);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (container.id !== '' && containerRef.current !== container.id) {
            containerRef.current = container.id;
            if (!isConsultingShipment) {
                setIsConsultingShipment(true);
                getContainerCurrentShipment(container.id);
            }
        } 
    }, [container, isConsultingShipment, token]);

    const handleItemClick = (coordenadas, aumento, esTorreCelular, radio) => {
        setCenter(coordenadas);
        setZoom(aumento);
        setIsCellTower(esTorreCelular);
        setRadius(radio);
    };

    const handleShowAllMarkers = () => {
        // setShowAllMarkers(true);
        setMarkers(shipment.locations);
    };
    const handleHideAllMarkers = () => {
        // setShowAllMarkers(true);
        setMarkers([]);
    };
    const handleToggleMarkers = () => { if (showAllMarkers) { handleHideAllMarkers(); } else { handleShowAllMarkers(); } setShowAllMarkers(!showAllMarkers); };

    return (
        <div className="flex flex-col h-full">
            <h1 className="text-left text-lg font-bold mb-4">Ubicación del envío</h1>
            <div className="flex items-center gap-4 mb-2">
                <ShowTimeline shipment_status={shipment.shipment_status} />
                <GenerateReport container={container} />
                {/* <button className="px-4 py-2 font-medium text-[#4f46e5] border-[#4f46e5] hover:bg-indigo-500 hover:text-white active:bg-indigo-600 rounded-lg duration-150" onClick={handleShowAllMarkers}>
                    <i className="fa-solid fa-eye me-2"></i> Mostrar marcadores
                </button>
                <button className="px-4 py-2 font-medium text-[#4f46e5] border-[#4f46e5] hover:bg-indigo-500 hover:text-white active:bg-indigo-600 rounded-lg duration-150" onClick={handleHideAllMarkers}>
                    <i className="fa-solid fa-eye-slash me-2"></i> Quitar marcadores
                </button> */}
                <button className="px-4 py-2 font-medium text-[#4f46e5] border-[#4f46e5] hover:bg-indigo-500 hover:text-white active:bg-indigo-600 rounded-lg duration-150" onClick={handleToggleMarkers} > <i className={`fa-solid ${showAllMarkers ? 'fa-eye-slash' : 'fa-eye'} me-2`}></i> {showAllMarkers ? 'Quitar marcadores' : 'Mostrar marcadores'} </button>
            </div>
            
            <div className="flex flex-grow overflow-hidden">
                <div className="w-3/5 h-full no-padding flex flex-col">
                    <MapItem zoom={zoom} center={center} showMarkers={showAllMarkers} markers={markers} isCellTower={isCellTower} radius={radius} />
                </div>
                <div className="w-2/5 h-full no-padding flex flex-col">
                    <MarkerContainer shipment={shipment} width={40} height={40} onItemClick={handleItemClick} />
                </div>
            </div>
            </div>
        
    );
}

RightSection.propTypes = {
    token: PropTypes.string,
    container: PropTypes.object
};

export default RightSection;
