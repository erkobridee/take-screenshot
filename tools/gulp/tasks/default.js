module.exports = function(gulp, $) {


  gulp.task('default', ['clean', 'jshint'], function() {

    $.projectInfoMsg();

  });

};
