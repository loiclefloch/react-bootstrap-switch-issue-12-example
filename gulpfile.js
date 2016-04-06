'use strict';

var gulp = require('gulp'),
  gulpFilter = require('gulp-filter'),
  babelify = require("babelify"),
  flatten = require('gulp-flatten'),
  sourcemaps = require('gulp-sourcemaps'),
  mainBowerFiles = require('main-bower-files'),
  rename = require("gulp-rename"),
  minifycss = require('gulp-minify-css'),
  changed = require('gulp-changed'),
  sass = require('gulp-sass'),
  csso = require('gulp-csso'),
  autoprefixer = require('gulp-autoprefixer'),
  browserify = require('browserify'),
  watchify = require('watchify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  reactify = require('reactify'),
  uglify = require('gulp-uglify'),
  del = require('del'),
  notify = require('gulp-notify'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  p = {
    jsx: './scripts/index.js',
    scss: 'styles/main.scss',
    scssSource: 'styles/**/*.scss',
    font: 'fonts/*',
    bundle: 'app.js',
    distJs: 'public/dist/js',
    distCss: 'public/dist/css',
    distFont: 'public/dist/fonts'
  };

gulp.task('clean', function (cb) {
  return del(['public/dist'], cb);
});

gulp.task('browserSync', function () {
  browserSync({
    notify: false,
    server: {
      baseDir: './'
    }
  })
});

gulp.task('watchify', function () {
  var bundler = watchify(browserify(p.jsx, watchify.args).transform(babelify));

  function rebundle() {
    return bundler
      .bundle()
      .on('error', notify.onError())
      .pipe(source(p.bundle))
      .pipe(buffer())
      //.pipe(sourcemaps.init({loadMaps: true})) // Extract the inline sourcemaps
      //.pipe(sourcemaps.write('./map')) // Set folder for sourcemaps to output to
      .pipe(gulp.dest(p.distJs))
      .pipe(reload({stream: true}));
  }

  bundler.transform(reactify)
    .on('update', rebundle);
  return rebundle();
});

gulp.task('browserify', function () {
  browserify(p.jsx)
    .transform(reactify)
    .bundle()
    .pipe(source(p.bundle))
    .pipe(buffer())
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(p.distJs));
});

gulp.task('fonts', function () {
  return gulp.src(p.font)
    .pipe(gulp.dest(p.distFont));
});

gulp.task('styles', function () {
  return gulp.src(p.scss)
    .pipe(changed(p.distCss))
    .pipe(sass({errLogToConsole: true}))
    .on('error', notify.onError())
    .pipe(autoprefixer({
      browsers: ['last 1 version']
    }))
    .pipe(csso())
    .pipe(gulp.dest(p.distCss))
    .pipe(reload({stream: true}));
});

// Ugly hack to bring modernizr in
gulp.task('modernizr', function () {
  return gulp.src('bower_components/modernizr/modernizr.js')
    .pipe(gulp.dest(p.distJs));
});

gulp.task('bower-libs', function () {
  var jsFilter = gulpFilter('*.js', {restore: true});
  var cssFilter = gulpFilter('*.css', {restore: true});
  var fontFilter = gulpFilter(['*.eot', '*.woff', '*.svg', '*.ttf']);

  return gulp.src(mainBowerFiles())

    // JS from bower_components
    .pipe(jsFilter)
    .pipe(gulp.dest(p.distJs))
    .pipe(uglify())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest(p.distJs))
    .pipe(jsFilter.restore)

    // css from bower_components, minified
    .pipe(cssFilter)
    .pipe(gulp.dest(p.distCss))
    .pipe(minifycss())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest(p.distCss))
    .pipe(cssFilter.restore)

    // font files from bower_components
    .pipe(fontFilter)
    .pipe(flatten())
    .pipe(gulp.dest(p.distFont));
});

gulp.task('libs', function () {
  gulp.start(['modernizr', 'bower-libs', 'fonts']);
});

gulp.task('watchTask', function () {
  gulp.watch(p.scssSource, ['styles']);
});

gulp.task('watch', ['clean'], function () {
  gulp.start(['libs', 'browserSync', 'watchTask', 'watchify', 'styles']);
});

gulp.task('build', ['clean'], function () {
  process.env.NODE_ENV = 'production';
  gulp.start(['libs', 'browserify', 'styles']);
});

gulp.task('default', function () {
  console.log('Run "gulp watch or gulp build"');
});

