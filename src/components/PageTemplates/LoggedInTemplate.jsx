import React, {PropTypes} from 'react';
import styled from 'styled-components';

import NavigationBar from 'components/Navigation/NavigationBar';

const TemplateContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

const LoggedInTemplate = ({children}) => {
  return (
    <TemplateContainer>
      <NavigationBar />
      {children}
    </TemplateContainer>
  );
};
LoggedInTemplate.propTypes = {
  children: PropTypes.any,
};

export default LoggedInTemplate;
