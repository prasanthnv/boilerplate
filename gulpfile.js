var gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    plumber = require('gulp-plumber');

var paths = {
    jade_src: './src/*.jade',
    sass_src: './src/sass/*.oscss',
    jade_dest: './dist/',
    sass_dest: './dist/css',
    images_src: './src/images',
    images_dest: './dist/images',
};
//----------------
// BROWSER-SYNC TASK
//---------------

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  })
});

//----------------
// JADE TASK
//---------------
gulp.task('jade', function () {
    gulp.src(paths.jade_src)
        .pipe(plumber())
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest(paths.jade_dest))
        .pipe(browserSync.stream());
});
//----------------
// SASS TASK
//---------------

gulp.task('sass', function () {
    gulp.src(paths.sass_src)
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest(paths.sass_dest))
        .pipe(browserSync.stream());
});


//----------------
// FILE MOVE TASK
//---------------

//----------------
// WATCH TASK
//---------------
gulp.task('watch',function () {
    gulp.watch('*/**/*.jade', ['jade']);
    gulp.watch('*/**/*.scss', ['sass']); 

});
//----------------
// DEFAULT TASK
//---------------
gulp.task('default', ['watch', 'jade', 'sass','browserSync']);