let ipc = require('ipc');
let React = require('react');
let ReactDOM = require('react-dom');
let Controls = require('./Controls');
let LocalIP = require('./LocalIP');

function validPort(port) {
  return (port > 1023 && port < 65536)
}

let SimpleProxy = React.createClass({
  getInitialState: function() {
    return {
      ip: '0.0.0.0',
      invalidPort: false,
      proxyStarted: false
    };
  },

  componentDidMount: function() {
    ipc.send('connect');
    ipc.on('set-ip', (ip) => this.setIP(ip));
  },

  setIP: function(ip) {
    this.setState({ip: ip});
  },

  startProxy: function(port) {
    if (validPort(port)) {
      ipc.send('start-proxy', port);
      this.setState({
        invalidPort: false,
        proxyStarted: true
      });
    }
    else {
      this.setState({
        invalidPort: true
      });
    }
  },

  stopProxy: function() {
    ipc.send('stop-proxy');
    this.setState({
      invalidPort: false,
      proxyStarted: false
    });
  },

  render: function() {
    return (
      <div className="container">
  			<header className="container__header">
  				<h1>Simple Proxy</h1>
  			</header>
        <section className="container__body">
          <Controls startProxy={this.startProxy} stopProxy={this.stopProxy} proxyStarted={this.state.proxyStarted} />
        </section>
        <footer className="container__footer">
  			  <LocalIP ip={this.state.ip} />
        </footer>
  		</div>
    );
  }
});

ReactDOM.render(
  <SimpleProxy />,
  document.getElementById('mount')
);
