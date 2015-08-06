
var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    plugins = require('gulp-load-plugins')(),
    path = require('path'),
    es6ify = require('es6ify'),
    reactify = require('reactify'),
    utils = require('../utils');


var config = utils.getEnvironmentConfig(),
    environment =  config.environment,
    configFile =  config.data;


gulp.task('scripts', function () {

    var appName =  utils.getEnvironmentConfig().appName;

    return browserify( './' + appName + '/scripts/main.js',
        {
            debug: environment === 'development'
        })
        .transform(es6ify)
        .bundle()
        .on('error', utils.handleError)
        .pipe(source('bundle.js'))
        .pipe(configFile.uglify ? plugins.buffer() : utils.noop())
        .pipe(configFile.uglify ? plugins.uglify() : utils.noop())
        .pipe(gulp.dest('dist/'+ appName +'/scripts'))
        .pipe(utils.reload());
})


gulp.task('scripts-react', function () {

    var appName =  utils.getEnvironmentConfig().appName;

    return browserify( './' + appName + '/scripts/main.js',
        {
            debug: environment === 'development'
        })
        .transform(reactify)
        .transform(es6ify)

        .bundle()
        .on('error', utils.handleError)
        .pipe(source('bundle.js'))
        .pipe(configFile.uglify ? plugins.buffer() : utils.noop())
        .pipe(configFile.uglify ? plugins.uglify() : utils.noop())
        .pipe(gulp.dest('dist/'+ appName +'/scripts'))
        .pipe(utils.reload());

    var appName =  utils.getEnvironmentConfig().appName;
})
