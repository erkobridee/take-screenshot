module.exports = (function() {

  var regexp = {
    isFlag: /^-|--/,
    hasEquals: /=/,
    isNumber: /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/,
    isBool: /^true|false$/,
    isTrue: /^true$/,
  };

  //---

  var is = {};

  //---

  is.array = Array.isArray;

  //---

  is.object = function( value ) {
    return value instanceof Object;
  };

  //---

  is.string = function( value ) {
    return typeof value === 'string';
  };

  is.string.boolean = function( value ) {
    return regexp.isBool.test( value );
  };

  is.string.true = function( value ) {
    return regexp.isTrue.test( value );
  };

  is.string.number = function( value ) {
    return regexp.isNumber.test( value );
  };

  //---

  is.flag = function( value ) {
    return regexp.isFlag.test( value );
  };

  is.flag.hasEquals = function( value ) {
    return regexp.hasEquals.test( value );
  };


  //---
  return is;
  //---

})();
