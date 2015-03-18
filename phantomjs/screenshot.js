var argv = require('./helpers/args'),
    DEBUG = !!argv.debug;

console.log( JSON.stringify(argv, null, 2) );

console.log( 'debug : ', DEBUG );

phantom.exit();

// phantomjs screenshot.js source dest --screenshot 1024x768x0 --resize 250x200 --delay 5000 --debug