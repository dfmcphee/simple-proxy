let ipc = require('ipc');
let React = require('react');
let ReactDOM = require('react-dom');

let Controls = React.createClass({
  render: function() {
    let button;

    if (this.props.proxyStarted) {
      button = <button className="controls__button controls__button--stop" type="button" onClick={this.props.stopProxy}>Stop Proxy</button>
    } else {
      button = <button className="controls__button controls__button--start" type="button" onClick={this.props.startProxy}>Start Proxy</button>
    }

    return (
      <div className="controls">
        {button}
      </div>
    );
  }
});

module.exports = Controls;
