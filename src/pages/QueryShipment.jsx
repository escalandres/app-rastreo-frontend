import { useState } from 'react';
import PropTypes from 'prop-types';

// Función auxiliar para convertir fechas
const convertirFecha = (timestamp) => {
    const fecha = new Date(timestamp);
    return fecha.toLocaleString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};


const TimelineItem = ({description, timestamp, location, status  }) => {
    function traducirEstado(estado) { 
        const traducciones = { 
            'delivered': 'Entregado', 
            'transit': 'En tránsito', 
            'failure': 'Error' 
        }; 
        return traducciones[estado] || 'Estado desconocido';
    }

    function colorEstado(estado) { 
        const traducciones = { 
            'delivered': 'text-green-500', 
            'transit': 'text-[#FE7600]', 
            'failure': 'text-red-500' 
        }; 
        return traducciones[estado] || 'text-gray-400';
    }

    return (
        <li className="mb-4 ms-8">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-500"></div>
            <p className={`mb-2 text-base font-bold ${colorEstado(status)}`}>{traducirEstado(status)}</p>
            <h3 className="text-lg font-semibold dark:text-gray-900 text-white">{description}</h3>
            <p className=" text-base font-normal text-gray-500 dark:text-gray-400">{location}</p>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{convertirFecha(timestamp)}</time>
        </li>

    );
};

TimelineItem.propTypes = {
    description: PropTypes.string,
    timestamp: PropTypes.string,
    location: PropTypes.string,
    status: PropTypes.string
};

// Componente Timeline simulado - reemplaza con tu componente real
// Componente Timeline
const Timeline = ({ shipment_status }) => {
    if (!shipment_status || shipment_status.length === 0) {
        return (
        <div className="text-center text-gray-500 py-8">
            No hay información de seguimiento disponible
        </div>
        );
    }

    return (
        <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {shipment_status && shipment_status.map((item, index) => (
            <TimelineItem
            key={index}
            description={item.description}
            timestamp={item.timestamp}
            location={item.location}
            status={item.status_code}
            />
        ))}
        </ol>
    );
};

Timeline.propTypes = {
  shipment_status: PropTypes.array
};

const QueryShipment = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [carrier, setCarrier] = useState('DHL');
  const [shipmentStatus, setShipmentStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!trackingNumber.trim()) {
      setError('Por favor ingresa un número de rastreo');
      return;
    }

    setError('');
    setLoading(true);

    try {
        // Reemplaza esta URL con tu endpoint real
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/app/shipments/query-tracking`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            tracking_number: trackingNumber,
            company: carrier
            })
        });

        if (!response.ok) {
            throw new Error('Error al consultar el seguimiento');
        }

        const data = await response.json();
        console.log('data', data);
        setShipmentStatus(data.shipment_status || data);
        } catch (err) {
        setError(err.message || 'Error al consultar el seguimiento');
        setShipmentStatus(null);
        } finally {
        setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
        handleSearch();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Header */}
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Rastreo de Paquetería
            </h1>

            {/* Formulario de búsqueda */}
            <div className="space-y-4 mb-8">
                <div>
                <label htmlFor="trackingNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Número de Rastreo
                </label>
                <input
                    id="trackingNumber"
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ingresa el número de rastreo"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
                </div>

                <div>
                <label htmlFor="carrier" className="block text-sm font-medium text-gray-700 mb-2">
                    Paquetería
                </label>
                <select
                    id="carrier"
                    value={carrier}
                    onChange={(e) => setCarrier(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                >
                    <option value="DHL">DHL</option>
                    <option value="Estafeta">Estafeta</option>
                    <option value="FedEx">FedEx</option>
                </select>
                </div>

                {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                </div>
                )}

                <button
                onClick={handleSearch}
                disabled={loading}
                className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                {loading ? (
                    <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Buscando...
                    </>
                ) : (
                    <>
                    <i className="fa-solid fa-search"></i>
                    Buscar
                    </>
                )}
                </button>
            </div>

            {/* Resultados */}
            {shipmentStatus && (
                <div className="border-t pt-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">
                    Información de la paquetería
                </h2>
                <Timeline shipment_status={shipmentStatus} />
                </div>
            )}
            </div>
        </div>
        </div>
    );
};

export default QueryShipment;