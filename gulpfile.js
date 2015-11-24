'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var htmlInjector = require("bs-html-injector");
var gulpif = require('gulp-if');

var isDevelopment = process.env.NODE_ENV == 'development';

gulp.task('css', function() {
	return gulp.src('css/style.css')
		.pipe(autoprefixer())
		.pipe(gulp.dest('build'))
		.pipe(gulpif(isDevelopment, browserSync.stream()));
});

gulp.task('js', function() {

  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './js/app.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./build/'))
    .pipe(gulpif(isDevelopment, browserSync.stream()));
});

gulp.task('serve', function () {

	browserSync.use(htmlInjector, {
    files: "index.html"
	});

  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch("css/style.css", ['css']);
  gulp.watch("js/app.js", ['js']);
});

gulp.task('build', ['css', 'js']);
