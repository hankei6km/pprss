var path = require('path');

var config = {
  src: './src',
  dest: './dist',
  test: './test'
};
// if change `config.src`, 
// change '/src/bower_components/*' in .gitigonre and `directory` of .bowerrc.

config.srcJs = '.' + path.sep + path.join(config.src, 'js/index.js');
config.destBundle = path.join('js', 'bundle.js');


config.srcGlobHtml = '.' + path.sep + path.join(config.src, '**/*.html');
config.srcGlobJs = '.' + path.sep + path.join(config.src, 'js/**/*.js');
config.srcGlobStylesheet = '.' + path.sep + path.join(config.src, 'stylesheets/*.css');
config.srcGlobImage = '.' + path.sep + path.join(config.src, 'images/**/*');
config.srcGlobElement = '.' + path.sep + path.join(config.src, 'elements/**/*');
config.srcComponents = '.' + path.sep + path.join(config.src, 'bower_components/**/*');
config.srcExcludeJs = '!' + config.srcJs;
config.srcExcludeComponents = '!' + config.srcComponents;

config.destGlobHtml = '.' + path.sep + path.join(config.dest, '**/*.html');
config.destGlobJs = '.' + path.sep + path.join(config.dest, 'js/**/*.js');
config.destGlobStylesheet = '.' + path.sep + path.join(config.dest, 'stylesheets');
config.destGlobImage = '.' + path.sep + path.join(config.dest, 'images');
config.destGlobElement = '.' + path.sep + path.join(config.dest, 'elements/**/*');
config.destComponents = '.' + path.sep + path.join(config.dest, 'bower_components/**/*');

config.testGlobHtml = '.' + path.sep + path.join(config.test, '**/*.html');
config.testGlobJs = '.' + path.sep + path.join(config.test, '**/*.js');
config.testComponents = '.' + path.sep + path.join(config.test, 'bower_components/**/*');
config.testExcludeComponents = '!' + config.testComponents;

config.srcFiles = [
  config.srcGlobHtml,
  config.srcGlobJs,
  config.srcGlobStylesheet,
  config.srcGlobImage,
  config.srcGlobElement,
  config.srcComponents,
  config.srcExcludeJs
];

config.lintFiles = [
  config.srcGlobHtml,
  config.srcGlobJs,
  config.srcComponents, 
  config.srcExcludeComponents,
  config.testGlobHtml,
  config.testGlobJs,
  config.testExcludeComponents
];

config.destFiles = [
  config.destGlobHtml,
  config.destGlobJs,
  config.destGlobStylesheet,
  config.destGlobImage,
  config.destGlobElement,
  config.destComponents
];

module.exports = config;
