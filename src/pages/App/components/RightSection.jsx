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

    const [markers, setMarkers] = React.useState(shipment.locations || []);

    const containerRef = React.useRef(null);

    React.useEffect(() => {
        if (!container?.id) return;

        // Evitar llamadas duplicadas
        if (containerRef.current === container.id) return;

        containerRef.current = container.id;

        const getContainerCurrentShipment = async () => {
            try {
                showLoader();

                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/app/shipments/${container.id}`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );

                hideLoader();

                if (!response.ok) {
                    alerta.error('No se pudo obtener la información de envío de este rastreador. Inténtelo nuevamente.');
                    return;
                }

                const data = await response.json();

                setShipment(data.result);
                setMarkers(data.result.locations); // usar el valor correcto
            } catch (error) {
                console.error('Error:', error);
            }
        };

        getContainerCurrentShipment();
    }, [container?.id, token]);

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
        }).then(async (result) => {
            if (result.isConfirmed) {
                if(shipment.delivery_date !== null) return MySwal.fire(<p>El envío ya ha finalizado</p>)
                let response = await terminarEnvio();
                if(response.success){
                    alerta.autoSuccess(response.message);
                    window.location.reload();
                }
                else{
                    alerta.error(response.message);
                }

            } else if (result.isDismissed) {
                // Si cancelaron o cerraron la alerta
                console.log("Cancelado");
            }
            
            
        })
    }

    async function terminarEnvio(){
        try {
            showLoader();
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/app/shipments/end/${shipment.id}`, {
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

    async function handleUpdateShipment(){

        Swal.fire({
            title: 'Ingresa los datos',
            html:
                '<select id="swal-select" class="bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 text-sm rounded-lg dark:bg-gray-50 border dark:border-gray-300 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full p-2.5 ">' +
                    '<option value="" disabled selected>Elige una opción</option>' +
                    '<option value="DHL">DHL</option>' +
                    '<option value="FedEx">FedEx</option>' +
                    '<option value="Estafeta">Estafeta</option>' +
                '</select>' +
                '<input id="swal-input2" class="w-full mt-4 pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" placeholder="Ingrese el código y/o guía de rastreo">',
            focusConfirm: false,
            preConfirm: () => {
                const company = document.getElementById('swal-select').value;
                const trackingCode = document.getElementById('swal-input2').value;
                if (!company || !trackingCode) {
                    Swal.showValidationMessage('Por favor completa ambos campos');
                    return false;
                }
                return { company, trackingCode };
            }
            }).then(async (result) => {
                if (result.isConfirmed) {
                    alert("hola");
                    let response = await ingresarGuiaRastreo(result.value.company, result.value.trackingCode);
                    if(response.success){
                        alerta.autoSuccess(response.message);
                        window.location.reload();
                    }

                    alerta.error(response.message);
                }
            });
    }

    async function ingresarGuiaRastreo(company, trackingCode) {
        try {
            showLoader();
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/app/shipments/change-tracking-code/${shipment.id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    shipmentId: shipment.id, company: company, newTrackingCode: trackingCode
                })
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
                {
                    shipment.shipment_data.tracking_number === "" && shipment.id > 0 && ( <button className="px-4 py-2 font-medium text-[#FE7600] border-[#FE7600] hover:bg-[#FE7600] hover:border-[#FE7600] hover:text-white active:bg-[#FE7600] rounded-lg duration-150" 
                            onClick={handleUpdateShipment}>
                            <i className="fa-solid fa-pen-to-square me-2"></i> Ingresar guía de rastreo
                        </button>
                    )
                }
                {
                    shipment.id > 0 && !shipment.delivery_date && (
                        <button
                            className="px-4 py-2 font-medium text-[#dc3545] border-[#dc3545] hover:bg-[#dc3545] hover:border-[#dc3545] hover:text-white active:bg-[#dc3545] rounded-lg duration-150"
                            onClick={handleEndShipment}
                        >
                            <i className="fa-solid fa-square me-2"></i> Finalizar envío
                        </button>
                    )
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
