var webpage = require('webpage'),
    argv = require('./helpers/args'),
    waitFor = require('./helpers/waitFor'),
    is = require('./helpers/is'),
    startTakeResize = new Date().getTime(),
    flags = {
      base64: false,
      resize: !!argv.resize
    };

//---

this.DEBUG = !!argv.debug;

//---

var options = {
  src                  : argv._[0],
  dest                 : argv._[1] || null,
  screenshotDimensions : argv.screenshot || '1024x768x0',
  resizeDimensions     : '250x200',
  screenshotDelay      : argv.delay || 300 // ms
};

if( flags.resize && is.string( argv.resize ) ) {
  options.resizeDimensions = argv.resize;
}

if(DEBUG) console.log( '\noptions: ', JSON.stringify( options, null, 2 ), '\n' );

//---

if( !options.src ) {
  var helpText = 'Usage: phantomjs '  + argv.$0 + ' <command> [options]\n';
  helpText += '\n';
  helpText += 'Commands:\n';
  helpText += '  source\tURL or html file path\n';
  helpText += '  dest\t\t[path/]filename, if not defined will output base64 (PNG)\n';
  helpText += '\n';
  helpText += 'Options:\n';
  helpText += '  --screenshot\tpage width x height x top ( default: 1024x768x0 )\n';
  helpText += '  --resize\tto width x height ( default: 250x200 )\n';
  helpText += '    * do not resize image if not defined\n';
  helpText += '  --delay\twait miliseconds before take screenshot ( default: 300 )\n';
  helpText += '  --debug\n';
  helpText += '    * if defined will print debug messages\n';
  helpText += '\n';
  helpText += 'Exemple:\n';
  helpText += '  phantomjs '  + argv.$0 + ' http://page.html\n';
  helpText += '  phantomjs '  + argv.$0 + ' http://page.html screenshot/output.png\n';
  helpText += '  phantomjs '  + argv.$0 + ' http://page.html screenshot/output.png --resize\n';

  console.log( helpText );
  finish();
}

if( options.dest === null ) {
  flags.base64 = true;
} else {
  checkDestFileName();
}

if(DEBUG) console.log( 'flags: ', JSON.stringify( flags, null, 2 ), '\n' );

//------------------------------------------------------------------------------

function checkDestFileName() {
  if( /png/.test( options.dest ) ) return;

  var check = options.dest.split(/\./),
      last = check.pop();

  if( !/jpg|jpeg|gif|pdf/.test(last) ) {
    check.push( last );
    if( !/png/.test(last) ) check.push('png');
  } else {
    check.push('png');
  }

  options.dest = check.join('.');
}

//------------------------------------------------------------------------------

function takeScreenShot() {
  var page = createNewPage( options.screenshotDimensions );

  if( DEBUG ) console.log('open page: ' + options.src);

  page.open(options.src, pageOpenCallback(function() {
    if(DEBUG) console.log('page opened');

    setWhiteBbColor( page );

    setTimeout(function() {
      renderImage();
    }, options.screenshotDelay);
  }));

  function renderImage() {
    if(DEBUG) console.log('render screenshot');
    if( flags.resize ) {
      renderImageBase64(function( imageBase64 ) {
        resizeImage( imageBase64 );
      });
    } else {
      if( flags.base64 ) {
        renderImageBase64(function( imageBase64 ) {
          console.log( imageBase64 );
          finish();
        });
      } else {
        page.render( options.dest );
        if(DEBUG) console.log('screenshot png generated');
        finish();
      }
    }
  }

  function renderImageBase64( cb ) {
    var base64 = page.renderBase64('PNG');
    if(DEBUG) console.log('screenshot base64 png generated');
    // page.close();
    cb( updateImageBase64Str( base64 ) )
  }

}

function pageOpenCallback( callback ) {

  return function( status ) {
    if( status === 'success' ) {
      callback();
    } else {
      console.log('error: fail to open ' + options.src);
      finish();
    }
  };

}

//------------------------------------------------------------------------------

function resizeImage( imageBase64 ) {
  var imageDimensions = getDimensionsObject( options.resizeDimensions );
  var page = createNewPage( imageDimensions );

  //--- @begin: page.content
  var pageStyle = '<style> body { margin-top: 0px; margin-left: 0px; } </style>';

  var imgStrTag = '<img id="toproad" src="' +
    imageBase64 +
    '" width="' +
    imageDimensions.width +
    '" height="' +
    imageDimensions.height +
    '" />';

  var pageContent = [
    pageStyle,
    imgStrTag
  ].join('');

  page.content = pageContent;
  //--- @end: page.content

  waitFor(function() {
    // Check in the page if a specific element is now visible
    return page.evaluate(function() {
      return document.getElementById("toproad").complete;
    });
  }, function() {
    if(DEBUG) console.log('screenshot resized to ' + options.resizeDimensions);
    renderImage();
  });

  function renderImage() {
    if( flags.base64 ) {
      var base64 = page.renderBase64('PNG');
      console.log( updateImageBase64Str( base64 ) );
    } else {
      page.render( options.dest );
    }
    // page.close();
    finish();
  }

}

//------------------------------------------------------------------------------

function setWhiteBbColor( page ) {
  page.evaluate(function() {
    return document.body.bgColor = 'white';
  });
}

//---

var defaultDimensionWidth = 200;

function getDimensionsArray( dimensions ) {
  return dimensions.split(/x/);
}

function getDimensionsObject( dimensions ) {
  dimensions = getDimensionsArray( dimensions );
  var output = {};
  output.width = dimensions[0] || defaultDimensionWidth;
  output.height = dimensions[1] || output.width;
  output.top = dimensions[2] || 0;
  return output;
}

function checkDimensions( dimensions ) {
  if( isObject( dimensions ) ) {
    dimensions.width = dimensions.width || defaultDimensionWidth;
    dimensions.height = dimensions.height || dimensions.width;
    dimensions.top = dimensions.top || 0;
    return dimensions;
  } else {
    return getDimensionsObject( dimensions );
  }
}

function setDimensions( page, dimensions ) {
  dimensions = checkDimensions( dimensions );

  page.viewportSize = {
    width: dimensions.width,
    height: dimensions.height
  };

  page.clipRect = {
    left: 0,
    top: dimensions.top,
    width: dimensions.width,
    height: dimensions.height
  };
}

//---

function isObject( value ) {
  return value !== null && typeof value === 'object';
}

//---

function createNewPage( dimensions ) {
  var page = webpage.create();
  if( dimensions ) setDimensions( page, dimensions );
  return page;
}

//---

function updateImageBase64Str( imageBase64 ) {
  return 'data:image/png;base64,' + imageBase64;
}

//------------------------------------------------------------------------------

function start() {
  if( DEBUG ) console.log('start process...');
  takeScreenShot();
}

function finish() {
  if( DEBUG ) {
    var msg = 'screenshot taked';
    msg += ' (' + options.screenshotDimensions + ')';
    if( flags.resize ) {
      msg += ' and resized';
      msg += ' (' + options.resizeDimensions + ')';
    }
    msg += ' in';
    msg += ' ' + (new Date().getTime() - startTakeResize) + ' ms.';
    console.log( msg );
  }
  phantom.exit();
}

//------------------------------------------------------------------------------

start();
