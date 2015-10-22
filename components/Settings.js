let ipc = require('ipc');
let React = require('react');
let ReactDOM = require('react-dom');

let Settings = React.createClass({
  getInitialState: function() {
    return {
      port: 8888,
      invalidPort: false
    };
  },

  validPort: function(port) {
    return (port > 1023 && port < 65536)
  },

  portChanged: function(event) {
    this.setState({
      port: parseInt(event.target.value) || 0
    });
  },

  save: function() {
    if (this.validPort(this.state.port)) {
      this.props.saveSettings(this.state.port);
    }
    else {
      this.setState({
        invalidPort: true
      });
    }
  },

  render: function() {
    let error;
    if (this.state.invalidPort) {
      error = <div className="error">Invalid port</div>
    }

    return (
      <div className="container">
        <header className="toolbar toolbar-header">
          <h1 className="title">Settings</h1>
        </header>
        <section className="container__body">
          <div className="settings">
            <label className="settings__label">Port</label>
            <input className="settings__input" id="port" type="text" value={this.state.port} onChange={this.portChanged} />
          </div>
          {error}
        </section>
        <footer className="toolbar toolbar-footer">
          <div className="actions">
            <div className="actions__left">
              <button className="btn btn-default" onClick={this.props.cancelSettings}>
                Cancel
              </button>
            </div>
            <div className="actions__right">
              <button className="btn btn-primary" onClick={this.save}>
                Save
              </button>
            </div>
          </div>
        </footer>
      </div>
    );
  }
});

module.exports = Settings;
