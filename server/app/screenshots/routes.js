module.exports = function( server, config ) {

  var ctrls = require('./controllers'),
      schema = require('./schema');

  var basePath = '/screenshots';

  server.route({
    method: 'GET',
    path: basePath + '/{id?}',
    handler: ctrls.get
  });

  server.route({
    method: 'POST',
    path: basePath,
    handler: ctrls.post,
    config: {
      validate: {
        payload: schema
      }
    }
  });

};
