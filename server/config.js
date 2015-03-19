var args = require('yargs').argv,
    path = require('path'),
    is   = require('../phantomjs/helpers/is');

module.exports = (function() {

  var config = {};

  // config.args = args;

  config.flags = {
    proxy: !!args.proxy
  };

  config.rootPath = path.dirname(require.main.filename);

  config.phantomjs = {
    root: path.resolve( config.rootPath, '..', 'phantomjs' ),
    screenshot: path.resolve( config.rootPath, '..', 'phantomjs', 'screenshot.js' )
  };

  if( config.flags.proxy ) {

    var proxy = {
      server : (
        ( is.string( args.proxy ) ) ?
          args.proxy :
          process.env.PROXY_SERVER
      ),
      auth   : (
        ( args.proxyAuth && is.string( args.proxyAuth ) ) ?
          args.proxyAuth :
          process.env.PROXY_AUTH
      )
    }

    //---
    config.phantomjs.proxy = proxy;
  }

  config.server = {
    port: (
      ( args.port && is.string.number( args.port ) ) ?
        args.port :
        9000
    ),
    public_dir: path.resolve( config.rootPath, 'public' ),
    index_html: path.resolve( config.rootPath, 'public', 'index.html' ),
    screenshots: path.resolve( config.rootPath, 'files' )
  };

  return config;

})();
