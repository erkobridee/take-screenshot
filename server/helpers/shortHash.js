//==============================================================================

var Hashids = require('hashids');

var salt = 'phantomjs screenshot service';

var hashids = new Hashids( salt );

//==============================================================================

function isString( value ) { return typeof value === 'string'; };

function shortHash( value ) {
  if( !isString( value ) ) value = JSON.stringify( value );

  var i,
      charArray = [];

  for( i = value.length - 1; i >= 0; i-- ) {
    charArray.push( value.charCodeAt(i) );
  }

  var hash = hashids.encode( charArray );
  charArray = [];

  var hashSum = hash.length;
  for( i = hash.length - 1; i >= 0; i-- ) {
    hashSum += hash.charCodeAt(i);
  }

  return {
    input: value,
    hashSum: hashSum,
    hash: hashids.encode( hashSum )
  }
}

//==============================================================================

module.exports = shortHash;
