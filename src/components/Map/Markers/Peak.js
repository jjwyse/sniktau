import React, {PropTypes} from 'react';

const Peak = ({name}) => {
  return <div>{name}</div>;
};
Peak.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Peak;
