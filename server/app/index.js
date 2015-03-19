module.exports = function( server ) {

  require('./main')( server );

  $srv.pathPrefix( 'api', server, function( server, done ) {

    require('./screenshots')( server );

    done();
  } );

};
