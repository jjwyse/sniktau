import React, {PropTypes} from 'react';
import GoogleMapReact from 'google-map-react';
import properties from 'properties';

const Map = ({center, zoom, children}) => {
  return (
    <GoogleMapReact
      bootstrapURLKeys={{
        key: properties.googleMapsKey,
        language: 'en',
      }}
      defaultCenter={center}
      defaultZoom={zoom}
    >
      {children}
    </GoogleMapReact>
  );
};
Map.propTypes = {
  center: PropTypes.object.isRequired,
  zoom: PropTypes.number.isRequired,
  children: PropTypes.any,
};
Map.defaultProps = {
  center: {lat: 39.732, lng: -104.99},
  zoom: 15,
};

export default Map;
