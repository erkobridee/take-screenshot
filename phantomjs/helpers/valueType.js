var is = require('./is');

module.exports = function( value ) {
  if( !is.string( value ) ) return value;

  if( is.string.number( value ) ) {
    return Number( value );
  } else if( is.string.boolean( value ) ) {
    return is.string.true( value );
  }
  return value;
};
