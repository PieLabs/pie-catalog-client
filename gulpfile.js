const gulp = require('gulp'),
  releaseHelper = require('release-helper'),
  runSequence = require('run-sequence'),
  path = require('path'),
  webpack = require('webpack'),
  fs = require('fs-extra'),
  exec = require('child_process').exec;



//Init custom release tasks
releaseHelper.init(gulp);

let glue = suffix => gulp.src(`src/**/*.${suffix}`).pipe(gulp.dest('lib'));

let watch = (suffix, tasks) => {
  tasks = tasks ? tasks : [suffix];
  return gulp.watch(`src/**/*.${suffix}`, tasks);
}

gulp.task('test', ['build'], () => {
  throw new Error('todo...');
});

gulp.task('clean', (done) => {
  fs.remove('dist', done);
});

gulp.task('build', (done) => {
  let cfg = require('./webpack.config');
  cfg.output.path = './dist';
  webpack(cfg, done);
});

///gulp.task('dev', ['build', 'watch-pug', 'watch-ts']);

