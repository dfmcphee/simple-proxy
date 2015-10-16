let React = require('react');
let ReactDOM = require('react-dom');

var LocalIP = React.createClass({
  render: function() {
    return (
			<h2>{this.props.ip}</h2>
    );
  }
});

module.exports = LocalIP;
