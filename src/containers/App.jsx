import React, {Component} from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Sniktau</h1>
        {this.props.children}
      </div>
    );
  }
}
App.propTypes = {
  children: React.PropTypes.any
};
