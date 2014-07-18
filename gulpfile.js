var jshint = require('gulp-jshint');
var gulp   = require('gulp');
var jscs = require('gulp-jscs');

gulp.task('lint', function() {
  return gulp.src('./js/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jscs());
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['lint']);
