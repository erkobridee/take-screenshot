var path = require('path');

module.exports = (function() {

  var config = {};

  var rootPath = path.dirname(require.main.filename);
  config.rootPath = rootPath;

  config.phantomjs = {
    root: path.resolve( rootPath, '..', 'phantomjs' ),
    screenshot: path.resolve( rootPath, '..', 'phantomjs', 'screenshot.js' )
  };

  config.server = {
    port: 9000,
    public_dir: path.resolve( rootPath, 'public' ),
    index_html: path.resolve( rootPath, 'public', 'index.html' ),
    screenshots: path.resolve( rootPath, 'files' )
  };

  return config;

})();
