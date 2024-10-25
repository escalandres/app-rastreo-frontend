import React from 'react';
import PropTypes from 'prop-types';
import '../cs/app.css';

const ScrollContainer = ({ items }) => {
  return (
    <div className="scroll-container">
      {items.map((item, index) => (
        <div key={index} className="scroll-item">
          {item.content} {/* Muestra el contenido del objeto */}
        </div>
      ))}
    </div>
  );
};

// Validación de las propiedades
ScrollContainer.propTypes = {
    items: PropTypes.node.isRequired,  // Valida que children sea un nodo de React y sea requerido
};


export default ScrollContainer;
