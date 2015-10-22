'use strict';
const app = require('app');
const BrowserWindow = require('browser-window');
const NativeImage = require('native-image');
const gh_releases = require('electron-gh-releases');
const ip = require('ip');

// report crashes to the Electron project
//require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
// require('electron-debug')();

let setup = require('proxy');
let http = require('http');
let ipc = require('ipc');
let dns = require('dns');
let menubar = require('menubar');

let server;

let mb = menubar({
  preloadWindow: true,
  width: 400,
  height: 180,
  icon: app.getAppPath() + '/IconTemplate.png'
});

mb.on('ready', function ready () {
  console.log('app is ready')
  //mb.window.openDevTools();
});

mb.on('show', function() {
  mb.window.webContents.send('set-ip', ip.address());
});

ipc.on('connect', function(event) {
  event.sender.send('set-ip', ip.address());
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

let options = {
  repo: 'dfmcphee/simple-proxy',
  currentVersion: app.getVersion()
};

let update = new gh_releases(options, function(auto_updater) {
  // Auto updater event listener
  auto_updater.on('update-downloaded', function(e, rNotes, rName, rDate, uUrl, quitAndUpdate) {
    // Install the update
    console.log('Update downloaded.');
    quitAndUpdate()
  })
});

// Check for updates
update.check(function (err, status) {
  if (!err && status) {
    console.log('Update downloading.');
    update.download()
  }
});
