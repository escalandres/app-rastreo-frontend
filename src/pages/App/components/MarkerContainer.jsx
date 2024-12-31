import PropTypes from 'prop-types';
const markerZoom = 15;
const MarkerContainer = ({ items, width, height, onItemClick }) => {
    return (
        <>
            <div className='px-4 py-2 text-left text-sm border border-[#ccc]'>
                <p>Empresa: DHL Express.</p>
                <p>Guía rastreo: 2989923510.</p>
                <p>Fecha envío: 29/12/2024 a las 20:25.</p>
                <p>Estatus: En tránsito - El envío ha salido para su entrega.</p>
                <p>Fecha llegada: null.</p>
            </div>
            <div className="scroll-container">
                    {items.map((item, index) => (
                        <div key={index} className="scroll-item flex hover:bg-gray-200" onClick={() => onItemClick(item.coordenadas, markerZoom)}>
                            <div className="w-1/5 p-4 flex items-center justify-center">
                                <img width={width} height={height} src="/icons/marker.png" alt="Descripción de la imagen" />
                            </div>
                            <div className="w-4/5 p-4 flex flex-col text-left text-sm">
                                <p className="mb-2 font-bold">Coord: {item.coordenadas.lat},{item.coordenadas.lng}</p>
                                <p className="mb-2">Fecha: {item.date}</p>
                                <p>Estatus: {item.status}</p>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
};

// Validación de las propiedades
MarkerContainer.propTypes = {
    items: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onItemClick: PropTypes.func.isRequired, // Añadir validación para la función
};

export default MarkerContainer;
