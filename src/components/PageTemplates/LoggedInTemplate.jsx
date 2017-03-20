import React, {PropTypes} from 'react';

const LoggedInTemplate = ({children}) => {
  return (
    <div>
      {children}
    </div>
  );
};
LoggedInTemplate.propTypes = {
  children: PropTypes.any,
};

export default LoggedInTemplate;
