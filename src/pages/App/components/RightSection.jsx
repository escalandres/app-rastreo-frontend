import React from 'react';
import PropTypes from 'prop-types';
import { alerta, showLoader, hideLoader } from '../../js/general';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

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

    const handleEndShipment = async() => {
        console.log("shipment", shipment)
        const MySwal = withReactContent(Swal)

        MySwal.fire({
            title: <p>¿Estás seguro de terminar tu envío?</p>,
            html: <p>¡No podrás modificar esto!</p>,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Finalizar",
            cancelButtonText: "Cancelar",
            // didOpen: () => {
            //     // `MySwal` is a subclass of `Swal` with all the same instance & static methods
            //     MySwal.showLoading()
            // },
        }).then(async (result) => {
            if (result.isConfirmed) {
                if(shipment.delivery_date !== null) return MySwal.fire(<p>El envío ya ha finalizado</p>)
                let response = await terminarEnvio();
                if(response.success){
                    alerta.autoSuccess(response.message);
                    window.location.reload();
                }

                alerta.error(response.message);

            } else if (result.isDismissed) {
                // Si cancelaron o cerraron la alerta
                console.log("Cancelado");
            }
            
            
        })
    }

    async function terminarEnvio(){
        try {
            showLoader();
            const queryParams = new URLSearchParams({ shipmentId: shipment.id, trackerId: shipment.trackerId }).toString();
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/app/end-shipment?${queryParams}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                alerta.error('No se pudo obtener la información de envío de este rastreador. Inténtelo nuevamente.');
            } else {
                const data = await response.json();

                return data;
            }
        } catch (error) {
            console.error('Error:', error);
        } finally{
            hideLoader();
        }
    }

    return (
        <div className="flex flex-col h-full">
            <h1 className="text-left text-lg font-bold mb-4">Ubicación del envío</h1>
            <div className="flex items-center gap-4 mb-2">
                <ShowTimeline shipment_status={shipment.shipment_status} />
                <GenerateReport container={container} />
                <button className="px-4 py-2 font-medium text-[#4f46e5] border-[#4f46e5] hover:bg-indigo-500 hover:text-white active:bg-indigo-600 rounded-lg duration-150" onClick={handleToggleMarkers} > <i className={`fa-solid ${showAllMarkers ? 'fa-eye-slash' : 'fa-eye'} me-2`}></i> {showAllMarkers ? 'Quitar marcadores' : 'Mostrar marcadores'} </button>
                {/* <button className="px-4 py-2 font-medium text-[#4f46e5] border-[#4f46e5] hover:bg-indigo-500 hover:text-white active:bg-indigo-600 rounded-lg duration-150" onClick={handleHideAllMarkers}>
                    <i className="fa-solid fa-eye-slash me-2"></i> Quitar marcadores
                </button> */}
                {
                    shipment.id > 0 
                    ?   <button className="px-4 py-2 font-medium text-[#dc3545] border-[#dc3545] hover:bg-[#dc3545] hover:border-[#dc3545] hover:text-white active:bg-[#dc3545] rounded-lg duration-150" 
                            onClick={handleEndShipment}>
                            <i className="fa-solid fa-square me-2"></i> Finalizar envío
                        </button>
                    : <p></p>
                }
                
            </div>
            
            <div className="flex flex-grow overflow-hidden">
                <div className="w-4/6 h-full no-padding flex flex-col">
                    <MapItem zoom={zoom} center={center} showMarkers={showAllMarkers} markers={markers} isCellTower={isCellTower} radius={radius} />
                </div>
                <div className="w-2/6 h-full no-padding flex flex-col">
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
