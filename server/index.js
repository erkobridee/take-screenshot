var Hapi = require('hapi'),
    config = require('./config');

//---

// Create a server with a host and port
var server = new Hapi.Server();

server.connection({
  port: config.server.port
});

//------------------------------------------------------------------------------

var options = {
  server: server,
  config: config
};

// load application
require('./app')(options);

//------------------------------------------------------------------------------

// Start the server
server.start(function () {
  console.log('Server running at port:', server.info.port);
});
