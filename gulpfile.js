'use strict';

var connect = require('gulp-connect');
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var sourcemaps = require('gulp-sourcemaps');

var postcssProcessors = [
  require('postcss-will-change')(), // must be before autoprefixer
  require('autoprefixer')({browsers: ['last 2 versions', 'Firefox ESR']}),
  require('postcss-pseudoelements')(),
  require('postcss-vmin')(),
  require('pixrem')()
];

// Primary task aliases
// -----------------------------------------------------------------------------

gulp.task('default', ['watch', 'connect']);

gulp.task('build', ['sass:prod']);

// Tasks
// -----------------------------------------------------------------------------

gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('watch', function () {
  gulp.watch('./src/sass/**/*.scss', ['sass:dev']);
});

// Sass

gulp.task('sass:dev', function () {
  gulp.src('./src/sass/*.scss')
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'nested',
      errLogToConsole: true
    }))
    .pipe(postcss(postcssProcessors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(connect.reload());
});

gulp.task('sass:prod', function () {
  gulp.src('./src/sass/*.scss')
    .pipe(sassGlob())
    .pipe(sass({
      outputStyle: 'compressed',
      errLogToConsole: true
    }))
    .pipe(postcss(postcssProcessors))
    .pipe(gulp.dest('./dist/css'));
});
