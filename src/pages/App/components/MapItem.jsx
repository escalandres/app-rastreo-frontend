import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import PropTypes from 'prop-types';

const MapItem = ({ center }) => (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <Map
            style={{ width: '100%', height: '100%' }}
            center={center}
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
  center: PropTypes.object.isRequired  // Valida que sea un objeto y sea requerido
};

export default MapItem;


