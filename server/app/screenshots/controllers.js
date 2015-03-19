module.exports = (function() {

  var services = require('./services');

  var service = {
    get: get,
    post: post
  };

  function print( value ) { console.log( JSON.stringify( value, null, 2 ) ); };

  function get( request, reply ) {

    var id = request.params.id;
    if( id ) {

      reply( 'TODO: define get by id' );

    } else {

      reply( 'TODO: define get' );

    }

  }

  function post( request, reply ) {

    reply( 'TODO: define post' );

  }


  //---
  return service;

})();
