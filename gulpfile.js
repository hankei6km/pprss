var gulp = require('gulp');
var gutil = require('gulp-util');
var cached = require('gulp-cached');

var path = require('path');
var _ = require('underscore');

var config = require('./taskconfig.js');


var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');

var bundler = watchify(browserify(config.srcJs, watchify.args));
// add any other browserify options or transforms here
bundler.transform('brfs');

gulp.task('js', bundle); // so you can run `gulp js` to build the file
bundler.on('update', bundle); // on any dep update, runs the bundler

function bundle() {
  return bundler.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(config.destBundle))
    // optional, remove if you dont want sourcemaps
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
      .pipe(sourcemaps.write('./')) // writes .map file
    //
    .pipe(gulp.dest(config.dest));
}


var jshint = require('gulp-jshint');

gulp.task('lint', function() {
  return gulp.src(config.lintFiles, {base: config.src})
    // .pipe(cached('lint')) // It affect to suppress to display error in cached source
    .pipe(jshint.extract('auto'))
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


//var changed = require('gulp-changed');

gulp.task('copy', function() {
  return gulp.src(config.srcFiles, {base: config.src})
    .pipe(cached('copy'))
    //.pipe(changed(config.dest))
    .pipe(gulp.dest(config.dest));
});


var browserSync = require('browser-sync');

// Static server
gulp.task('browser-sync', function() {
  browserSync({
    online: false, // supress reload at task startup
    port: 4000, 
    server: {
      baseDir: config.dest
    }
  });
});
var debReload = _.debounce(function(){
  browserSync.reload();
}, 1000);
gulp.task('reload', function() {
  debReload();
});
gulp.task('watch', ['lint', 'copy', 'js', 'ttrss-node', 'browser-sync'], function(){
  gulp.watch(config.srcFiles, ['copy']);
  gulp.watch(ttrssFile, ['ttrss-node']);
  gulp.watch(config.lintFiles , ['lint']);
  gulp.watch(config.destFiles, ['reload']);
});


// Static server(demo)
gulp.task('browser-sync:demo', function() {
  browserSync({
    online: false, // supress reload at task startup
    port: 4000, 
    server: {
      baseDir: [config.dest, config.demo]
    }
  });
});
gulp.task('watch:demo', ['lint', 'copy', 'js', 'ttrss-node', 'browser-sync:demo'], function(){
  gulp.watch(config.srcFiles, ['copy']);
  gulp.watch(ttrssFile, ['ttrss-node']);
  gulp.watch(config.lintFiles , ['lint']);
  gulp.watch(config.demoFiles, ['reload']);
});

// "test:reload" task require selenum server for local that run by `wct -p --webserver-port 5000`.
var webdriver = require('selenium-webdriver');
var driver;
gulp.task('test:local', function() {
  driver = new webdriver.Builder().forBrowser('chrome').build();
});
gulp.task('test:reload', function() {
  driver.get('http://localhost:5000/pprss/test/index.html?cli_browser_id=0');
});
gulp.task('watch:test', ['watch:demo', 'test:local'], function(){
  gulp.watch(config.testFiles, ['test:reload']);
});

// ----------------
// ttrss-node
// ----------------
var ttrssFile =  'js/libs/ttrss-node.js';
config.addCustomBundle(ttrssFile);
gulp.task('ttrss-node', function() {
  return browserify('.' + path.sep + path.join(config.src,ttrssFile), {standalone: 'TTrss'})
    .bundle()
    .pipe(source(ttrssFile))
    // optional, remove if you dont want sourcemaps
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
      .pipe(sourcemaps.write('./')) // writes .map file
    //
    .pipe(gulp.dest(config.dest));
});

// Build
gulp.task('build', ['copy', 'ttrss-node']);
