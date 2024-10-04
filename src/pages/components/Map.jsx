import React from "react";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

const Map = (props) => {
    return (
        <GoogleMap
            defaultZoom={10}
            defaultCenter={{ lat: 45.421532, lng: -75.697189 }}
        />
    );
};

export default withScriptjs(withGoogleMap(Map));