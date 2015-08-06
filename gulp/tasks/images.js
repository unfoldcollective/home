

var gulp = require('gulp'),
    utils = require('../utils'),
    plugins = require('gulp-load-plugins')();


var config = utils.getEnvironmentConfig(),
    environment =  config.environment,
    configFile =  config.data;


gulp.task('images', function () {
    var appName =  utils.getEnvironmentConfig().appName;

    return gulp
        .src( appName + '/images/**/*.{png,jpg}')
        .pipe(configFile.imageMin ? plugins.imagemin() : utils.noop())
        .on('error', utils.handleError)
        .pipe(gulp.dest('dist/'+ appName +'/images'))
        .pipe(utils.reload());
})
