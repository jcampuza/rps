// get gulp package
var gulp = require('gulp'), gutil = require('gulp-util');
var sass = require('gulp-sass');
var connect = require('gulp-connect');

// Default task to watch files 
gulp.task('default', ['build-css', 'webserver', 'watch']);

// Web server
gulp.task('webserver', function() {
	connect.server({
	  port: 8000,
	  livereload: true
	});
});


// Sass compilation 
gulp.task('build-css', function() {
	return gulp.src('scss/**/*.scss')
	  .pipe(sass())
	  .pipe(gulp.dest('css'))
	  .pipe(connect.reload());
});


// watch task
gulp.task('watch', function() {
	gulp.watch('scss/**/*.scss', ['build-css']);
});
