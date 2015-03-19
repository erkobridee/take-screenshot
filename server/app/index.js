var pathPrefix = require('./path_prefix');

module.exports = function( options ) {

  require('./main')( options );

  pathPrefix( 'api', options.server, function( server, done ) {

    var localOptions = {
      server: server,
      config: options.config
    };

    require('./screenshots')(localOptions);

    done();
  } );

};
