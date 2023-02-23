const { src, dest, parallel, watch } = require('gulp');
const ftlmin = require('gulp-ftlmin');
const sass = require('gulp-sass')(require('node-sass'));

const DEST = 'dist/theme';

function ftl() {
  return src('theme/**/*.ftl', { followSymlinks: true })
    .pipe(ftlmin({
      removeFtlComments: true,
      minifyFtl: true,
      // others options for html-minifier...
    }))
    .pipe(dest(DEST));
}

function scss() {
  return src('theme/**/*.scss', { followSymlinks: true })
    .pipe(sass({ includePaths: ['./node_modules'] }))
    .pipe(sass().on('error', sass.logError))
    .pipe(dest(DEST));
}

const FILE_PATHS = [
  'theme/**/*.json',
  'theme/**/*.properties',
  'theme/**/fonts/*.*',
  'theme/**/img/*.*',
];

function files() {
  return src(FILE_PATHS).pipe(dest(DEST));
}

function watchAll() {
  watch('theme/**/*.scss', scss);
  watch('theme/**/*.ftl', ftl);
  watch(FILE_PATHS, files);
}

exports.ftl = ftl;
exports.scss = scss;
exports.files = files;
exports.build = parallel(ftl, scss, files);
exports.force = parallel(ftl, scss);
exports.default = watchAll;
