module.exports = function(gulp, $) {

  var jshintStream = $.lazypipe()
    .pipe( $.jshint )
    .pipe( $.jshint.reporter, 'jshint-stylish' )
    // .pipe( $.jshint.reporter, 'jshint-summary' )
    .pipe( $.jshint.reporter, 'fail' );

  gulp.task('jshint:tools', function() {
    return gulp.src( $.config.js.tools )
      .pipe( jshintStream() );
  });

  gulp.task('jshint:phantomjs', function() {
    return gulp.src( $.config.js.phantomjs )
      .pipe( jshintStream() );
  });

  gulp.task('jshint:server', function() {
    return gulp.src( $.config.js.server )
      .pipe( jshintStream() );
  });

  gulp.task('jshint', ['jshint:tools', 'jshint:server', 'jshint:phantomjs']);

};
