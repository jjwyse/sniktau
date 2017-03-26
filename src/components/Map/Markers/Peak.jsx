import React, {Component, PropTypes} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {blue500, orange500} from 'material-ui/styles/colors';
import styled from 'styled-components';

const PeakName = styled.h5`
  font-size: 1rem;
`;

const PeakIcon = styled(FontIcon)`
  color: ${props => props['data-hover'] ? blue500 : orange500} !important;
  cursor: pointer;
`;

class Peak extends Component {
  render() {
    const {name, $hover} = this.props;
    return (
      <div>
        <PeakIcon className="material-icons" data-hover={$hover}>
          terrain
        </PeakIcon>
        {$hover && <PeakName>{name}</PeakName>}
      </div>
    );
  }
}
Peak.propTypes = {
  name: PropTypes.string.isRequired,
  $hover: PropTypes.bool, // comes from Google Maps
};

export default Peak;
