'use strict';
const plumber = require('gulp-plumber');
const through = require('through2');
const chalk = require('chalk');
const newer = require('gulp-newer');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const gutil = require('gulp-util');
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');

const base = path.join(__dirname, 'building');
const scripts = './building/*/src/**/*.js';

function swapSrcWithLib(srcPath) {
  const parts = srcPath.split(path.sep);
  parts[1] = 'lib';
  gutil.log('swapSrcWithLib', '\'' + chalk.redBright(parts.join(path.sep)) + '\'...');
  return parts.join(path.sep);
}

gulp.task('default', ['build']);

gulp.task('build', function() {
  return gulp.src(scripts, {base: base})
  .pipe(plumber({
    errorHandler: function(err) {
      gutil.log(err.stack);
    },
  }))
  .pipe(newer({
    dest: base,
    map: swapSrcWithLib,
  }))
  .pipe(sourcemaps.init())
  .pipe(through.obj(function(file, enc, callback) {
    gutil.log('Compiling', '\'' + chalk.cyan(file.relative) + '\'...');
    callback(null, file);
  }))
  .pipe(babel())
  .pipe(through.obj(function(file, enc, callback) {
    // Passing 'file.relative' because newer() above uses a relative path and this keeps it consistent.
    gutil.log('Compiling111111', '\'' + chalk.cyanBright(file.relative) + '\'...');
    file.path = path.resolve(file.base, swapSrcWithLib(file.relative));
    callback(null, file);
  }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(base));
});

gulp.task('watch', ['build'], function() {
  watch(scripts, {debounceDelay: 200}, function() {
    gulp.start('build');
  });
});
