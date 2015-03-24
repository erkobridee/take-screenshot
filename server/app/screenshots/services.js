/*
  generate fake images
  http://fakeimg.pl/
*/

module.exports = (function() {

  var fs = require('fs');

  var services = {
    take: take, // call phantomjs
    get: $srv.phantomjsScreenshot.get, // mount file path and check if exists
    sample: sample // post object
  };

  //---

  function take( screenshotFor, cb ) {
    $srv.phantomjsScreenshot.get(screenshotFor.id, function( fileinfo ) {
      if( !fileinfo.exists ) {

        $srv.phantomjsScreenshot(screenshotFor, function( result ) {
          return cb( result );
        });

      } else {
        return cb( 'screenshot ' + screenshotFor.id + ' already exists' );
      }
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
