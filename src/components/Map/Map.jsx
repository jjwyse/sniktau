import React, {PropTypes} from 'react';
import GoogleMapReact from 'google-map-react';

import Peak from 'components/Map/Markers/Peak';

const Map = ({center, zoom}) => {
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
      <Peak name={'sniktau'} lat={39.67832020000003} lng={-105.8577885} />
    </GoogleMapReact>
  );
};
Map.propTypes = {
  center: PropTypes.object.isRequired,
  zoom: PropTypes.number.isRequired,
};
Map.defaultProps = {
  center: {lat: 39.732, lng: -104.99},
  zoom: 11,
};

export default Map;
