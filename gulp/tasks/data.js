
var gulp = require('gulp'),
    utils = require('../utils');


gulp.task('data', function () {
    var appName =  utils.getEnvironmentConfig().appName;

    return gulp
        .src( appName + '/data/**/*')
        .pipe(gulp.dest('dist/' + appName +'/data'))
        .pipe(utils.reload());
})