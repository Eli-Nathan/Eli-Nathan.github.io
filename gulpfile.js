const argv = require('yargs').argv;
const buffer = require('gulp-buffer');
const connect = require('gulp-connect');
const changed = require('gulp-changed');
const debug = require('gulp-debug');
const del = require('del');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const postcss = require('gulp-postcss');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const watch = require('gulp-watch');
const reload = browserSync.reload;
const browserify = require('browserify');
const babelify = require('babelify');
const tap = require('gulp-tap');
const uglify = require('gulp-uglify');

// Default settings for gulpfile
var project = {
  buildSrc: './src',
  buildDest: './docs'
};

// Watch for file changes
gulp.task('watch', done => {
  // Watch SASS files and compile when changed
  gulp.watch(
    project.buildSrc + '/assets/stylesheets/**/*.scss',
    gulp.series('stylesheets')
  );

  // Watch JS files and compile when changed
  gulp.watch(
    project.buildSrc + '/assets/scripts/**/*.js',
    gulp.series('scripts')
  );

  /**
    Using gulp-watch as standard gulp
    doesn't track files the same way.
    See: https://stackoverflow.com/questions/42890414/how-to-setup-gulp-watch-with-gulp-connect-livereload
  */
  watch(project.buildDest).pipe(connect.reload());

  done();
});

// Compile Scripts 
gulp.task('scripts', done => {
  gulp
  .src(project.buildSrc + '/assets/scripts/bundle.js')
    .pipe(
      gulpif(
        !argv.force,
        changed('./assets/scripts', {
          extension: '.js'
        })
      )
    )
    .pipe(
      tap(function(file) {
        file.contents = browserify(file.path, {
          debug: true,
          paths: ['./node_modules', './assets']
        })
          .transform(babelify, {
            presets: ['@babel/preset-env', '@babel/preset-react']
          })
          .bundle()
          .on('error', function(err) {
            console.log(err);
            this.emit('end');
          });
      })
    )
    .pipe(
      debug({
        title: 'JS: '
      })
    )
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(project.buildDest + '/assets/scripts'))
    done();
});


// Compile SASS
gulp.task('stylesheets', done => {
  gulp
    .src(project.buildSrc + '/assets/stylesheets/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([require('autoprefixer')]))
    .pipe(gulp.dest(project.buildDest + '/assets/stylesheets'))
  done();
});

// Lightweight development server
gulp.task('server', done => {
  connect.server({
    root: project.buildDest,
    livereload: true
  });
  done();
});

// Clean build dir
gulp.task('clean', function() {
  return del([project.buildDest + '/**/*']);
});

// Build task
gulp.task('build', gulp.parallel('clean', 'stylesheets', 'scripts'));

// Development task
gulp.task('dev', gulp.parallel('watch', 'stylesheets', 'scripts', 'server'));
