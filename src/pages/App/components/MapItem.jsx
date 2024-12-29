import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import PropTypes from 'prop-types';
import React from 'react';


const MapItem = ({ center }) => {
    const initialCenter = {lat: 23.9475222, lng: -99.4789187};
    // Hook para almacenar el mapa
    const [map, setMap] = React.useState(null);
    const [show, setShow] = React.useState(false);
    const [center1, setCenter1] = React.useState(initialCenter);

    // Callback para cuando el mapa se desmonte
    const onUnmount = React.useCallback((map) => {
        setMap(null);
    }, []);

    // Función para manejar el cambio de centro al hacer clic en el mapa
    const handleMapClick = (event) => {
        console.log(event)
        const newCenter = {
            lat: event.detail.latLng.lat,
            lng: event.detail.latLng.lng,
        };
        console.log("Coor",newCenter)
        // setCenter1(newCenter);  // Actualiza el centro cuando se hace clic
    };


    return (
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <Map
                style={{ width: '100%', height: '100%' }}
                defaultCenter={initialCenter}
                defaultZoom={5}
                gestureHandling={'auto'}  // Permite las interacciones por gestos
                disableDefaultUI={false}  // Habilita la UI por defecto
                onUnmount={onUnmount}
                onClick={handleMapClick}  // Cambia el centro al hacer clic en el mapa
            >
                <Marker position={center} />
            </Map>
        </APIProvider>
    );
};

// Validación de las propiedades
MapItem.propTypes = {
    center: PropTypes.object.isRequired  // Valida que sea un objeto y sea requerido
};

export default MapItem;
