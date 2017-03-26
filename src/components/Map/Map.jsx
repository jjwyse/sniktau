import React, {PropTypes} from 'react';
import GoogleMapReact from 'google-map-react';
import properties from 'properties';

const Map = ({center, zoom, children}) => {
  const mapOptions = maps => {
    return {
      mapTypeId: maps.MapTypeId.TERRAIN,
      mapTypeControl: true,
      zoomControlOptions: {
        position: maps.ControlPosition.TOP_RIGHT,
        style: maps.ZoomControlStyle.SMALL,
      },
      mapTypeControlOptions: {
        position: maps.ControlPosition.TOP_RIGHT,
        style: maps.MapTypeControlStyle.DROPDOWN_MENU,
        mapTypeIds: [maps.MapTypeId.TERRAIN, maps.MapTypeId.SATELLITE],
      },
    };
  };

  return (
    <GoogleMapReact
      bootstrapURLKeys={{
        key: properties.googleMapsKey,
        language: 'en',
      }}
      defaultCenter={center}
      defaultZoom={zoom}
      hoverDistance={40 / 2}
      options={mapOptions}
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
  zoom: 11,
};

export default Map;
