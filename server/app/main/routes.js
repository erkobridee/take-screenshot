module.exports = function( server, config ) {

  server.route({
    method: 'GET',
    path:'/',
    handler: function (request, reply) {
     reply.file( config.server.index_html );
    }
  });

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: config.server.public_dir,
        listing: true
      }
    }
  });

};
