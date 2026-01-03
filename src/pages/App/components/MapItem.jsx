import { APIProvider, Map, Marker, InfoWindow } from '@vis.gl/react-google-maps';
import PropTypes from 'prop-types';
import React from 'react';
import { Circle } from './map-components/circle.tsx';

const MapItem = ({ center, zoom, showMarkers, markers, source, radius }) => {
    const initialCenter = { lat: 23.9475222, lng: -99.4789187 };
    const [isFreeMode, setIsFreeMode] = React.useState(false);
    const [showInfoWindow, setShowInfoWindow] = React.useState(true);
    const centerRef = React.useRef(center);
    React.useEffect(() => { if (centerRef.current !== center) { centerRef.current = center; setIsFreeMode(false); } }, [center, zoom]);
    console.log('MapItem source:', source);
    const handleMapClick = () => {
        // console.log(event);
        // const newCenter = {
        //     lat: event.detail.latLng.lat,
        //     lng: event.detail.latLng.lng,
        // };
        // console.log("Coordinates:", newCenter);
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
                zoom={isFreeMode ? undefined : source === "GPS" ? 13 : zoom}
                gestureHandling={'auto'}
                disableDefaultUI={false}
                onClick={handleMapClick}
            >
                {/* Mostrar marcadores condicionalmente */}
                {
                    showMarkers
                        ? markers.map((marker, index) => (
                            <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
                        ))
                        : source === "GPS" ? (
                            // Caso GPS → solo marcador
                            <Marker position={center} />
                        ) : source === "CELL_TOWER" ? (
                            // Caso CELL_TOWER → círculo + info + marcador
                            <>
                                {showInfoWindow && (
                                    <InfoWindow
                                        position={center}
                                        onCloseClick={() => setShowInfoWindow(false)}
                                    >
                                        <div>
                                            El dispositivo se encuentra dentro de esta zona,
                                            en un radio de {radius / 1000} km.
                                        </div>
                                    </InfoWindow>
                                )}
                                <Circle
                                    radius={radius}
                                    center={center}
                                    strokeColor="#0c4cb3"
                                    strokeOpacity={1}
                                    strokeWeight={3}
                                    fillColor="#3b82f6"
                                    fillOpacity={0.3}
                                    editable={false}
                                    draggable={false}
                                    onClick={handleMapClick}
                                />
                                <Marker position={center} />
                            </>
                        ) : source === "NONE" ? (
                            // Caso NONE → solo InfoWindow explicativa
                            <>
                                {showInfoWindow && (
                                    <InfoWindow
                                        position={center}
                                        onCloseClick={() => setShowInfoWindow(false)}
                                    >
                                        <div style={{ maxWidth: "220px" }}>
                                            El rastreador no tiene señal GPS y no se conoce la
                                            ubicación de la torre celular.  
                                            Sin embargo, el dispositivo sigue funcionando.
                                        </div>
                                    </InfoWindow>
                                )}
                            </>
                        ) : null
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
    source: PropTypes.string,
    radius: PropTypes.number
};

export default MapItem;
