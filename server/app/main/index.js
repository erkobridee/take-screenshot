module.exports = function( options ) {

  require('./routes')(options.server, options.config);

};
