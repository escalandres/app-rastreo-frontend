import PropTypes from 'prop-types';
import '../css/app.css';

const ScrollContainer = ({ items, width, height }) => {
  return (
    <div className="scroll-container">
      {items.map((item, index) => (
        <div key={index} className="scroll-item flex hover:bg-gray-200">
          <div className="w-1/4 p-4">
            <img width={width} height={height} src="/icons/marker.png" alt="Descripción de la imagen" className="" />
          </div>
          <div className="w-3/4 p-4 flex flex-col text-left text-sm">
            <p className="mb-2 font-bold">Coord: {item.coordenadas.lat},{item.coordenadas.lng}</p>
            <p className="mb-2">Fecha: {item.date}</p>
            <p>Estatus: {item.status}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Validación de las propiedades
ScrollContainer.propTypes = {
    items: PropTypes.node.isRequired,  // Valida que children sea un nodo de React y sea requerido
    width: PropTypes.number.isRequired,  // Valida que children sea un nodo de React y sea requerido
    height: PropTypes.number.isRequired,  // Valida que children sea un nodo de React y sea requerido
};


export default ScrollContainer;
