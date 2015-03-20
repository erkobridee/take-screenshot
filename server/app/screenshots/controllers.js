module.exports = (function() {

  var services = require('./services');

  var service = {
    get: get,
    post: post
  };

  //---

  function get( request, reply ) {

    var id = request.params.id;
    if( id ) {

      services.get( id, function( fileinfo ) {
        if( fileinfo.exists ) {
          reply.file( fileinfo.path );
        } else {
          reply.file( $srv.config.phantomjs.ss404 )
            .header('error', 'screenshot ' + id + ' not found')
            .code(404);
        }
      });

    } else {

      reply( services.sample() );

    }

  }

  function post( request, reply ) {

    //--- @begin: review received object
    var takeScreenshot = {
      url        : request.payload.url,
      screenshot : '1024x768x0',
      resize     : '250x200'
    };

    if( request.payload.screenshot ) takeScreenshot.screenshot = request.payload.screenshot;
    if( request.payload.resize ) takeScreenshot.resize = request.payload.resize;

    var hashObj = $srv.shortHash( takeScreenshot );
    takeScreenshot.id = hashObj.hash;

    if( request.payload.delay ) takeScreenshot.delay = request.payload.delay;
    //--- @end: review received object

    services.take(takeScreenshot, function( result ) {
      console.log( result );
    })

    var output = {
      id: takeScreenshot.id
    };

    reply( output );

  }

  //---
  return service;

})();
