import React, {PropTypes} from 'react';
import GoogleMapReact from 'google-map-react';

const Map = ({center, zoom, children}) => {
  // TODO - JJW - property
  return (
    <GoogleMapReact
      bootstrapURLKeys={{
        key: 'AIzaSyCi52DiWxr55TXUEhIcCosVNIUe3TMb2L4',
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
