module.exports = (function() {

  var services = require('./services');

  var service = {
    get: get,
    post: post
  };

  // TODO: remove?
  function print( value ) { console.log( JSON.stringify( value, null, 2 ) ); };

  function get( request, reply ) {

    var id = request.params.id;
    if( id ) {

      reply( 'TODO: define get by id' );

    } else {

      reply( services.sample() );

    }

  }

  function post( request, reply ) {

    // TODO: remove
    print( request.payload );

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


    var output = {
      hashObj: hashObj,
      takeScreenshotConfig: takeScreenshot,
      msg: 'TODO: define post screenshot service'
    };

    // TODO: check if screenshot exists, if not generate

    reply( output );

  }


  //---
  return service;

})();
