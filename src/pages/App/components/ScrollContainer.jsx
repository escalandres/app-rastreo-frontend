import PropTypes from 'prop-types';
import '../css/app.css';

const ScrollContainer = ({ items, width, height }) => {
  return (
    <div className="scroll-container overflow-y">
      {items.map((item, index) => (
        <div key={index} className="scroll-item flex hover:bg-gray-200">
          <div className="w-1/3 p-4 flex items-center justify-center">
            <img width={width} height={height} src={item.img} alt="Descripción de la imagen" className="" />
          </div>
          <div className="w-2/3 p-4 flex flex-col text-left">
            <p className="mb-2 font-bold">ID: {item.id}</p>
            <p className="mb-2">Texto 2</p>
            <p>Texto 3</p>
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
