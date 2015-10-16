let React = require('react');
let ReactDOM = require('react-dom');

let Info = React.createClass({
  render: function() {
    return (
      <div className="info">
        <div className="info__ip">
          IP: {this.props.ip}
        </div>
        <div className="info__port">
          Port: {this.props.port}
        </div>
      </div>
    );
  }
});

module.exports = Info;
