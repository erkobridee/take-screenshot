// Expose all Gulp plugins found
var $ = module.exports = require('gulp-load-plugins')();

//---

// shared streams to gulp tasks
$.streams = {};

//---

// Expose some other modules (local or not)
$.path            = require('path');
$.del             = require('del');
$.lazypipe        = require('lazypipe');

//---

$.args = require('yargs').argv;

//---

$.is = {
  debug     : !!$.args.debug,
  release   : !!$.args.release,
  preview   : !!$.args.preview,
  cdn       : !!$.args.cdn
};

//---

$.pkg = require('../../../package.json');

$.localip = require('../../lib/localip');

$.config = require('../../config');

//---

/**
 * Log a message or series of messages using chalk's blue color.
 * Can pass in a string, object or array.
 */
$.log = function(msg) {
  if (typeof(msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        $.util.log($.util.colors.blue(msg[item]));
      }
    }
  } else {
    $.util.log($.util.colors.blue(msg));
  }
};

$.onError = function(err) {
  $.log(err);
};

//---

$.projectInfoMsg = function() {
  $.log('');
  $.log('project: ' + $.pkg.name + ' v' + $.pkg.version);
  $.log('description: ' + $.pkg.description);
  $.log('');

  var msg = '';

  if( $.is.release ) {
    msg += ' release';

    if( $.is.cdn ) {
      msg += ' to CDN deploy';
    }

    $.log('>> ' + msg);
    $.log('');
  }
};

//---
