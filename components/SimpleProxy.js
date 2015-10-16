let ipc = require('ipc');
let React = require('react');
let ReactDOM = require('react-dom');
let Controls = require('./Controls');
let Info = require('./Info');
let Settings = require('./Settings');

let SimpleProxy = React.createClass({
  getInitialState: function() {
    return {
      ip: 'Detecting IP...',
      proxyStarted: false,
      settingsOpen: false,
      port: 8888
    };
  },

  componentDidMount: function() {
    ipc.send('connect');
    ipc.on('set-ip', (ip) => this.setIP(ip));
  },

  setIP: function(ip) {
    this.setState({
      ip: ip
    });
  },

  startProxy: function() {
    ipc.send('start-proxy', this.state.port);
    this.setState({
      proxyStarted: true
    });
  },

  stopProxy: function() {
    ipc.send('stop-proxy');
    this.setState({
      proxyStarted: false
    });
  },

  openSettings: function() {
    this.setState({
      settingsOpen: true
    })
  },

  saveSettings: function(port) {
    this.setState({
      settingsOpen: false,
      port: port
    })
  },

  render: function() {
    if (this.state.settingsOpen) {
      return (
        <Settings saveSettings={this.saveSettings} />
      );
    }
    else {
      return (
        <div className="container">
          <header className="toolbar toolbar-header">
            <h1 className="title">SimpleProxy</h1>
          </header>
          <section className="container__body">
            <Controls startProxy={this.startProxy}
              stopProxy={this.stopProxy}
              invalidPort={this.state.invalidPort}
              proxyStarted={this.state.proxyStarted} />
            <Info ip={this.state.ip} port={this.state.port} />
          </section>
          <footer className="toolbar toolbar-footer">
            <div className="toolbar-actions">
              <button className="btn btn-default pull-right" onClick={this.openSettings}>
                <span className="icon icon-cog"></span>
              </button>
            </div>
          </footer>
    		</div>
      );
    }
  }
});

ReactDOM.render(
  <SimpleProxy />,
  document.getElementById('mount')
);
