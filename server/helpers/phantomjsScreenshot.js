var fs    = require('fs'),
    shell = require('shelljs');

//------------------------------------------------------------------------------
// @begin: public

var service = module.exports = function( screenshotFor, cb ) {
  if(!screenshotFor) return cb( 'screenshotFor object must be defined' );

  execCommandLine(
    mountCommandLine( screenshotFor ),
    function( result ) {
      return cb( result );
    });
};

//---

service.get = function( id, cb ) {
  var filepath = service.mountFilePath( id ),
      fileinfo = {
        path: filepath,
        exists: false
      };

  service.checkFileExists(filepath, function( flag ) {
    fileinfo.exists = flag;
    return cb( fileinfo );
  });
};

//---

service.mountFilePath = function( id ) {
  return $srv.path.join( $srv.config.server.screenshots, id + '.png' );
};

//---

service.checkFileExists = function( filepath, cb ) {
  fs.stat(filepath, function(err, stats) {
    if( err ) {
      return cb( false );
    } else if( stats.isFile() ) {
      return cb( true );
    }
    return cb( false );
  });
}

// @begin: public
//------------------------------------------------------------------------------
// @begin: private

function mountCommandLine( screenshotFor ) {
  var cmdline = 'phantomjs';

  if($srv.config.flags.proxy) {
    if($srv.config.phantomjs.proxy.server)
      cmdline += ' --proxy=' + $srv.config.phantomjs.proxy.server;
    if($srv.config.phantomjs.proxy.auth)
      cmdline += ' --proxy-auth=' + $srv.config.phantomjs.proxy.auth;
  }

  cmdline += ' ' + $srv.config.phantomjs.screenshot;
  cmdline += ' ' + screenshotFor.url;
  cmdline += ' ' + service.mountFilePath( screenshotFor.id );

  if( screenshotFor.screenshot )
    cmdline += ' --screenshot ' + screenshotFor.screenshot;

  if( screenshotFor.resize )
    cmdline += ' --resize ' + screenshotFor.resize;

  if( screenshotFor.delay )
    cmdline += ' --delay ' + screenshotFor.delay;

  return cmdline;
}

function execCommandLine( cmdline, cb ) {

  // console.log( '\nTODO: define command line execution\n' );
  // console.log( cmdline );

  shell.exec( cmdline, {silent:true}, function( code, output ) {
    if( code !== 0 ) {
      var msg = 'Error: PhantomJS screenshot service failed';
      msg += '\n\n';
      msg += 'Command:\n';
      msg += cmdline;
      return cb( msg );
    } else {
      return cb( 'PhantomJS screenshot service done' );
    }
  });
}

// @end: private
//------------------------------------------------------------------------------
