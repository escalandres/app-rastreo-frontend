import PropTypes from 'prop-types';
import EditTracker from './EditTracker';
import BatteryIcon from './BatteryIcon';
import { convertirFecha } from '../js/app';
import '../css/app.css';

const ScrollContainer = ({ items, width, height, onItemClick, token }) => {
  return (
    <div className="scroll-container overflow-y">
      { items && items.length > 0 ? (
          items.map((item, index) => (
          <div key={index} className="scroll-item flex hover:bg-gray-200" onClick={() => onItemClick({id: item.id, name: item.nickname})}>
            <div className="w-1/3 p-4 flex items-center justify-center">
              <img width={width} height={height} src={item.img.src} alt={item.img.alt} className="" />
            </div>
            <div className="w-2/3 p-4 flex flex-col text-left">
              {/* <p className="mb-2 text-xs">Contenedor: {item.id}</p> */}
              <p className="mb-2 font-bold">{item.nickname}</p>
              <p className="mb-2 text-xs">Vinculado: { convertirFecha(item.linking_date)}</p>
              <div className="mb-2">
                <BatteryIcon percentage={item.battery_percentage.percentage} />
              </div>
              {/* <p>Texto 3</p> */}
              <EditTracker tracker={item} token={token} />
            </div>
          </div>
        ))
      ) : (
        <p>No hay elementos para mostrar.</p>
      )
      }
    </div>
  );
};

// Validación de las propiedades
ScrollContainer.propTypes = {
    items: PropTypes.array.isRequired,  // Valida que items sea un array y sea requerido
    width: PropTypes.number.isRequired,  // Valida que width sea un número y sea requerido
    height: PropTypes.number.isRequired,  // Valida que height sea un número y sea requerido
    onItemClick: PropTypes.func.isRequired, // Añadir validación para la función
    token: PropTypes.string.isRequired, // Añadir validación para el token
};


export default ScrollContainer;
