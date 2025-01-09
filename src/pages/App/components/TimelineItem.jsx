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

    // function convertirFecha(cadena) { 
    //     const meses = [ "enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre" ]; 
    //     const fecha = new Date(cadena); 
    //     const dia = fecha.getDate(); 
    //     const mes = meses[fecha.getMonth()]; 
    //     const año = fecha.getFullYear(); 
    //     let hora = fecha.getHours(); 
    //     const minutos = fecha.getMinutes(); 
    //     const ampm = hora >= 12 ? 'pm' : 'am'; 
    //     hora = hora % 12; hora = hora ? hora : 12; // La hora '0' debe ser '12' 
    //     const strMinutos = minutos < 10 ? '0' + minutos : minutos; 
    //     return `${dia} ${mes} ${año}, ${hora}:${strMinutos} ${ampm}`;
    // }

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