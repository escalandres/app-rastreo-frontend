import PropTypes from 'prop-types';
import { convertirFecha } from '../js/app';
const markerZoom = 15;

const ICON_SOURCE = {
    "GPS": "/icons/marker.png",
    "CELL_TOWER": "/icons/cell-tower.png",
    "NONE": "/icons/no-internet.png",
};

const MarkerContainer = ({ shipment, width, height, onItemClick }) => {
    const latestStatus = shipment.shipment_status[shipment.shipment_status.length - 1]
    const sortedStatus = shipment.locations.sort((a, b) => new Date(b.date) - new Date(a.date));
    // console.log('sortedStatus', sortedStatus);
    // console.log('shipment', shipment);
    return (
        <>
            <div className='px-4 py-2 text-left text-sm border border-[#ccc]'>
                <p>ID del envío: { `${shipment.id}` }.</p>
                <p>Empresa: { `${shipment.shipment_data.company} ${shipment.shipment_data.service ?  shipment.shipment_data.service : ''}`}.</p>
                <p>Guía rastreo: { shipment.shipment_data.tracking_number}.</p>
                <p>Fecha envío: {convertirFecha(shipment.start_date)}.</p>
                <p>Fecha llegada: {shipment.delivery_date ? convertirFecha(shipment.delivery_date) : 'En curso'}.</p>
                <p>Estatus: {latestStatus ? latestStatus.description : 'Sin estatus disponible'}.</p>
            </div>
            <div className="scroll-container">
                { 
                    shipment.locations?.length > 0 ? (
                        sortedStatus.map((item, index) => (
                            <div key={index} className="scroll-item flex hover:bg-gray-200" onClick={() => onItemClick({lat: item.lat, lng: item.lng}, markerZoom, item.source, item.radius)}>
                            {/* <div key={index} className="scroll-item flex hover:bg-gray-200" onClick={() => onItemClick({lat: item.lat, lng: item.lng}, markerZoom,item.isCellTower, item.radius)}> */}
                                <div className="w-1/5 p-4 flex items-center justify-center">
                                    <img width={width} height={height} src={ICON_SOURCE[item.source]} alt="Descripción de la imagen" />
                                </div>
                                <div className="w-4/5 p-4 flex flex-col text-left text-sm">
                                    <p className="mb-2 font-bold">Coord: {item.lat},{item.lng}</p>
                                    <p className="mb-2">Fecha: {convertirFecha(item.date)}</p>
                                    <p className="mb-2">Estatus: En camino</p>
                                    <p>Ubicación: {item.source} </p>
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
    shipment: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onItemClick: PropTypes.func.isRequired, // Añadir validación para la función
};

export default MarkerContainer;
