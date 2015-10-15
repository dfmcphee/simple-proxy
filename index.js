'use strict';
const app = require('app');
const BrowserWindow = require('browser-window');

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

let setup = require('proxy');
let http = require('http');
let ipc = require('ipc');
let dns = require('dns');

let defaultPort = 8888;
let mainWindow;
let server = false;

function onClosed() {
	mainWindow = null;
}

function createMainWindow() {
	const win = new BrowserWindow({
		width: 600,
		height: 400
	});

	win.loadUrl(`file://${__dirname}/index.html`);
	win.on('closed', onClosed);

	return win;
}

app.on('window-all-closed', () => {
	if (server) {
		server.close();
	}
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate-with-no-open-windows', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
	mainWindow.openDevTools();
});

ipc.on('connect', function(event) {
	dns.lookup(require('os').hostname(), function (err, address, fam) {
	  event.sender.send('set-ip', address);
	});
});

ipc.on('start-proxy', function(event, port) {
	if (server) {
		server.close();
	}

	server = setup(http.createServer());
	server.listen(port, function() {
    var port = server.address().port;
    console.log('HTTP(s) proxy server listening on port %d', port);
  });
});

ipc.on('stop-proxy', function(event, port) {
	if (server) {
		server.close(function() {
			console.log('proxy stopped')
		});
		server = false;
	}
});
