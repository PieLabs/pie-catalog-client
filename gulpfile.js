const gulp = require('gulp'),
  releaseHelper = require('release-helper');

//Init custom release tasks
releaseHelper.init(gulp);

gulp.task('test', ['build'], () => {
  throw new Error('todo...');
});

