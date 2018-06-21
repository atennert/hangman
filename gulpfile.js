const gulp = require('gulp');
const mocha = require('gulp-mocha');
const tsLint = require('gulp-tslint');
const webpack = require('webpack-stream');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');
const cssmin = require('gulp-cssmin');
const spawn = require('gulp-spawn');
const replace = require('gulp-replace');

const fs = require('fs');

const content = fs.readFileSync('package.json');

const npmVersion = JSON.parse(content).version;

gulp.task('styles', () => {
  return gulp.src('./src/*.scss')
    .pipe(sassLint({configFile: '.sass-lint.yml'}))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
    .pipe(sass().on('error', sass.logError))
    .pipe(cssmin())
    .pipe(gulp.dest(`./public/${npmVersion}`));
});

gulp.task('scripts', () => {
  return gulp.src('./src/index.ts')
    .pipe(tsLint({configuration: './tslint.json'}))
    .pipe(tsLint.report({emitError: false}))
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(uglify())
    .pipe(replace('$npm_version$', npmVersion))
    .pipe(gulp.dest(`./public/${npmVersion}`));
});

gulp.task('tests', () => {
  return gulp.src('./test/**/*.spec.ts')
    .pipe(mocha({
      require: ['ts-node/register'],
      reporter: 'list'
    }));
})

gulp.task('icons', gulp.parallel(
  () => gulp.src('./src/icon.svg')
    .pipe(spawn({
      cmd: 'convert',
      args: [
        '-background', 'none',
        '-resize', '512x512',
        '-',
        `png:-`
      ],
      opts: {cwd: '.'},
      filename: (base, ext) => `${base}-512.png`
    }))
    .pipe(gulp.dest(`./public/${npmVersion}`)),

  () => gulp.src('./src/icon.svg')
    .pipe(spawn({
      cmd: 'convert',
      args: [
        '-background', 'none',
        '-resize', '192x192',
        '-',
        `png:-`
      ],
      opts: {cwd: '.'},
      filename: (base, ext) => `${base}-192.png`
    }))
    .pipe(gulp.dest(`./public/${npmVersion}`))
));

gulp.task('copy-page', () => {
  return gulp.src('./src/*.html')
    .pipe(gulp.dest(`./public/${npmVersion}`));
});

gulp.task('copy-manifest', () => {
  return gulp.src('./src/manifest.json')
    .pipe(gulp.dest(`./public/${npmVersion}`));
});

gulp.task('default', gulp.series(gulp.parallel('styles', 'scripts', 'tests', 'copy-page', 'icons', 'copy-manifest'), function watch() {
  gulp.watch('src/*.scss', gulp.series('styles'));
  gulp.watch('src/**/*.ts', gulp.series('tests', 'scripts'));
  gulp.watch('test/**/*.ts', gulp.series('tests'));
  gulp.watch('src/*.html', gulp.series('copy-page'));
  gulp.watch('src/*.manifest', gulp.series('copy-manifest'));
  gulp.watch('src/icon.svg', gulp.series('icons'));
}));

gulp.task('dist', gulp.parallel(
  'styles',
  'scripts',
  'copy-page',
  'copy-manifest',
  'icons'
));
