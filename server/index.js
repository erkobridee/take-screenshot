var Hapi = require('hapi');

//---

global.$srv = require('./helpers/$');

//---

// Create a server with a host and port
var server = new Hapi.Server();

server.connection({
  port: $srv.config.server.port,
  routes: {
    cors: true
  }
});

//------------------------------------------------------------------------------

// API documentation generator
server.register({ register: require('lout') }, function(err) {});

// load application
require('./app')( server );

//------------------------------------------------------------------------------

// Start the server
server.start(function () {
  console.log('Server running at:', $srv.localip + ':' + server.info.port);
});

//------------------------------------------------------------------------------
