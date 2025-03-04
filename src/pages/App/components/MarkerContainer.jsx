import PropTypes from 'prop-types';
import { convertirFecha } from '../js/app';
const markerZoom = 15;
const MarkerContainer = ({ shipment, width, height, onItemClick }) => {
    const latestStatus = shipment.shipment_status[shipment.shipment_status.length - 1]
    const sortedStatus = shipment.locations.sort((a, b) => new Date(b.date) - new Date(a.date));
    console.log('sortedStatus', sortedStatus);
    console.log('shipment', shipment);
    return (
        <>
            <div className='px-4 py-2 text-left text-sm border border-[#ccc]'>
                <p>Empresa: { `${shipment.shipment_data.company} ${shipment.shipment_data.service ?  shipment.shipment_data.service : ''}`}.</p>
                <p>Guía rastreo: { shipment.shipment_data.tracking_number}.</p>
                <p>Fecha envío: {convertirFecha(shipment.start_date)}.</p>
                <p>Fecha llegada: {convertirFecha(shipment.delivery_date)}.</p>
                <p>Estatus: {latestStatus ? latestStatus.description : 'Sin estatus disponible'}.</p>
            </div>
            <div className="scroll-container">
                { 
                    shipment.locations?.length > 0 ? (
                        sortedStatus.map((item, index) => (
                            <div key={index} className="scroll-item flex hover:bg-gray-200" onClick={() => onItemClick({lat: item.lat, lng: item.lng}, markerZoom)}>
                                <div className="w-1/5 p-4 flex items-center justify-center">
                                    <img width={width} height={height} src="/icons/marker.png" alt="Descripción de la imagen" />
                                </div>
                                <div className="w-4/5 p-4 flex flex-col text-left text-sm">
                                    <p className="mb-2 font-bold">Coord: {item.lat},{item.lng}</p>
                                    <p className="mb-2">Fecha: {convertirFecha(item.date)}</p>
                                    <p>Estatus: En camino</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay elementos para mostrar.</p>
                    )
                }
            </div>
        </>
    );
};

// Validación de las propiedades
MarkerContainer.propTypes = {
    shipment: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onItemClick: PropTypes.func.isRequired, // Añadir validación para la función
};

export default MarkerContainer;
