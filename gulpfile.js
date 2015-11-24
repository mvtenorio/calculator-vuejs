var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var htmlInjector = require("bs-html-injector");

gulp.task('css', function() {
	return gulp.src('css/style.css')
		.pipe(autoprefixer())
		.pipe(gulp.dest('build'))
		.pipe(browserSync.stream());
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
});
