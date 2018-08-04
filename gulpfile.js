var gulp = require('gulp'),
  argv = require('yargs').argv,
  browserify = require('browserify'),
  browserSync = require('browser-sync'),
  buffer = require('gulp-buffer'),
  changed = require('gulp-changed'),
  cp = require('child_process'),
  debug = require('gulp-debug'),
  gulpif = require('gulp-if'),
  gutil = require('gulp-util'),
  jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll',
  prefix = require('gulp-autoprefixer'),
  reload = browserSync.reload,
  rename = require("gulp-rename"),
  runSequence = require('run-sequence'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  tap = require('gulp-tap'),
  uglify = require('gulp-uglify'),
  svgmin = require('gulp-svgmin'),
  imagemin = require('gulp-imagemin');


gulp.task('jekyll-build', function(done) {
  return cp.spawn('bundle', ['exec', 'jekyll', 'build', '--watch', '--incremental'], {
      stdio: 'inherit'
    })
    .on('close', done);
});


gulp.task('dev-server', function() {
  return browserSync({
    server: {
      baseDir: '_site'
    }
  });
});

gulp.task('share', function() {
  return browserSync.init({
    server: {
      baseDir: "_site"
    },
    ghostMode: false
  });
});

gulp.task('javascripts', function() {
  return gulp.src(['./_scripts/*.js', './_scripts/**/*.js'])
    .pipe(gulpif(!argv.force, changed('./assets/scripts', {
      extension: '.js'
    })))
    .pipe(tap(function(file) {
      gutil.log('JavaScripts Bundled: ' + file.path);
      file.contents = browserify(file.path, {
        debug: true,
        paths: ['./node_modules', './_scripts']
      }).bundle().on('error', function(err) {
        browserSync.notify(err.message, 10000);
        console.log(err);
        this.emit('end');
      });
    }))
    .pipe(buffer())
    // .pipe(sourcemaps.init({
    //     loadMaps: true
    // }))
    .pipe(uglify())
    .pipe(rename(function(path) {
      path.basename = 'bundle';
      path.extname = '.js';
    }))
    // .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./assets/scripts'))
});


gulp.task('stylesheets', function() {
  return gulp.src(['./_scss/**/*.scss', './node_modules/bootstrap/scss/bootstrap.scss'])
    // .pipe(gulpif(!argv.force, changed('./assets/css', {
    //     extension: '.css'
    // })))
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [
        './_scss/',
        './node_modules/bootstrap/scss/bootstrap.scss'
      ]
    })).on('error', function(err) {
      browserSync.notify(err.message, 10000);
      console.log(err);
      this.emit('end');
    })
    .pipe(prefix(['last 15 versions', '> 5%'], {
      cascade: true
    }))
    .pipe(debug({
      title: 'SCSS Compiled:'
    }))
    .pipe(gulp.dest('./assets/css'))
});

gulp.task('optimize_images', function() {
  return gulp.src('./assets/assets/images/**/*.{jpg, bmp, gif, png, jpeg, svg}')
    .pipe(imagemin())
    .pipe(debug({
      title: 'Crunched:'
    }))
    .pipe(gulp.dest('./assets/images'))
});

gulp.task('watch', function() {
  gulp.watch('./_scss/**/*.scss', ['stylesheets']);
  gulp.watch('./node_modules/bootstrap/scss/bootstrap.scss', ['stylesheets']);
  gulp.watch('./_scripts/**/*.js', ['javascripts']);
  gulp.watch(['./_site/**/*']).on("change", reload);
});

gulp.task('server', function(callback) {
  runSequence(['jekyll-build', 'dev-server', 'watch'], callback);
});

gulp.task('default', function() {
  console.log("try running 'gulp server'...");
});
