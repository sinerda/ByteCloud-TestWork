const { src } = require('gulp');

const ghPages = require('gulp-gh-pages');

function pages() {
  return src('app/**/*').pipe(ghPages());
}
exports.deploy = pages;