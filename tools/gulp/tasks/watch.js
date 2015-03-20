module.exports = function(gulp, $) {

  gulp.task('watch', function() {

    gulp.watch([$.config.js.phantomjs], ['jshint:phantomjs']);
    gulp.watch([$.config.js.server], ['jshint:server']);

  });

};
