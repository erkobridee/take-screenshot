module.exports = function( server, config ) {

  var basePath = '/screenshots';

  server.route({
    method: 'GET',
    path: basePath,
    handler: function (request, reply) {
     reply('screenshots');
    }
  });

  server.route({
    method: 'POST',
    path: basePath,
    handler: function (request, reply) {
     reply('return screenshot id');
    }
  });

};
