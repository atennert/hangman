const gulp = require('gulp');
const mocha = require('gulp-mocha');
const tsLint = require('gulp-tslint');
const webpack = require('webpack-stream');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');
const cssmin = require('gulp-cssmin');
const spawn = require('gulp-spawn');

const fs = require('fs');

const content = fs.readFileSync('package.json');

const npmVersion = JSON.parse(content).version;

gulp.task('default', ['styles', 'scripts', 'tests', 'copy-page', 'icons', 'copy-manifest'], () => {
  gulp.watch('src/*.scss', ['styles']);
  gulp.watch('src/**/*.ts', ['tests', 'scripts']);
  gulp.watch('test/**/*.ts', ['tests']);
  gulp.watch('src/*.html', ['copy-page']);
  gulp.watch('src/*.manifest', ['copy-manifest']);
  gulp.watch('src/icon.svg', ['icons']);
});

gulp.task('dist', [
  'styles',
  'scripts',
  'copy-page',
  'copy.manifest',
  'icons'
]);

gulp.task('styles', () => {
  gulp.src('./src/*.scss')
    .pipe(sassLint({configFile: '.sass-lint.yml'}))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
    .pipe(sass().on('error', sass.logError))
    .pipe(cssmin())
    .pipe(gulp.dest(`./public/${npmVersion}`));
});

gulp.task('scripts', () => {
  gulp.src('./src/index.ts')
    .pipe(tsLint({configuration: './tslint.json'}))
    .pipe(tsLint.report({emitError: false}))
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(uglify())
    .pipe(gulp.dest(`./public/${npmVersion}`));
});

gulp.task('tests', () => {
  gulp.src('./test/**/*.spec.ts')
    .pipe(mocha({
      require: ['ts-node/register'],
      reporter: 'list'
    }))
})

gulp.task('icons', () => {
  gulp.src('./src/icon.svg')
    .pipe(spawn({
      cmd: 'convert',
      args: [
        '-',
        '-resize', '192x192',
        '-background', 'none',
        'png:-'
      ],
      opts: {cwd: '.'},
      filename: (base, ext) => `${base}-192.png`
    }))
    .pipe(gulp.dest(`./public/${npmVersion}`));

  gulp.src('./src/icon.svg')
    .pipe(spawn({
      cmd: 'convert',
      args: [
        '-',
        '-resize', '512x512',
        '-background', 'none',
        'png:-'
      ],
      opts: {cwd: '.'},
      filename: (base, ext) => `${base}-512.png`
    }))
    .pipe(gulp.dest(`./public/${npmVersion}`));
});

gulp.task('copy-page', () => {
  gulp.src('./src/*.html')
    .pipe(gulp.dest(`./public/${npmVersion}`));
});

gulp.task('copy-manifest', () => {
  gulp.src('./src/manifest.json')
    .pipe(gulp.dest(`./public/${npmVersion}`));
});
