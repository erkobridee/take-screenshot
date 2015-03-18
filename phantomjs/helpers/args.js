var is = require('./is'),
    valueType = require('./valueType');

module.exports = (function() {

  var system = require('system'),
      sysargs = system.args;

  var argv = {
    _: [],
    '$0': sysargs[0]
  };

  if( sysargs.length > 1 ) {
    processArgs( argv, sysargs.slice(1) );
  }

  //---

  function processArgs( argv, sysargs ) {
    if( sysargs.length === 0 ) return;

    var arg = sysargs.shift();
    if( !is.flag( arg ) ) {
      argv._.push( arg );
      processArgs( argv, sysargs );
    } else {
      arg = arg.replace(/-/g, '');
      if( is.flag.hasEquals( arg ) ) {
        var parts = arg.split('=');
        appendValue( argv, parts[0], parts[1] );
        processArgs( argv, sysargs );
      } else {
        if( sysargs.length > 0 ) {
          var nextarg = sysargs.shift();
          if( is.flag( nextarg ) ) {
            appendValue( argv, arg, true );
            sysargs.unshift( nextarg );
            processArgs( argv, sysargs );
          } else {
            appendValue( argv, arg, nextarg );
            processArgs( argv, sysargs );
          }
        } else {
          appendValue( argv, arg, true );
        }

      }
    }

  }

  //---

  function appendValue( obj, key, value ) {
    if( obj[key] ) {
      if( is.array( obj[key] ) ) {
        obj[key].push( valueType( value ) );
      } else {
        obj[key] = [ obj[key], valueType( value ) ];
      }
    } else {
      obj[key] = valueType( value );
    }
  }

  //---
  return argv;

})();
