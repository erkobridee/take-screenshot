var $ = module.exports;

$.args = require('yargs').argv;

//---

$.path = require('path');

$.rootPath = $.path.resolve( $.path.dirname(require.main.filename), '..' );

// [Gist] Better local require() paths for Node.js
// https://gist.github.com/branneman/8048520
$.rootRequire = function( name ) {
  return require( $.path.join( $.rootPath, name ) );
};

$.is     = $.rootRequire('phantomjs/helpers/is')
$.config = $.rootRequire('server/config');

//---

$.localip             = require('./localip');
$.pathPrefix          = require('./pathPrefix');
$.shortHash           = require('./shortHash');
$.phantomjsScreenshot = require('./phantomjsScreenshot');

//---
