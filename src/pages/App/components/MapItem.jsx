import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';

const MapItem = () => (
  <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
    <Map
      style={{width: '100%', height: '52vh'}}
      defaultCenter={{lat: 19.378348, lng: -99.194816}}
      defaultZoom={3}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
    >
      <Marker position={{lat: 19.378348, lng: -99.194816}} />
    </Map>
  </APIProvider>
);
//19.378348, -99.194816


export default MapItem;