import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import PropTypes from 'prop-types';

const MapItem = ({ center }) => (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <Map
            style={{ width: '100%', height: '52vh' }}
            center={center} // Cambia defaultCenter a center
            zoom={15}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
        >
            <Marker position={center} />
        </Map>
    </APIProvider>
);

// Validación de las propiedades
MapItem.propTypes = {
  center: PropTypes.node.isRequired  // Valida que children sea un nodo de React y sea requerido
};

export default MapItem;

