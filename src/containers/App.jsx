import React, {Component} from 'react';

export default class App extends Component {
  render() {
    return (
      <div style={{
        background: 'url(/images/background.jpg)',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        minHeight: '600px',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat'
      }}>
        <button type='button' style ={{
          cursor: 'pointer',
          padding: '0',
          margin: '25px',
          position: 'absolute',
          bottom: 0,
          right: 0
        }}>
          <img src='/images/connect.png'/>
        </button>
        {this.props.children}
      </div>
    );
  }
}
App.propTypes = {
  children: React.PropTypes.any
};
