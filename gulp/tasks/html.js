/**
 * Created with IntelliJ IDEA.
 * User: javierabanses
 * Date: 21/01/2015
 * Time: 12:27
 */


var gulp = require('gulp'),
    utils = require('../utils');

gulp.task('html', function () {
    var appName =  utils.getEnvironmentConfig().appName;

    return gulp
        .src( appName + '/index.html')
        .pipe(gulp.dest('dist/' + appName))
        .pipe(utils.reload());
});