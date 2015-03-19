/*
  generate fake images
  http://fakeimg.pl/
*/

module.exports = (function() {

  var fs = require('fs');

  var services = {
    take: take, // call phantomjs
    get: get, // mount file path and check if exists
    sample: sample // post object
  };

  //---

  function take( screenshotFor, cb ) {
    get(screenshotFor.id, function( fileinfo ) {
      if( !fileinfo.exists ) {

        $srv.phantomjsScreenshot(screenshotFor, function( result ) {
          return cb( result );
        });

      } else {
        return cb( 'screenshot already exists' );
      }
    });
  }

  function get( id, cb ) {
    var filepath = mountFilePath( id ),
        fileinfo = {
          path: filepath,
          exists: false
        };

    checkFileExists(filepath, function( flag ) {
      fileinfo.exists = flag;
      return cb( fileinfo );
    });
  }

  //---
  function mountFilePath( id ) {
    return $srv.path.join( $srv.config.server.screenshots, id + '.png' );
  }

  function checkFileExists( filepath, cb ) {
    fs.stat(filepath, function(err, stats) {
      if( err ) {
        return cb( false );
      } else if( stats.isFile() ) {
        return cb( true );
      }
      return cb( false );
    });
  }

  function sample() {
    return {
      schema: {
        url        : {
          type: 'String', required: true
        },
        screenshot : {
          type: 'String', required: false, default: '1024x768x0',
          comment: 'width x height x top'
        },
        resize     : {
          type: 'String', required: false, default: '250x200',
          comment: 'width x height'
        },
        delay      : {
          type: 'Number', required: false, default: 300,
          comment: 'time in ms'
        }
      },
      samples: [
        {
          url        : "https://github.com/erkobridee",
          screenshot : "1024x768x0",
          resize     : "250x200",
          delay      : 1000
        },
        {
          url        : "https://github.com/erkobridee",
          resize     : "350x300",
        }
      ]
    };
  }

  //---
  return services;

})();
