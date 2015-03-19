module.exports = function( server ) {

  server.route({
    method: 'GET',
    path:'/',
    handler: function (request, reply) {
     reply.file( $srv.config.server.index_html );
    }
  });

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: $srv.config.server.public_dir,
        listing: true
      }
    }
  });

};
