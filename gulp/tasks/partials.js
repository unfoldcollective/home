
var gulp = require('gulp'),
    utils = require('../utils');


gulp.task('partials', function () {
    var appName =  utils.getEnvironmentConfig().appName;

    return gulp
        .src( appName + '/partials/**/*.html')
        .pipe(gulp.dest('dist/' + appName +'/partials'))
        .pipe(utils.reload());
})