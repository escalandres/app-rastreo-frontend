import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import PropTypes from 'prop-types';
import React from 'react';

const MapItem = ({ center, zoom, showMarkers, markers }) => {
    const initialCenter = { lat: 23.9475222, lng: -99.4789187 };
    const i2 = { lat: 19.3837832, lng: -99.196047 };
    const [isFreeMode, setIsFreeMode] = React.useState(false);
    const [showAllMarkers, setShowAllMarkers] = React.useState(false);
    const centerRef = React.useRef(center);
    React.useEffect(() => { if (centerRef.current !== center) { centerRef.current = center; setIsFreeMode(false); } }, [center, zoom]);

    const handleMapClick = (event) => {
        console.log(event);
        const newCenter = {
            lat: event.detail.latLng.lat,
            lng: event.detail.latLng.lng,
        };
        console.log("Coordinates:", newCenter);
        setIsFreeMode(true); // Activar el modo libre al hacer clic
        // setMapCenter(newCenter);
    };

    return (
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <Map
                style={{ width: '100%', height: '100%' }}
                defaultCenter={initialCenter}
                center={isFreeMode ? undefined : center}
                defaultZoom={5}
                zoom={isFreeMode ? undefined : zoom}
                gestureHandling={'auto'}
                disableDefaultUI={false}
                onClick={handleMapClick}
            >
            {/* //Agregar funcionalidad para mostrar 1 marcador o todos los marcadores */}
                {/* <Marker position={center} />
                <Marker position={i2} /> */}
                {/* Mostrar marcadores condicionalmente */} {
                    showMarkers ? markers.map((marker, index) => ( <Marker key={index} position={marker.coordenadas} /> )) : <Marker position={center} />
                }
                
            </Map>
        </APIProvider>
    );
};

// Validación de las propiedades
MapItem.propTypes = {
    center: PropTypes.object,
    zoom: PropTypes.number,
    showMarkers: PropTypes.bool,
    markers: PropTypes.array,
};

export default MapItem;
