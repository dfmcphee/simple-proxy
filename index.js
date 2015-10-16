'use strict';
const app = require('app');
const BrowserWindow = require('browser-window');

// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

let setup = require('proxy');
let http = require('http');
let ipc = require('ipc');
let dns = require('dns');
let menubar = require('menubar');

let defaultPort = 8888;
let mainWindow;
let server;
let mb = menubar({
  preloadWindow: true,
  width: 400,
  height: 180
});

mb.on('ready', function ready () {
  console.log('app is ready')
  //mb.window.openDevTools();
});

ipc.on('connect', function(event) {
	dns.lookup(require('os').hostname(), function (err, address, fam) {
	  event.sender.send('set-ip', address);
	})
});

ipc.on('start-proxy', function(event, port) {
	server = setup(http.createServer());
	server.listen(port, function() {
    var port = server.address().port;
    console.log('HTTP(s) proxy server listening on port %d', port);
  });
});

ipc.on('stop-proxy', function(event, port) {
	server.close(function() {
		console.log('proxy stopped')
	});
});
