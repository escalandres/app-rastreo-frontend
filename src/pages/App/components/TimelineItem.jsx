import PropTypes from 'prop-types';
import { convertirFecha } from '../js/app';
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

export default TimelineItem;