import { useState } from 'react';
import PropTypes from 'prop-types';

const ImageGrid = ({ onImageClick }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const images = [
        { src: '/icons/send-box.png', alt: 'Send box' },
        { src: '/icons/picture.png', alt: 'Picture' },
        { src: '/icons/phone.png', alt: 'Phone' },
        { src: '/icons/gps-device.png', alt: 'GPS device' },
        { src: '/icons/seguro-de-entrega.png', alt: 'GPS' },
        { src: '/icons/sim.png', alt: 'SIM' },
    ];


    const handleImageClick = (image) => {
        setSelectedImage(image);
        onImageClick(image);
    };

    // const getSelectedImage = () => {
    //     return images.find(image => image.src === selectedImage.src);
    // };

    return (
        <div>
            <label htmlFor="imagen" className="block mb-2 text-left text-sm font-medium dark:text-gray-900 text-white">Icono del rastreador</label>
            <div className="grid grid-cols-3 grid-rows-2 gap-4 p-4">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`p-2 border-2 ${selectedImage && selectedImage.src === image.src ? 'border-indigo-700 border-4' : 'border-gray-300 border-1'} hover:border-indigo-500 rounded-lg`}
                        onClick={() => handleImageClick(image)}
                    >
                        <img src={image.src} alt={image.alt} className="w-full h-auto rounded-lg" />
                    </div>
                ))}
            </div>
        </div>
        
    );
};

// Validación de las propiedades
ImageGrid.propTypes = {
    onImageClick: PropTypes.func.isRequired, // Añadir validación para la función
};

export default ImageGrid;
