var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    path = require('path'),
    utils = require('../utils');


var config = utils.getEnvironmentConfig(),
    environment = config.environment,
    configFile = config.data;


gulp.task('less', function () {
    var appName =  utils.getEnvironmentConfig().appName;

    return gulp
        .src( './' + appName + '/less/**/*.less')
        .pipe(environment === 'development' ? plugins.sourcemaps.init() : utils.noop())
        .pipe(plugins.less({
            paths: [path.join(__dirname, appName + '/less')]
        }))
        .on('error', utils.handleError)
        .pipe(configFile.sourceMaps ? plugins.sourcemaps.write() : utils.noop())
        .pipe(configFile.minifyCss ? plugins.minifyCss() : utils.noop())
        .pipe(gulp.dest('./dist/'+ appName +'/css'))
        .pipe(utils.reload());
})