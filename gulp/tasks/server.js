/**
 * Created with IntelliJ IDEA.
 * User: javierabanses
 * Date: 21/01/2015
 * Time: 13:19
 */

var gulp = require('gulp'),
    express = require('express'),
    browserSync = require('browser-sync'),
    plugins = require('gulp-load-plugins')(),
    utils = require('../utils');


var config = utils.getEnvironmentConfig(),
    expressPort = config.expressPort;

var server,
     appName =  utils.getEnvironmentConfig().appName;

gulp.task('server', function () {
    server = express();
    server.use(express.static('dist/' + appName))
    server.listen(expressPort);
    utils.setIsServerRunning(true);
})

gulp.task('server-with-browser-sync', function () {
    server = express();
    server.use(express.static('dist/' + appName))
    server.listen(expressPort);
    browserSync({proxy: 'localhost:' + expressPort});
    utils.setIsServerRunning(true);
})
