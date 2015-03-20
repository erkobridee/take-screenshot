module.exports = function(gulp, $) {

  gulp.task('clean:server:files', function(done) {
    $.del([
      $.config.paths.server + '/files/**/*.*'
    ], done);
  });

  gulp.task('clean', ['clean:server:files']);

};
