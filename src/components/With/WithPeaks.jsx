import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {loadAllPeaks} from 'state/peaks';

const WithPeaks = WrappedComponent => {
  class WithPeaksClass extends React.Component {
    static propTypes = {
      isPeaksLoaded: PropTypes.bool,
      loadPeaks: PropTypes.func.isRequired,
      peaks: PropTypes.array,
    };

    componentDidMount() {
      const {isPeaksLoaded, loadPeaks} = this.props;
      if (!isPeaksLoaded) {
        loadPeaks();
      }
    }

    render() {
      const {isPeaksLoaded, peaks} = this.props;
      return isPeaksLoaded ? <WrappedComponent {...this.props} peaks={peaks} /> : null;
    }
  }

  const mapStateToProps = state => {
    return {
      isPeaksLoaded: state.peaks.loaded,
      peaks: state.peaks.all,
    };
  };

  const mapDispatchToProps = dispatch => {
    return {loadPeaks: () => dispatch(loadAllPeaks())};
  };
  return connect(mapStateToProps, mapDispatchToProps)(WithPeaksClass);
};

export default WithPeaks;
