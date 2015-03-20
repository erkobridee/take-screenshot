var $ = require('./helpers/$');

module.exports = (function() {

  var config = {};

  config.flags = {
    proxy: !!$.args.proxy
  };

  //---
  config.phantomjs = {
    root       : $.path.resolve( $.rootPath, 'phantomjs' ),
    screenshot : $.path.resolve( $.rootPath, 'phantomjs', 'screenshot.js' ),
    ss404      : $.path.resolve(
      $.rootPath, 'server', 'public', 'assets', 'images', 'ss404.png'
    )
  };

  if( config.flags.proxy ) {

    config.phantomjs.proxy = {
      server : (
        ( $.is.string( $.args.proxy ) ) ?
          $.args.proxy :
          process.env.PROXY_SERVER
      ),
      auth   : (
        ( $.args.proxyAuth && $.is.string( $.args.proxyAuth ) ) ?
          $.args.proxyAuth :
          process.env.PROXY_AUTH
      )
    };

  }
  //--- @end: config.phantomjs

  config.server = {
    port        : (
      ( $.args.port && $.is.string.number( $.args.port ) ) ?
        $.args.port :
        9000
    ),
    public_dir  : $.path.resolve( $.rootPath, 'server', 'public' ),
    index_html  : $.path.resolve( $.rootPath, 'server', 'public', 'index.html' ),
    screenshots : $.path.resolve( $.rootPath, 'server', 'files' )
  };

  return config;

})();
