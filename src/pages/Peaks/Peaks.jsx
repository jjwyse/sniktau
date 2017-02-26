import React, {PropTypes} from 'react';

import WithPeaks from 'components/With/WithPeaks';
import Map from 'components/Map/Map';
import Peak from 'components/Map/Markers/Peak';
import {metersToFeet} from 'util/tools';

class Peaks extends React.Component {
  render() {
    const {peaks} = this.props;
    return (
      <Map>
        {peaks.map((peak, index) => {
          const name = `${peak.properties.NAME} (${metersToFeet(peak.properties.ELEV_METER)})`;
          const lat = peak.geometry.coordinates[1];
          const lng = peak.geometry.coordinates[0];

          if (lat < 35 || lat > 41) {
            return null;
          }
          if (lng < -108 || lng > -101) {
            return null;
          }
          return <Peak key={index} name={name} lat={lat} lng={lng} />;
        })}
      </Map>
    );
  }
}
Peaks.propTypes = {
  peaks: PropTypes.array.isRequired,
};

export default WithPeaks(Peaks);
