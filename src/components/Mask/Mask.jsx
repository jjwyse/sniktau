import React, {PropTypes} from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import styled from 'styled-components';

import {grey400, orange500} from 'material-ui/styles/colors';

const MaskWrapper = styled.div`
  position: absolute;;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${grey400} .4;
  color: white;
  display: flex;
  font-size: 3rem;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const MessageWrapper = styled.div`
  color: ${orange500};
`;

const Progress = styled(CircularProgress)`
  color: ${orange500};
`;

const Mask = ({message}) => {
  return (
    <MaskWrapper>
      <MessageWrapper>
        <h5>{message}</h5>
        <Progress size={50} thickness={5} />
      </MessageWrapper>
    </MaskWrapper>
  );
};
Mask.muiName = 'Mask';

Mask.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Mask;
