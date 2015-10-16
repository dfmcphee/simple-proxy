let ipc = require('ipc');
let React = require('react');
let ReactDOM = require('react-dom');

var Controls = React.createClass({
  getInitialState: function() {
    return {
      port: 8888
    };
  },

  portChanged: function(event) {
    this.setState({
      port: parseInt(event.target.value)
    });
  },

  render: function() {
    if (this.props.proxyStarted) {
      return (
        <div className="controls">
          <p className="controls__input">Proxy running</p>
          <button className="controls__button" type="button" onClick={this.props.stopProxy}>Stop Proxy</button>
        </div>
      );
    } else {
      return (
        <div className="controls">
          <input className="controls__input" id="port" type="text" value={this.state.port} onChange={this.portChanged} />
          <button className="controls__button" type="button" onClick={() => this.props.startProxy(this.state.port)}>Start Proxy</button>
        </div>
      );
    }
  }
});

module.exports = Controls;
